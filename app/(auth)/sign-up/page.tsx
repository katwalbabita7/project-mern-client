
import Link from 'next/link';
import RegisterForm from "@/app/components/client/forms/sign-up.form";
import react from "react";


const SignUpPage = ()=>{
    return(
       <main className='min-h-screen flex justify-center items-center'>
            <section className='w-137.5 max-w-[95vw] max-h-[90vh] overflow-y-auto border
            border-gray-300 rounded-md py-6 px-8 bg-white shadow-md flex flex-col'>
                {/* heading */}
                <div className='mb-4 flex flex-col gap-1 text-center'>
                    <h1 className='font-semibold text-xl text-blue-500'>Create Account</h1>
                    <p className='font-sm text-gray-500'>Welcome</p>
                </div>
                {/* form */}
                <RegisterForm />
                <div className='text-center mt-1'>
                    <p>Already have an Account? 
                        <Link href={'/login'}>
                        <span className='mx-1 text-blue-500 font-semibold'>Login</span>
                        </Link>
                        
                        </p>
                </div>
            </section>
            
        </main>
    )
}
export default SignUpPage;