// import { Suspense } from "react";
// import Loading from "./loading";
'use client'

import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from '@tanstack/react-query';



export const queryClient = new QueryClient();



const layout = ({children}:Readonly<{children: React.ReactNode;}>) => {
  return (<>
      {/* <Suspense fallback ={ <Loading/>}> */}
      <QueryClientProvider client={queryClient}>

         <main className="text-center flex flex-col w-full h-[100vh] p-10 gap-5 bg-purple-700">
           <h1 className="font-bold text-3xl">this is FAQ layout</h1>
            {children}
         </main>
      </QueryClientProvider>
      {/* </Suspense> */}
  </>
  )
}

export default layout
