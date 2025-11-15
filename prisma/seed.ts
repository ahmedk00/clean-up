import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // Default admin credentials
  const defaultAdmin = {
    email: "admin@cleaningservices.com",
    password: "Admin@123456", // Change this in production!
    name: "Admin User",
  };

  // Hash password
  const hashedPassword = await bcrypt.hash(defaultAdmin.password, 12);

  // Create or update admin user
  const admin = await prisma.admin.upsert({
    where: { email: defaultAdmin.email },
    update: {},
    create: {
      email: defaultAdmin.email,
      password: hashedPassword,
      name: defaultAdmin.name,
    },
  });

  console.log("✅ Admin user created/updated:");
  console.log("   Email:    ", defaultAdmin.email);
  console.log("   Password: ", defaultAdmin.password);
  console.log("   Name:     ", defaultAdmin.name);
  console.log("\n⚠️  IMPORTANT: Change the default password after first login!\n");

  // Optional: Create sample previous work entries
  const sampleWork = await prisma.previousWork.upsert({
    where: { id: "sample-work-1" },
    update: {},
    create: {
      id: "sample-work-1",
      title: "Modern Office Deep Cleaning",
      description: "Complete deep cleaning of a 5000 sq ft office space including carpet cleaning, window washing, and sanitization of all surfaces.",
      category: "Commercial",
      images: [
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",
        "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800",
      ],
      featured: true,
    },
  });

  console.log("✅ Sample previous work created:");
  console.log("   Title:    ", sampleWork.title);
  console.log("   Category: ", sampleWork.category);
  console.log("   Featured: ", sampleWork.featured ? "Yes" : "No");

  console.log("\n🎉 Seeding completed successfully!\n");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
