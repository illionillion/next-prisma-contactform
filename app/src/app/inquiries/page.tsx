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
    const cols = Object.keys(data[0])
    return <Container m="auto" as={Center}>
        <Heading>お問合せ一覧</Heading>
        <NativeTable>
            <Thead>
                <Tr>
                    {cols.map(((col, i) => (
                        <Th key={i}>{col}</Th>
                    )))}
                </Tr>
            </Thead>
            <Tbody>
                {
                    data.map((row, i) => (
                        <Tr key={i}>
                            <Td>{row["id"]}</Td>
                            <Td>{row["name"]}</Td>
                            <Td>{row["email"]}</Td>
                            <Td>{row["content"]}</Td>
                            <Td>{row["createdAt"]?.toISOString()}</Td>
                        </Tr>
                    ))
                }
            </Tbody>
        </NativeTable>
    </Container>
}

export default Page