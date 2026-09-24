'use client'
import react from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()
const QueryProvider = ({children}: Readonly<{ children: react.ReactNode}>)=>{
    return(
            <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider;