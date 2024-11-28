"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { supabaseClient } from "src/utils/supabase_db"
import { cn } from "s/lib/utils"
import { clientAuthSchema, oauthAuthSchema, samlAuthSchema } from "src/utils/auth"
import { Button } from "s/components/ui/button"
import { Input } from "s/components/ui/input"
import { Label } from "s/components/ui/label"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "s/components/ui/form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "s/components/ui/radio-group"

interface ClientAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
type FormData = z.infer<typeof clientAuthSchema | typeof oauthAuthSchema | typeof samlAuthSchema>

export default function AuthenticationForm() {
    const form = useForm<FormData>({
        resolver: zodResolver(clientAuthSchema)
    })

    const [IsFormFilled, checkIsFilledFormed] = React.useState<boolean>(false)
    const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)

    const searchParams = useSearchParams()

    const [role, setRole] = React.useState<string>("certificate_creator")
    const [authType, setAuthType] = React.useState<string>("email_password")

    const handleRoleChange = (value: string) => {
        setRole(value)
        if (value === "certificate_creator") {
            setAuthType("email_password")
        } else if (value === "certificate_validator") {
            setAuthType("saml_sso")
        } else if (value === "certificate_buyer") {
            setAuthType("email_password")
        }
    }

    const handleAuthTypeChange = (value: string) => {
        setAuthType(value)
    }

    return (
        <>
        <div>
            <RadioGroup value={role} onValueChange={handleRoleChange} className="radio-group">
                <Label htmlFor="certificate_creator" className="radio-item">
                    <RadioGroupItem value="certificate_creator" id="certificate_creator" />
                    Certificate Creator
                </Label>
                <Label htmlFor="certificate_validator" className="radio-item">
                    <RadioGroupItem value="certificate_validator" id="certificate_validator" />
                    Certificate Validator
                </Label>
                <Label htmlFor="certificate_buyer" className="radio-item">
                    <RadioGroupItem value="certificate_buyer" id="certificate_buyer" />
                    Certificate Buyer
                </Label>
            </RadioGroup>
            </div>
            <br/>
            <div className="class">
            {role === "certificate_creator" && (
                <RadioGroup value={authType} onValueChange={handleAuthTypeChange} className="radio-group">
                    <Label className="radio-item">
                        <RadioGroupItem value="email_password" />
                        Email and Password
                    </Label>
                    <Label className="radio-item">
                        <RadioGroupItem value="oauth" />
                        OAuth
                    </Label>
                </RadioGroup>
            )}

            {role === "certificate_buyer" && (
                <RadioGroup value={authType} onValueChange={handleAuthTypeChange} className="radio-group">
                    <Label className="radio-item">
                        <RadioGroupItem value="email_password" />
                        Email and Password
                    </Label>
                    <Label className="radio-item">
                        <RadioGroupItem value="oauth" />
                        OAuth
                    </Label>
                </RadioGroup>
            )}

            {role === "certificate_validator" && (
                <RadioGroup value={authType} onValueChange={handleAuthTypeChange} className="radio-group">
                    <Label className="radio-item">
                        <RadioGroupItem value="saml_sso" />
                        SAML SSO
                    </Label>
                </RadioGroup>
            )}
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit((values) => console.log(values))}>
                    {authType === "email_password" && (
                        <>
                            <FormField
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {authType === "oauth" && (
                        <Button type="button" onClick={() => signIn("github")}>
                            Sign in with GitHub
                        </Button>
                    )}

                    {authType === "saml_sso" && (
                        <Button type="button" onClick={() => signIn("saml")}>
                            Sign in with SAML SSO
                        </Button>
                    )}

                    {authType !== "oauth" && <Button type="submit">Submit</Button>}
                </form>
            </Form>
        </>
    )
}
