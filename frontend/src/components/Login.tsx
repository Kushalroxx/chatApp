"use client"
import {
  Input,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from 'react'
import { Card } from "./ui/card";
import {motion} from "framer-motion"
import axios from "axios"
import Loader from "./Loader";
import {useRouter} from "nextjs-toploader/app"

function Login() {
  const [loading,setLoading] = React.useState(false)
  const router = useRouter()
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Must be a valid email" }),
  })

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      setLoading(true)
      await axios.post("http://localhost:3001/login",{email:values.email},{withCredentials:true})
      router.push("/")
    } catch (error) {
      form.setError("email", { type: "custom", message: "Something went wrong" })
      console.log(error)
    } finally{
      setLoading(false)
    }
  }
 
    if(loading){
      return <Loader loading={loading}/>
    }else{
      return(
    <div className="h-screen w-screen flex items-center justify-center bg-zinc-100">
      <motion.div initial={{opacity:0}} animate={{opacity:1, transition:{duration:0.6, staggerChildren:0.5}}} whileHover={{scale:1.01}} transition={{type:"spring", stiffness:200}}>
    <Card className="px-10 py-8 bg-white ">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-14 items-center w-full">
        <FormLabel className="text-2xl md:text-3xl font-bold">Login</FormLabel>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Email</FormLabel>
              <FormControl>
                <Input className="w-72 h-10 md:w-96" placeholder="Enter email" {...field} value={field.value||""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            <Button className=" font-bold bg-blue-600 hover:bg-blue-700" type="submit">Submit</Button>
      </form>
    </Form>
    </Card>
    </motion.div>
    </div>
        )}
      }

export default Login