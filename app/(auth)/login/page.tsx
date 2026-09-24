
import Link from 'next/link';
import LoginForm from "@/app/components/client/forms/login.form";
import react from "react";



const LoginPage = ()=>{
    return(
        <main className='min-h-full flex justify-center items-center'>
            <section className='min-h-80 w-90 border border-gray-300 rounded-md px-6 py-8'>
                {/* heading */}
                <div className='mb-4 flex flex-col gap-1 text-center'>
                    <h1 className='font-semibold text-xl text-blue-500'>Login</h1>
                    <p className='font-sm text-gray-500'>Welcome Back</p>
                </div>
                {/* form */}
                <LoginForm />
                
                <div className='flex flex-col gap-0.5 text-center mt-1'>
                    <Link href={'/forget-password'}>
                    <p className='text-blue-500 font-medium'>forget password?</p>
                    </Link>
                    <p>Don't have an Account? 
                        <Link href={'/sign-up'}>
                        <span className='mx-1 text-blue-500 font-semibold'>Sign Up</span>
                        </Link>
                        
                        </p>
                </div>
            </section>
            
        </main>
    )
}
export default LoginPage;