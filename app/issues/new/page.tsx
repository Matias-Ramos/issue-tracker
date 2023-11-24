'use client';

import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssue = () => (
    <div className='max-w-xl'>
        <h1>New issue</h1>
        <TextField.Root className='my-4'>
            <TextField.Input placeholder="Title" />
        </TextField.Root>
        <TextArea placeholder="Description" className='my-4' />
        <Button>Submit</Button>
    </div>
)

  

export default NewIssue