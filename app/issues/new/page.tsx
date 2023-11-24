'use client';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import schema from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from "zod";

// generate interface based on the schema.
type NewIssueForm = z.infer<typeof schema>;

const NewIssue = () => {
    const { register, control, handleSubmit, formState: { errors }} = useForm<NewIssueForm>({
        resolver: zodResolver(schema)
    });
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
                <TextField.Root className='my-2'>
                    <TextField.Input placeholder="Title" {...register('title')} />
                </TextField.Root>
                { errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                { errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
                <Button>Submit</Button>
            </form>
        </div>
    )
}

export default NewIssue