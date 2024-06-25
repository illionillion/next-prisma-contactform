import { PrismaClient } from "@prisma/client";
import { Center, Container, Heading, NativeTable, Tbody, Td, Th, Thead, Tr } from "@yamada-ui/react";

const prisma = new PrismaClient();

const Page = async () => {
    const data = await prisma.inquiry.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            content: true,
            createdAt: true,
        }
    })
    return <Container m="auto" as={Center}>
        <Heading>お問合せ一覧</Heading>
        <NativeTable>
            <Thead>
                <Tr>
                    <Th>id</Th>
                    <Th>name</Th>
                    <Th>email</Th>
                    <Th>content</Th>
                    <Th>createdAt</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    data.length > 0 ? data.map((row, i) => (
                        <Tr key={i}>
                            <Td>{row["id"]}</Td>
                            <Td>{row["name"]}</Td>
                            <Td>{row["email"]}</Td>
                            <Td>{row["content"]}</Td>
                            <Td>{row["createdAt"]?.toISOString()}</Td>
                        </Tr>
                    )) : <Tr>
                        <Td colSpan={5} textAlign="center">お問合せがありません</Td>
                    </Tr>
                }
            </Tbody>
        </NativeTable>
    </Container>
}

export default Page