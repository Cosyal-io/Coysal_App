"use client"

import Link from 'next/link'
import {Form, FormControl, FormField} from 's/components/ui/form'
import { cn } from 's/lib/utils'
import AuthenticationForm  from 'src/components/registeration_form_client'

export default function RegisterForm() {
    return (
        <div className="container mx-auto flex h-screen items-center justify-center p-4">
            <div className="w-full max-w-md flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center">Register on the Coysal Platform</h1>
            <p className="text-sm text-gray-500 text-center mb-6">Register your investor profile and then based on KYI score we will create the account.</p>
            <AuthenticationForm />
            </div>
        </div>

    )
}
