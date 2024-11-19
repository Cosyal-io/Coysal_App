"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import {zodResolver} from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {supabaseClient} from "src/utils/supabase_db"
import { cn } from "s/lib/utils"
import { clientAuthSchema } from "src/utils/auth"
import { Button } from "s/components/ui/button"
import { Input } from "s/components/ui/input"
import { Label } from "s/components/ui/label"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "s/components/ui/form"
import { toast } from "sonner"
import {useRouter} from "next/navigation"
interface ClientAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof clientAuthSchema>

const router = useRouter();


export default function AuthenticationForm(
) {
    const form = useForm<FormData>({
    resolver: zodResolver(clientAuthSchema)
})


const [IsFormFilled, checkIsFilledFormed] = React.useState<boolean>(false)
const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)

const searchParams = useSearchParams()

async function onSubmit(
    values: z.infer<typeof clientAuthSchema>
) {
    checkIsFilledFormed(true)
    try {



    const signedIn = await signIn("email", {
        email: values.email,
        redirect: false
    })

    if (signedIn?.error) {
        console.error("Sign in error", signedIn.error)
        return
    }
    
    // storing the email and wallet address in the table
    // storing the file.
    let userspace = supabaseClient.storage.createBucket(values.username)
    const file = values.personal_investor_pdf?.[0]
    let uploadfile = supabaseClient.storage.from((await userspace).data?.name!).upload(`${values.username}_kyi_file.pdf`, file)
    toast("KYI file is stored in bucket" + (await uploadfile).data?.id )

    // creating and storing storing  the username  info in coysal DB
    let table_reader = supabaseClient.from("Clients").insert({
        client_name: values.username,
        email_address: values.email,
    })
    // now redirecting to the dashboard.

    table_reader

}
catch(e) {
    console.error("submit form didnt work")
    toast("submission-form is failed")
}

}
    return (
        <>
        <div className={(cn("grid gap-6"))}>
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"
                >
                {/* <div className="grid gap-2">
                    <div className="grid gap-1">
             */}
            <FormField
            control={form.control}
            name="username"
            render={
                ({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }
            >
            </FormField>
            <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="wallet_address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Wallet Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Wallet Address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="personal_investor_pdf"
                render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>File to be uploaded</FormLabel>
                        <FormControl>
                          <Input type="file" placeholder="adding " {...form.register("personal_investor_pdf")}
                            onChange={(event) => {
                                field.onChange(event.target?.files?.[0] ?? undefined);
                              }}                          
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}/>



                <Button type="submit" className="w-full">
                    Submit
                </Button>
            {/* <Label className="sr-only" htmlFor="email">
            Email
            </Label>
            <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            />
            <Label className="sr-only" htmlFor="email">
            Username
            </Label>
            <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"                    
            />
            <Label className="sr-only" htmlFor="email">
            Wallet Address
            </Label>
            <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"                    
            />
            <Button
            type="submit"
            className="w-full"
            >
            Submit
            </Button> */}
                    {/* </div>
                </div> */}
                </form>
            </Form>
        </div>
        </>
    )


}
