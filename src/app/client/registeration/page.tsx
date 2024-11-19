"use client"

import Link from 'next/link'
import {Form, FormControl, FormField} from 's/components/ui/form'
import { cn } from 's/lib/utils'
import AuthenticationForm  from 'src/components/registeration_form_client'

// export const metadata = {
//     title: "register on the coysal platform",
//     description: "add your personal details and then we will review and create new account if needed.",
// }
export default function RegisterForm() {
    return(
        <>
        <div className='container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0' >
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-3xl font-bold'>Register on the Coysal Platform</h1>
                <p className='text-sm text-gray-500'>register your investor profile and then based on KYI score we will create the account.</p>
                <AuthenticationForm />
            </div>
        </div>
        </>
    );
}
