import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  // リクエストボディの取得
  const { name, email, content } = (await request.json()) as {
    name: string;
    email: string;
    content: string;
  };

  if (!name || !email || !content) {
    return NextResponse.json(
      {
        message: "データが不足しています。",
      },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    // お問い合わせ内容をデータベースに保存
    await prisma.inquiry.create({
      data: {
        name,
        email,
        content,
        // SQLみたいに勝手に現在時刻が割り当てられると思ったら必須らしい
        createdAt: new Date(),
      },
    });

    // レスポンスを返す
    return NextResponse.json(
      {
        message: "お問い合わせありがとうございます。",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error("post inquiry error:", error);
    return NextResponse.json(
      {
        message: "サーバーエラー",
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
