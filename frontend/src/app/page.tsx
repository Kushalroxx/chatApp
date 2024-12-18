import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
export default function Home() {
  if (cookies().has("token")){
    redirect("/chats")
  }
  return (
    <>
    <Link href={"/login"}>login</Link><br></br>
    home
    </>
  )
}