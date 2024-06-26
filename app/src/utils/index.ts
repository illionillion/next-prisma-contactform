"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handleSASubmit = async (formData: FormData) => {
    const name = formData.get("name")?.toString()
    const email = formData.get("email")?.toString()
    const content = formData.get("content")?.toString()
    if (!name || !email || !content) {
        return false
    }

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

    return true
}