"use client"
import { Button, CalloutRoot, CalloutText, TextArea, TextField ,Text} from '@radix-ui/themes'
import axios, { Axios } from 'axios';

import SimpleMDE from "react-simplemde-editor";
import {useForm,Controller} from 'react-hook-form'
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssuesSchema } from '@/app/validationSchemas';
import{z} from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner'



type IssueForm = z.infer<typeof createIssuesSchema>


const NewIssuePage= () => {
    const router = useRouter();
   const {register, control,handleSubmit, formState:{errors}} =  useForm<IssueForm>({
    resolver: zodResolver(createIssuesSchema),
   })
   
   const [error,setError] =useState("");
   const [isSubmitting, setSubmitting] =useState(false);

  return (
    <div className='max-w-xl'>
        {error && (<CalloutRoot color="red" className='mb-5'>
            <CalloutText>{error}</CalloutText>
        </CalloutRoot>)}
   
    <form className=' space-y-3' onSubmit={handleSubmit(async(data) =>{
        try {
            setSubmitting(true)
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            console.log(error)
            setError("An unexpected error occured");
            setSubmitting(false)
        }
      })}>
        <TextField.Root>
            <TextField.Input placeholder='Title' {...register('title')}  />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller name="description" control ={control} render={({field}) =><SimpleMDE placeholder="Description" {...field} />}/>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Submit New Issue{isSubmitting &&<Spinner  />}</Button>
    </form>
    </div>
  )
}

export default NewIssuePage