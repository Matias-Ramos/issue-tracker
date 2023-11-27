import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
    params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {

    const isNumber = /^\d+$/.test(params.id);
    console.log(isNumber);
    if(!isNumber) notFound();

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })
    if (!issue) notFound()

    return (
        <div>
            <ol>
                <li>{issue.title}</li>
                <li>{issue.description}</li>
                <li>{issue.status}</li>
                <li>{issue.createdAt.toDateString()}</li>
                <li>{issue.updatedAt.toDateString()}</li>
            </ol>
        </div>
    )
}

export default IssueDetailPage