'use client';

import {
    // radix-ui
    Button,
    Callout,
    TextField,
    // components
    Spinner,
    Controller,
    ErrorMessage,
    SimpleMDE,
    // validation
    schema,
    zodResolver,
    // hooks
    useForm,
    useRouter,
    useState,
    // fetch
    postIssue,
    // interface
    IssueInterface,
} from './imports'
import "easymde/dist/easymde.min.css";

const NewIssue = () => {

    /*********** */
    // Hooks
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueInterface>({
        resolver: zodResolver(schema)
    });
    const router = useRouter();
    const [svError, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false);
    const onSubmit = handleSubmit(async (formData: IssueInterface) => {
        try{
            setSubmitting(true);
            const response = await postIssue(formData);
            if (!response.ok) 
                throw new Error();
            else 
                router.push('/issues');
        } catch(err){
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
                <h1>New issue</h1>
                <TextField.Root className='my-2'>
                    <TextField.Input placeholder="Title" {...register('title')} />
                </TextField.Root>
                {<ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>}
                <Controller
                 name="description"
                 control={control}
                 render={({ field }) => (
                    <SimpleMDE placeholder="Description" {...field} />
                )}
                />
                {<ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>}
                <Button disabled={isSubmitting}>
                    Submit
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default NewIssue