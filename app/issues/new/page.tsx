"use client"
import { Button, CalloutRoot, CalloutText, TextArea, TextField } from '@radix-ui/themes'
import axios, { Axios } from 'axios';

import SimpleMDE from "react-simplemde-editor";
import {useForm,Controller} from 'react-hook-form'
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueForm {
    title:string,
    description: string,
}

const NewIssuePage= () => {
    const router = useRouter();
   const {register, control,handleSubmit} =  useForm<IssueForm>()
   
   const [error,setError] =useState("");

  return (
    <div className='max-w-xl'>
        {error && (<CalloutRoot color="red" className='mb-5'>
            <CalloutText>{error}</CalloutText>
        </CalloutRoot>)}
   
    <form className=' space-y-3' onSubmit={handleSubmit(async(data) =>{
        try {
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            console.log(error)
            setError("An unexpected error occured");
        }
      })}>
        <TextField.Root>
            <TextField.Input placeholder='Title' {...register('title')}  />
        </TextField.Root>
        <Controller name="description" control ={control} render={({field}) =><SimpleMDE placeholder="Description" {...field} />}/>
        
        <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage