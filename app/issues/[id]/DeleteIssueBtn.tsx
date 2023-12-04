'use client'; 

import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import { useRouter } from "next/navigation";

const DeleteIssueBtn = ({ issueId }: { issueId: number}) => {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button>Delete issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm issue deletion</AlertDialog.Title>
        <AlertDialog.Description>Are you sure? This action cannot be undone.</AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" onClick={ async()=> {
              await fetch(`/api/issues/${issueId}`, {method: 'POST'})
              router.push("/");
              router.refresh();
            }} >Delete issue</Button>
          </AlertDialog.Action>

        </Flex>
      </AlertDialog.Content>

    </AlertDialog.Root>
  )
}

export default DeleteIssueBtn