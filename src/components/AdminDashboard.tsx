"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lead } from "@/types/lead";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

interface AdminDashboardProps {
  initialLeads: Lead[];
  adminEmail: string;
}

const statusOptions: { value: Lead["status"]; label: string; color: string }[] = [
  { value: "new", label: "New", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "contacted", label: "Contacted", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: "in_progress", label: "In Progress", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { value: "closed", label: "Closed", color: "bg-slate-100 text-slate-700 border-slate-300" },
];

export default function AdminDashboard({
  initialLeads,
  adminEmail,
}: AdminDashboardProps) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleLogout = async () => {
    try {
      const supabase = createBrowserSupabaseClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: Lead["status"]) => {
    setUpdatingId(leadId);
    setToastMessage(null);

    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        setToastMessage({
          type: "error",
          text: data.error || "Failed to update lead status.",
        });
        return;
      }

      // Update state locally
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      );

      setToastMessage({
        type: "success",
        text: `Lead status updated to "${newStatus}".`,
      });
    } catch {
      setToastMessage({
        type: "error",
        text: "Network error occurred while updating status.",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter & Search
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      filterStatus === "all" ? true : lead.status === filterStatus;
    const matchesSearch =
      searchQuery.trim() === ""
        ? true
        : lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (lead.company?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
          (lead.service?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Bar with Admin Info & Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 text-xs font-semibold mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
            Verified Admin Session
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Client Inquiries & Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Signed in as: <strong className="text-slate-700">{adminEmail}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.refresh()}
            className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
          >
            ↻ Refresh Leads
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div
          role="status"
          className={`mt-4 p-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-between ${
            toastMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <span>{toastMessage.text}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs font-bold px-2 py-0.5 hover:opacity-75"
          >
            ✕
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            Total Leads
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{leads.length}</p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">
            New
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {leads.filter((l) => l.status === "new").length}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <p className="text-xs text-purple-600 font-medium uppercase tracking-wider">
            In Progress
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {leads.filter((l) => l.status === "in_progress").length}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            Closed
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {leads.filter((l) => l.status === "closed").length}
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by name, company, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 w-full sm:w-72"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
          >
            <option value="all">All Statuses ({leads.length})</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-6 bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
        {filteredLeads.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-lg mx-auto mb-3">
              📭
            </div>
            <p className="text-sm font-semibold text-slate-800">No Inquiries Found</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchQuery || filterStatus !== "all"
                ? "No leads matched your search or status filter. Try clearing filters."
                : "New client inquiries submitted via the website contact form will appear here in real time."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Client / Company</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Service Required</th>
                  <th className="py-3.5 px-4">Project Overview</th>
                  <th className="py-3.5 px-4">Date Submitted</th>
                  <th className="py-3.5 px-4 text-right">Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => {
                  const isUpdating = updatingId === lead.id;
                  const currentStatusConfig =
                    statusOptions.find((s) => s.value === lead.status) ||
                    statusOptions[0];

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-4 align-top">
                        <p className="font-bold text-slate-900 text-sm">{lead.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{lead.company}</p>
                      </td>

                      <td className="py-4 px-4 align-top">
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-rose-600 hover:underline font-medium"
                        >
                          {lead.email}
                        </a>
                      </td>

                      <td className="py-4 px-4 align-top">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-800 max-w-xs line-clamp-1">
                          {lead.service}
                        </span>
                      </td>

                      <td className="py-4 px-4 align-top max-w-xs sm:max-w-md">
                        <p className="text-slate-700 leading-relaxed text-xs">
                          {lead.message}
                        </p>
                      </td>

                      <td className="py-4 px-4 align-top whitespace-nowrap text-slate-500">
                        {new Date(lead.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${currentStatusConfig.color}`}
                          >
                            {lead.status}
                          </span>
                          <select
                            disabled={isUpdating}
                            value={lead.status}
                            onChange={(e) =>
                              handleStatusChange(
                                lead.id,
                                e.target.value as Lead["status"]
                              )
                            }
                            className="px-2 py-1 text-xs rounded border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-rose-500 disabled:opacity-50"
                          >
                            {statusOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                Mark as {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
