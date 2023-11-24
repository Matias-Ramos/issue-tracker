'use client';

import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssue = () => (
    <div className='max-w-xl'>
        <h1>New issue</h1>
        <TextField.Root className='my-4'>
            <TextField.Input placeholder="Title" />
        </TextField.Root>
        <SimpleMDE placeholder="Description" />
        <Button>Submit</Button>
    </div>
)

export default NewIssue