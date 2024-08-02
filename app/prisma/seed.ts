import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const inquirys: Prisma.InquiryCreateInput[] = [
    {
      name: "John",
      email: "john@email.com",
      content: "hello",
      createdAt: new Date(),
    },
    {
      name: "John2",
      email: "john2@email.com",
      content: "hello world",
      createdAt: new Date(),
    },
  ];

  await prisma.$transaction(
    inquirys.map((inquiry) => prisma.inquiry.create({ data: inquiry }))
  );

  console.log("データ挿入完了");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
