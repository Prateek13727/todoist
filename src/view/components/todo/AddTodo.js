import React from "react";
import { useForm } from "react-hook-form";

export default function App({addTodo}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const onSubmit = ({newTodo}) => {
    addTodo(newTodo)
  }

  console.log(watch("newTodo")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}> 
      <input {...register("newTodo", { required: true })} />
      {errors.newTodo && <span>This field is required</span>}
      
      <input type="submit" />
    </form>
  );
} 