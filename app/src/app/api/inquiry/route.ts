import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { inquirySchema } from "../../../../schema/inquiry";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const parsedData = inquirySchema.parse(body);

    const { name, email, content } = parsedData;

    // データベースに保存
    await prisma.inquiry.create({
      data: {
        name,
        email,
        content,
        createdAt: new Date(),
      },
    });

    // 成功レスポンスを返す
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
    // Zodバリデーションエラーの場合
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "入力エラー",
          errors: error.errors, // 具体的なエラーメッセージを返す
        },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // その他のサーバーエラー
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
