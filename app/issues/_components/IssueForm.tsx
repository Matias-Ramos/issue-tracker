'use client';

// Works for both Updating and Posting issues.

import "easymde/dist/easymde.min.css";
import {
    // radix-ui
    Button,
    Callout,
    Controller,
    ErrorMessage,
    // interface
    IssueInterface,
    // components
    Spinner,
    TextField,
    SimpleMDE,
    // validation
    schema,
    // hooks
    useForm,
    useRouter,
    useState,
    zodResolver,
    Issue,
} from './imports';


const IssueForm = ({ issue }: { issue?: Issue }) => {

    /*********** */
    // Hooks
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueInterface>({
        resolver: zodResolver(schema)
    });
    const router = useRouter();
    const [svError, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false);
    const onSubmit = handleSubmit(async (formData: IssueInterface) => {
        try {
            setSubmitting(true);
            let response: Response;
            if (issue)
                response = await fetch(`/api/issues/${issue.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(formData),
                })
            else
                response = await fetch('/api/issues/', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                })
            if (!response.ok)
                throw new Error();
            else{
                router.push('/issues/list');
                router.refresh();
            }
        } catch (err) {
            setSubmitting(false)
            setError(err as string);
        }
    }
    )
    /*********** */
    // Rendering
    return (
        <div className='max-w-xl'>
            {
                svError &&
                <Callout.Root color="red" className='mb-2'>
                    <Callout.Text>{svError}</Callout.Text>
                </Callout.Root>
            }
            <form onSubmit={onSubmit}>
                <TextField.Root className='my-2'>
                    <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register('title')} />
                </TextField.Root>
                {<ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>}
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                {<ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>}
                <Button disabled={isSubmitting}>
                    {issue ? 'Update issue' : 'Submit New Issue'}{' '}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default IssueForm



