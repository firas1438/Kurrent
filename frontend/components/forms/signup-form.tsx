"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertTriangleIcon, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { FieldGroup, FieldSeparator, FieldDescription } from "@/components/ui/field"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import { register } from "@/api"
import Container from "../global/container"


// zod validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters")
})

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter()
  const [serverError, setServerError] = useState("")

  // react-hook-form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "", },
  })

  // handle signup
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError("") // reset errors
    try {
      await register(data);
      toast({ title: "Account created successfully!", description: "Welcome to Kurrent! You can now log in.", variant: "secondary", duration: 10000 })
      router.push("/login")
    } catch(err: any) {
      setServerError(err.response?.data?.message || "Registration failed");
      console.error(err);
    }
  }

  const loading = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={form.handleSubmit(onSubmit)} >
        <FieldGroup>

          {/* header */}
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Create your account!</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your details to get started with Kurrent
            </p>
          </div>

          {/* full name */}
          <FormField control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" disabled={loading} {...field} />
                </FormControl>
                <FormMessage className="text-xs font-medium"/>
              </FormItem>
            )}
          />

          {/* email */}
          <FormField control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="m.example@mail.com" disabled={loading} {...field} />
                </FormControl>
                <FormMessage className="text-xs font-medium"/>
              </FormItem>
            )}
          />

          {/* password */}
          <FormField control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="**********" disabled={loading} {...field} />
                </FormControl>
                <FormMessage className="text-xs font-medium"/>
              </FormItem>
            )}
          />

          {/* signup button */}
          <Button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>

          {/* error message */}
          {serverError && (
            <Container animation="fadeRight" className="flex items-center gap-2 bg-destructive/15 text-destructive text-xs p-3 rounded-md">
              <AlertTriangleIcon className="h-4 w-4 shrink-0"/>
              {serverError}
            </Container>
          )}

          {/* extra info */}
          <FieldSeparator className="mt-0.5">
            <Info className="w-5 h-5 text-muted-foreground" />
          </FieldSeparator>
          <FieldDescription className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Login here
            </Link>
            .
          </FieldDescription>
          
        </FieldGroup>
      </form>
    </Form>
  )
}