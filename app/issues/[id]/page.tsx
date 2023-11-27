import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
    params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {

    const isNumber = /^\d+$/.test(params.id);
    if(!isNumber) notFound();

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })
    if (!issue) notFound()

    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex className="space-x-3" my="2">
                <IssueStatusBadge status={issue.status}/>
                {issue.createdAt.toDateString()}
            </Flex>
            <Card className="prose" mt="4">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </div>
    )
}

export default IssueDetailPage