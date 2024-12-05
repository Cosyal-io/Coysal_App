import { Form, FormField, FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@repo/design-system/components/ui/form";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react";
import { z } from "zod"
import { Button } from "@repo/design-system/components/ui/button"
import { Input } from "@repo/design-system/components/ui/input"
import { Label } from "@repo/design-system/components/ui/label"
import { toast } from "sonner"
import { RadioGroup, RadioGroupItem } from "@repo/design-system/components/ui/radio-group"
import { SignUp } from "@clerk/elements/sign-up"


const formSchemaUser = z.object({
  username: z.string().min(2).max(50),
  role: z.enum(["certificate_issuer", "admin", "investor", "validator"]),
  description: z.string().min(10).max(1000),
  password: z.string().min(8),  
  profile_info: z.string().min(10).max(1000),
  pdf_file: z.instanceof(File).refine((val) => val.type === 'application/pdf', {
    message: "Invalid file type, must be a PDF",
  }).optional(),
})


interface ClientAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
type FormData = z.infer<typeof formSchemaUser>

//TODO: abandoned for now: implementing the form directly in the auth package.
export default function signupForm() {

 const form = useForm<FormData>({
        resolver: zodResolver(formSchemaUser)
    })

    const [IsFormFilled, checkIsFilledFormed] = React.useState<boolean>(false)
    const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)

    // const searchParams = useSearchParams()

    const [role, setRole] = React.useState("")
    const [authType, setAuthType] = React.useState<string>("email_password")

    const handleRoleChange = (value: string) => {
        setRole(value)
        if (value === "certificate_creator") {
            setAuthType("email_password")
        } else if (value === "certificate_validator") {
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
                        // <Button type="button" onClick={() => signIn("github")}>
                        //     Sign in with GitHub
                        // </Button>
                      <></>
                      )
                    
                    }

                    {authType === "saml_sso" && (
                        // <Button type="button" onClick={() => signIn("saml")}>
                        //     Sign in with SAML SSO
                        // </Button>
                        <></>
                    )}

                    {authType !== "oauth" && <Button type="submit">Submit</Button>}
                </form>
            </Form>
        </>
    )
}









