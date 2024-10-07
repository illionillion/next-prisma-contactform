"use server";

import { inquirySchema } from "@/schema/inquiry";
import { z } from "zod";
import { prisma } from "@/utils/prisma";

export const handleSASubmit = async (formData: FormData) => {
    // Extract values from formData, but keep them as possibly undefined
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const content = formData.get("content")?.toString();

    // Zod validation
    try {
        // Use Zod to validate and ensure values are not undefined
        const validatedData = inquirySchema.parse({ name, email, content });
        
        // Zod guarantees that the data is valid, so TypeScript will now infer
        // `validatedData` has the correct types.
        // No need for `as string` assertions anymore.

        // Save to the database
        await prisma.inquiry.create({
            data: {
                name: validatedData.name,  // Now TypeScript knows these are strings
                email: validatedData.email,
                content: validatedData.content,
                createdAt: new Date(),
            },
        });
        return true;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation errors:", error.errors);
            return false; // You can handle errors here if needed
        }

        console.error("Error saving to the database:", error);
        return false;
    }
};
