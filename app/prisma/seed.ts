import { Prisma, PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

  const users: Prisma.UserCreateInput[] = [
    {
      username: "user1",
      password: await hash("password1", 10),
    },
    {
      username: "user2",
      password: await hash("password2", 10),
    },
  ];

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

  await prisma.$transaction([
    ...users.map((user) => prisma.user.create({ data: user })),
    ...inquirys.map((inquiry) => prisma.inquiry.create({ data: inquiry })),
  ]);


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
