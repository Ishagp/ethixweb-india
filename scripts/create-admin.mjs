/**
 * CLI script to create an authorized admin account in Supabase Auth securely.
 * 
 * Usage:
 *   node scripts/create-admin.mjs <email> <password>
 * 
 * Example:
 *   node scripts/create-admin.mjs admin@ethixweb.com ComplexPassword123!
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Load .env.local variables manually if running as standalone script
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
        const [k, ...v] = trimmed.split("=");
        process.env[k.trim()] = v.join("=").trim();
      }
    }
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.log("Usage: node scripts/create-admin.mjs <admin_email> <admin_password>");
  console.log("Example: node scripts/create-admin.mjs admin@ethixweb.in SecureAdminPass#2026");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function createAdmin() {
  console.log(`Creating/verifying admin account for: ${email}...`);

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Automatically marks email as confirmed
    user_metadata: { role: "admin" },
  });

  if (error) {
    console.error("❌ Failed to create admin user:", error.message);
    process.exit(1);
  }

  console.log("✅ Admin account created successfully!");
  console.log(`   User ID: ${data.user.id}`);
  console.log(`   Email: ${data.user.email}`);
  console.log(`   Role: ${data.user.user_metadata?.role}`);
  console.log("\nYou can now sign in at http://localhost:3000/admin/login");
}

createAdmin();
