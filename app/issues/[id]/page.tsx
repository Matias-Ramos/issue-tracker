import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueBtn from "./EditIssueBtn";
import IssueDetails from "./IssueDetails";

interface Props {
    params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {

    /******************** */
    // URL param validation
    const isNumber = /^\d+$/.test(params.id);
    if(!isNumber) notFound();
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })
    if (!issue) notFound()


    /******************** */
    // Rendering
    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditIssueBtn issueId={issue.id} />
            </Box>
        </Grid>
    )
}

export default IssueDetailPage