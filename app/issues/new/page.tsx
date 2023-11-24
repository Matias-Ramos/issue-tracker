'use client';

import { Button, Callout, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from 'react';

interface NewIssueForm {
    title: string;
    description: string;
}

const NewIssue = () => {
    const { register, control, handleSubmit } = useForm<NewIssueForm>();
    const router = useRouter();
    const [error, setError] = useState('')

    return (
        <div className='max-w-xl'>
            {
                error && (
                    <Callout.Root color="red" className='mb-2'>
                        <Callout.Text>{error}</Callout.Text>
                    </Callout.Root>)
            }
            <form onSubmit={handleSubmit(async (formData) => {
                const options = {
                    method: 'POST',
                    body: JSON.stringify(formData),
                };
                const response = await fetch("/api/issues", options);
                if (!response.ok)
                    setError('An unexpected error occurred.');
                else
                    router.push('/issues');
            }
            )}>
                <h1>New issue</h1>
                <TextField.Root className='my-4'>
                    <TextField.Input placeholder="Title" {...register('title')} />
                </TextField.Root>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />

                <Button>Submit</Button>
            </form>
        </div>
    )
}

export default NewIssue