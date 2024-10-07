import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(1, { message: "お名前は必須です。" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "メールアドレスは必須です。" })
    .email({ message: "メールアドレスが無効です。" }),
  content: z.string().trim().min(1, { message: "内容は必須です。" }),
});

export type InquiryForm = z.infer<typeof inquirySchema>;
