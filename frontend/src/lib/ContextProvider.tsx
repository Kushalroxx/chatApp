"use client"
import NextTopLoader from "nextjs-toploader"
import {RecoilRoot} from "recoil"

function ContextProvider({children}:{children:React.ReactNode}) {
  return (
    <div>
        <RecoilRoot>
        <NextTopLoader showSpinner={false} speed={300}/>
        {children}
        </RecoilRoot>
    </div>
  )
}

export default ContextProvider