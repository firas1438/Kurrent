"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Info, AlertTriangleIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { FieldGroup, FieldSeparator, FieldDescription } from "@/components/ui/field"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import { login } from "@/api"
import Container from "../global/container"
import { useAuthStore } from "@/store/auth-state"


// zod validation schema
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required")
})

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter()
  const [serverError, setServerError] = useState("")

  // react-hook-form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", },
  })

  // handle login
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError("") // reset errors
    try {
      await login(data);
      // immediately update the auth store
      const { fetchUser } = useAuthStore.getState();
      await fetchUser();
      toast({ title: "Logged in successfully!", description: "Welcome back to your Kurrent account!", variant: "secondary", duration: 10000 })
      router.push("/dashboard")
    } catch(err: any) {
      setServerError(err.response?.data?.message || "Login failed, please try again later.");
      console.error(err);
    }
  }

  const loading = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={form.handleSubmit(onSubmit)} >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account!</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email and password to continue
            </p>
          </div>

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

          {/* login button */}
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* error message*/}
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
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Register now
            </Link>
            .
          </FieldDescription>
          
        </FieldGroup>
      </form>
    </Form>
  )
}