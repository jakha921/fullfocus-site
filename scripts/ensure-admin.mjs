import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function requireAdminConfig(existingUsers) {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "Admin";

  if (!email || !password) {
    if (existingUsers > 0) {
      console.log("[admin] ADMIN_EMAIL or ADMIN_PASSWORD is not set; keeping existing users");
      return null;
    }

    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set before starting without an existing admin user"
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("ADMIN_EMAIL must be a valid email address");
  }

  if (password.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters long");
  }

  return { email, password, name };
}

async function main() {
  const existingUsers = await prisma.user.count();
  const adminConfig = requireAdminConfig(existingUsers);

  if (!adminConfig) return;

  const hashedPassword = await bcrypt.hash(adminConfig.password, 10);
  const admin = await prisma.user.upsert({
    where: { email: adminConfig.email },
    update: {
      password: hashedPassword,
      name: adminConfig.name,
      role: "admin",
    },
    create: {
      email: adminConfig.email,
      password: hashedPassword,
      name: adminConfig.name,
      role: "admin",
    },
  });

  console.log(`[admin] Admin user ready: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error("[admin] Failed to ensure admin user:", error.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
