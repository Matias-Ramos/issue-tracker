'use client';

import { Button, Callout, TextField } from '@radix-ui/themes'
import Spinner from '../../components/Spinner';
import schema from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";


// generate interface based on the schema.
type NewIssueForm = z.infer<typeof schema>;

const NewIssue = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<NewIssueForm>({
        resolver: zodResolver(schema)
    });
    const router = useRouter();
    const [svError, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false);

    return (
        <div className='max-w-xl'>
            {
                svError && (
                    <Callout.Root color="red" className='mb-2'>
                        <Callout.Text>{svError}</Callout.Text>
                    </Callout.Root>)
            }
            <form onSubmit={handleSubmit(async (formData) => {
                try{
                    const options = {
                        method: 'POST',
                        body: JSON.stringify(formData),
                    };
                    setSubmitting(true);
                    const response = await fetch("/api/issues", options);
                    if (!response.ok) throw new Error();
                    else
                        router.push('/issues');
                } catch(newError){
                    setError(newError as string);
                    setSubmitting(false)
                    alert("An unexpected error occurred.")
                }
            }
            )}>
                <h1>New issue</h1>
                <TextField.Root className='my-2'>
                    <TextField.Input placeholder="Title" {...register('title')} />
                </TextField.Root>
                {
                    <ErrorMessage>
                        {errors.title?.message}
                    </ErrorMessage>
                }
                <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <SimpleMDE placeholder="Description" {...field} />
                )}
                />
                {
                    <ErrorMessage>
                        {errors.description?.message}
                    </ErrorMessage>
                }
                <Button disabled={isSubmitting}>
                    Submit
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default NewIssue