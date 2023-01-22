import { Mafs } from "mafs"
import React from "react"

interface ILayout{
    children: React.ReactNode,
    math:React.ReactNode,
}

export default function Layout({children, math}: ILayout) {
  return (
    <>  
      <main className="bg-black flex w-screen h-screen items-center flex-col">
    <div className="w-[95%] h-max my-4 border">
        <Mafs>
                {math}
            </Mafs>
    </div>
        <div className="text-neutral-300 border font-sans">
            {children}
        </div>
      </main>  


    </>
  )
}
