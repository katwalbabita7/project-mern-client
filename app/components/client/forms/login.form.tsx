"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "../../common/ui/input";
import Button from "../../common/ui/button";
import { LoginFormData, LoginSchema } from "@/schemas/client/auth.schema";
import { login } from "@/api/client/auth.api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useClientAuthStore } from "@/store/clientAuthStore";

const LoginForm = () => {
    const router = useRouter();
    const setAuth = useClientAuthStore((state) => state.setAuth);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginFormData>({
        resolver: yupResolver(LoginSchema),
        mode: 'onBlur',
    });

    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            const user = response?.data?.data || response?.data?.user || response?.data;
            const token = response?.data?.access_token || response?.access_token || "";

            if (user && token) {
                setAuth(user, token);
                // 2. Client token set
        localStorage.setItem("client_token", token);

        // 3. Admin token clear (important)
        localStorage.removeItem("admin_token");
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");

        // 4. Admin cookie pani clear
        document.cookie = "access_token=; path=/; max-age=0";
            }
            toast.success(response?.message ?? 'Login Successful!!');
            router.push('/');
            router.refresh();
        },
        onError: (error: any) => {
            toast.error(error?.message ?? 'Login failed!!');
            setError('root', {
                message: error?.message || 'Login failed. Please try again.'
            });
        },
    });

    const onSubmit = (data: LoginFormData) => {
        mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            {/* Show root error */}
            {errors.root && (
                <div className='text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md font-medium flex items-center gap-1.5'>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                    <span>{errors.root.message}</span>
                </div>
            )}
            
            {/* email input */}
            <Input
                id='email'
                required
                name='email'
                placeholder='enter email'
                label='Email'
                type='email'
                register={register}
                error={errors.email} 
            />
            
            {/* password input */}
            <Input
                id='password'
                required={true}
                name='password'
                placeholder='enter password'
                label='Password'
                type='password'
                register={register}
                error={errors.password}  //Pass error
            />

            {/* button */}
            <div className='mt-4'>
                <Button 
                    label={isPending ? 'Logging in...' : 'Login'} 
                    type={'submit'}
                    disabled={isPending}  
                />
            </div>
        </form>
    );
};

export default LoginForm;