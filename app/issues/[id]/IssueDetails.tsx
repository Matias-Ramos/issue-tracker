import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import { Issue } from "@prisma/client"
import { Card, Flex, Heading } from "@radix-ui/themes"
import ReactMarkdown from "react-markdown"

const IssueDetails = ({ issue }: { issue: Issue }) => (
    <>
        <Heading>{issue.title}</Heading>
        <Flex className="space-x-3 gap-x-2" my="2">
            <IssueStatusBadge status={issue.status} />
            {issue.createdAt.toDateString()}
        </Flex>
        <Card className="prose" mt="4">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
    </>
)
export default IssueDetails