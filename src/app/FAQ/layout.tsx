import { Suspense } from "react";
import Loading from "./loading";


const layout = ({children}:Readonly<{children: React.ReactNode;}>) => {
  return (<>
      <Suspense fallback ={ <Loading/>}>
         <main className="text-center flex flex-col w-full h-[100vh] p-10 gap-5 bg-red-400">
           <h1 className="font-bold text-3xl">this is FAQ layout</h1>
            {children}
         </main>
      </Suspense>
  </>
  )
}

export default layout
