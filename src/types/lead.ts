export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  status: "new" | "contacted" | "in_progress" | "closed";
  created_at: string;
}

export type CreateLeadInput = Omit<Lead, "id" | "created_at" | "status">;
