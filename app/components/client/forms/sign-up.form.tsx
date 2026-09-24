'use client'
import React from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormData, RegisterSchema } from '@/schemas/client/auth.schema';
import {useMutation} from "@tanstack/react-query";
import { signUp } from "@/api/client/auth.api";
import Input from '../../common/ui/input';
import Button from '../../common/ui/button';
import ErrorMessage from '../../common/ui/error-message';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const RegisterForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RegisterFormData>({
        resolver: yupResolver(RegisterSchema),
        defaultValues: {
            full_name: '',
            email: '',
            password: '',
            c_password: '',
            phone: '',
            profile_image: undefined,
        },
        mode: 'onBlur',
    });

    const { mutate, isPending } = useMutation({
        mutationFn: signUp,
        onSuccess: (response) => {
            toast.success(response?.message || "Registration successful! Please login.");
            router.push('/login');
        },
        onError: (error: any) => {
            const message = error?.message || "Registration failed. Please try again.";
            toast.error(message);
            setError('root', { message });
        },
    });

    //* on Submit
    const onSubmit = (data: RegisterFormData) => {
        const { c_password: _, ...rest } = data;
        mutate(rest);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2.5'>
            {/* Show root error */}
            {errors.root && (
                <div className='text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md font-medium flex items-center gap-1.5'>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                    <span>{errors.root.message}</span>
                </div>
            )}

            {/* Full Name */}
            <Input
                label="Full Name"
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Enter your full name"
                required
                register={register}
                error={errors.full_name}
            />

            {/* Email */}
            <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                register={register}
                error={errors.email}
            />

            {/* Password */}
            <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                register={register}
                error={errors.password}
            />

            {/* Confirm Password */}
            <Input
                label="Confirm Password"
                id="confirm_password"
                name="c_password"
                type="password"
                placeholder="Confirm your password"
                required
                register={register}
                error={errors.c_password}
            />

            {/* Phone */}
            <Input
                label="Phone Number"
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                register={register}
                error={errors.phone}
            />

            {/* Profile Image */}
            <div className='flex flex-col gap-0.5 w-full'>
                <div className='flex items-center gap-0.5'>
                    <label htmlFor="profile_image" className='text-base font-semibold text-gray-700'>
                        Profile Image
                    </label>
                </div>
                <input
                    id="profile_image"
                    type="file"
                    accept="image/*"
                    {...register('profile_image')}
                    className={`w-full border ${errors.profile_image ? 'border-red-500' : 'border-gray-300'} px-3 py-3.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                />
                {errors.profile_image && (
                    <ErrorMessage message={errors.profile_image.message} />
                )}
            </div>

            {/* Submit Button */}
            <div className='mt-4'>
                <Button 
                    label={isPending ? 'Registering...' : 'Register'}
                    type={'submit'}
                    disabled={isPending}
                />
            </div>
        </form>
    );
};

export default RegisterForm;