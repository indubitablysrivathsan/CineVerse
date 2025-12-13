const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Clear films table
  await prisma.film.deleteMany({});
  
  // Clear journal entries table (if you seeded any)
  await prisma.journalEntry.deleteMany({});

  console.log("Seeded data cleared.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
