import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { cookies } from "next/headers";

export default function Home() {
  return (
    <div className="overflow-y-hidden h-screen bg-zinc-50">
      <Navbar login={cookies().has("token")}/>
      <SideBar/>
      hello world</div>
  )
}