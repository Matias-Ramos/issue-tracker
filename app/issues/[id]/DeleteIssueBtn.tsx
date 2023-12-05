'use client'; 

import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "../_components/imports";

const DeleteIssueBtn = ({ issueId }: { issueId: number}) => {
  const router = useRouter();
  const [ error, setError ] = useState(false);
  const [ isDeleting, setIsDeleting ] = useState(false);

  const deleteIssue = async() => {
    try {
      setIsDeleting(true);
      await fetch(`/api/issues/${issueId}`, {method: 'DELETE'})
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setError(true);
    }
  }
  return (
    <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button disabled={isDeleting}>
          Delete issue
          {isDeleting && <Spinner />}
          </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm issue deletion</AlertDialog.Title>
        <AlertDialog.Description>Are you sure? This action cannot be undone.</AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" onClick={deleteIssue}>Delete issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root open={error}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>The issue could not be deleted</AlertDialog.Description>
        <Button onClick={ () => setError(false) }>OK</Button>
      </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueBtn