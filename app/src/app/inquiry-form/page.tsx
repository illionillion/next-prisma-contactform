"use client";

import { handleSASubmit } from "@/utils";
import { Button, Center, Container, FormControl, Heading, Input, Textarea, VStack } from "@yamada-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InquiryForm, inquirySchema } from "@/schema/inquiry";

export default function Home() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<InquiryForm>({
        resolver: zodResolver(inquirySchema),
    });

    const onSubmit = async (data: InquiryForm) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("content", data.content);

        const isSuccess = await handleSASubmit(formData);
        if (isSuccess) {
            reset(); // Reset the form on success
        }
    };

    return (
        <Container m="auto" as={Center}>
            <Heading>お問合せフォーム</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <FormControl label="お名前" minW="md"
                        isInvalid={!!errors.name}
                        errorMessage={errors.name ? errors.name.message : undefined}
                    >
                        <Input
                            type="text"
                            placeholder="名前"
                            {...register("name")}
                        />
                    </FormControl>

                    <FormControl label="メールアドレス" minW="md"
                        isInvalid={!!errors.email}
                        errorMessage={errors.email ? errors.email.message : undefined}
                    >
                        <Input
                            type="text" // 敢えてtextにしてる
                            placeholder="メールアドレス"
                            {...register("email")}
                        />
                    </FormControl>

                    <FormControl label="内容" minW="md"
                        isInvalid={!!errors.content}
                        errorMessage={errors.content ? errors.content.message : undefined}
                    >
                        <Textarea
                            placeholder="内容"
                            {...register("content")}
                        />
                    </FormControl>

                    <Button type="submit" isLoading={isSubmitting}>
                        送信
                    </Button>
                </VStack>
            </form>
        </Container>
    );
}
