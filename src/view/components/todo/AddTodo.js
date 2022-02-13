import React from "react";
import { useForm } from "react-hook-form";
import { Button } from 'react-bootstrap';

export default function App({addTodo}) {
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState } = useForm({mode: "onChange"})
  
  const onSubmit = ({newTodo}) => {
    addTodo(newTodo)
  }

  console.log(watch("newTodo")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}> 
      <input {...register("newTodo", { required: true })} />
      <Button disabled={!formState.isValid} onClick={handleSubmit(onSubmit)}>Add</Button>
    </form>
  );
}   