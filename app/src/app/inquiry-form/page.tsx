"use client"
import { handleSASubmit } from "@/utils";
import { Button, Center, Container, FormControl, Heading, Input, Textarea, VStack } from "@yamada-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Home() {

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [content, setContent] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const value = e.currentTarget.value

        switch (e.currentTarget.name) {
            case "name":
                setName(value)
                break;
            case "email":
                setEmail(value)
                break;
            case "content":
                setContent(value)
                break;

            default:
                break;
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const isSuccess = await handleSASubmit(formData);
        
        if (isSuccess) {
            setName('');
            setEmail('');
            setContent('');
        }
    }

    return (
        <Container m="auto" as={Center}>
            <Heading>お問合せフォーム</Heading>
            <form onSubmit={handleSubmit}>
                <VStack>
                    <FormControl label="お名前" minW="md" isRequired>
                        <Input type="text" name="name" placeholder="名前" value={name} onChange={handleChange} />
                    </FormControl>
                    <FormControl label="メールアドレス" minW="md" isRequired>
                        <Input type="email" name="email" placeholder="メールアドレス" value={email} onChange={handleChange} />
                    </FormControl>
                    <FormControl label="内容" minW="md" isRequired>
                        <Textarea placeholder="内容" name="content" value={content} onChange={handleChange} />
                    </FormControl>
                    <Button type="submit">送信</Button>
                </VStack>
            </form>
        </Container>
    );
}
