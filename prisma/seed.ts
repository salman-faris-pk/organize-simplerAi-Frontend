/* eslint-disable */
// @ts-nocheck
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient, Prisma } from "../lib/generated/prisma/client";
import "dotenv/config"


const prisma=new PrismaClient({
   adapter:  process.env.NODE_ENV === "development" ? new PrismaPg({
        connectionString: process.env.DATABASE_URL!,
      })
    : undefined,
   log: process.env.NODE_ENV === "development" ? ['warn', 'error'] : undefined
})

const postsData: Prisma.PostCreateInput[] = [
  {
    title: "Hello Prisma",
    content: "This is the first seeded post",
  },
  {
    title: "Supabase + Prisma",
    content: "Seeding data works correctly",
  },
  {
    title: "Draft Post",
    content: null,
    data: "hello my friend",
  },
];

async function main() {
  await prisma.post.deleteMany();

  for (const post of postsData) {
    await prisma.post.create({
      data: post,
    });
  }

  console.log("Post seed data inserted");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
