"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  website_honeypot: string; // Hidden bot trap field
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
}

const serviceOptions = [
  "Custom Full-Stack Web Application",
  "UI/UX Design System & Frontend",
  "Performance & Core Web Vitals Optimization",
  "API Development & Supabase/Cloud Integration",
  "Legacy Website Modernization",
  "General Inquiry / Architecture Consultation",
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
    website_honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<{
    status: "idle" | "success" | "error";
    message: string;
  }>({
    status: "idle",
    message: "",
  });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Business email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company or organization name is required";
    }

    if (!formData.service) {
      newErrors.service = "Please select the service of interest";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Project details or message is required";
    } else if (formData.message.trim().length < 15) {
      newErrors.message = "Please provide at least 15 characters of detail";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submissionState.status !== "idle") {
      setSubmissionState({ status: "idle", message: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionState({ status: "idle", message: "" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmissionState({
          status: "error",
          message: data.error || "Failed to submit inquiry. Please try again.",
        });
        return;
      }

      // Success state
      setSubmissionState({
        status: "success",
        message:
          data.message ||
          "Your inquiry has been successfully received. Our engineering team will review it within 24 business hours.",
      });

      // Clear the form fields upon successful dispatch
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
        website_honeypot: "",
      });
      setErrors({});
    } catch {
      setSubmissionState({
        status: "error",
        message:
          "Unable to connect to the server. Please check your network connection or email us directly at contact@ethixweb.com.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/80 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
        Tell Us About Your Project
      </h3>
      <p className="text-sm text-slate-600 mt-1 mb-8">
        Fill out the details below. Our engineering leads review all inquiries within 24 hours.
      </p>

      {/* Dynamic Feedback Banner */}
      {submissionState.status === "success" && (
        <div
          role="status"
          className="p-4 rounded-xl text-sm mb-6 flex items-start gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 animate-fadeIn"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-xs shrink-0 mt-0.5">
            ✓
          </div>
          <div>
            <p className="font-semibold text-emerald-950">Inquiry Received</p>
            <p className="mt-0.5 text-xs sm:text-sm leading-relaxed">{submissionState.message}</p>
          </div>
        </div>
      )}

      {submissionState.status === "error" && (
        <div
          role="alert"
          className="p-4 rounded-xl text-sm mb-6 flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-800 animate-fadeIn"
        >
          <div className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
            !
          </div>
          <div>
            <p className="font-semibold text-rose-950">Submission Note</p>
            <p className="mt-0.5 text-xs sm:text-sm leading-relaxed">{submissionState.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Anti-Bot Honeypot Field (Visually hidden for legitimate users) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_honeypot">Leave this field blank</label>
          <input
            id="website_honeypot"
            name="website_honeypot"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website_honeypot}
            onChange={handleChange}
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Your Name <span className="text-rose-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            disabled={isSubmitting}
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Rohan Sharma"
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/20 disabled:bg-slate-50 disabled:cursor-not-allowed ${
              errors.name
                ? "border-rose-400 bg-rose-50/20 focus:border-rose-500"
                : "border-slate-200 hover:border-slate-300 focus:border-rose-500"
            }`}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-rose-600 font-medium">
              {errors.name}
            </p>
          )}
        </div>

        {/* Business Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Business Email <span className="text-rose-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            disabled={isSubmitting}
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. rohan@company.in"
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/20 disabled:bg-slate-50 disabled:cursor-not-allowed ${
              errors.email
                ? "border-rose-400 bg-rose-50/20 focus:border-rose-500"
                : "border-slate-200 hover:border-slate-300 focus:border-rose-500"
            }`}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-rose-600 font-medium">
              {errors.email}
            </p>
          )}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Company / Organization <span className="text-rose-600">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            disabled={isSubmitting}
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Bharat Logistics Ltd. / FinFlow"
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/20 disabled:bg-slate-50 disabled:cursor-not-allowed ${
              errors.company
                ? "border-rose-400 bg-rose-50/20 focus:border-rose-500"
                : "border-slate-200 hover:border-slate-300 focus:border-rose-500"
            }`}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company && (
            <p id="company-error" className="mt-1.5 text-xs text-rose-600 font-medium">
              {errors.company}
            </p>
          )}
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Required Service <span className="text-rose-600">*</span>
          </label>
          <select
            id="service"
            name="service"
            disabled={isSubmitting}
            value={formData.service}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/20 disabled:bg-slate-50 disabled:cursor-not-allowed ${
              errors.service
                ? "border-rose-400 bg-rose-50/20 focus:border-rose-500"
                : "border-slate-200 hover:border-slate-300 focus:border-rose-500 text-slate-700"
            }`}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
          >
            <option value="">Select a service focus...</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.service && (
            <p id="service-error" className="mt-1.5 text-xs text-rose-600 font-medium">
              {errors.service}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Project Overview & Goals <span className="text-rose-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            disabled={isSubmitting}
            value={formData.message}
            onChange={handleChange}
            placeholder="Briefly describe your objectives, target timeline, or current technical bottlenecks..."
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/20 resize-y disabled:bg-slate-50 disabled:cursor-not-allowed ${
              errors.message
                ? "border-rose-400 bg-rose-50/20 focus:border-rose-500"
                : "border-slate-200 hover:border-slate-300 focus:border-rose-500"
            }`}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-rose-600 font-medium">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-sm hover:shadow transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Submitting inquiry...
              </span>
            ) : (
              "Submit Project Inquiry"
            )}
          </button>
          <p className="text-[11px] text-center text-slate-400 mt-3">
            We value your privacy. No marketing spam. Direct NDA available upon request.
          </p>
        </div>
      </form>
    </div>
  );
}
