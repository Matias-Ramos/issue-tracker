import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueBtn from "./EditIssueBtn";
import IssueDetails from "./IssueDetails";
import DeleteIssueBtn from "./DeleteIssueBtn";
import { getServerSession } from "next-auth";
import AsigneeSelect from "./AsigneeSelect";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession();

  /******************** */
  // URL param validation
  const isNumber = /^\d+$/.test(params.id);
  if (!isNumber) notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  /******************** */
  // Rendering
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-5">
        <IssueDetails issue={issue} />
      </Box>

      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AsigneeSelect issue={issue} />
            <DeleteIssueBtn issueId={issue.id} />
            <EditIssueBtn issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
