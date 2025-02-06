"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { loginSchema } from "~/validate/auth-schema";
import { z } from "zod";
import { authClient } from "~/server/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingButton from "~/components/origin_ui/loadingButton";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  }
  return (
    <>
      <div className="bg-emon-bg text-white">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
          <div className="w-full max-w-md">
            <div className="mb-6 flex items-center justify-center py-4">
              <Link href={"/"}>
                <h1 className="text-3xl font-extrabold tracking-wider">
                  Better_Todo
                </h1>
              </Link>
            </div>

            <div className="rounded-2xl bg-emon-sub_bg p-8 shadow-md">
              <h2 className="mb-4 text-center text-2xl font-bold">Sign in</h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-full border-2 border-white px-3 py-3"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-full border-2 border-white px-3 py-3"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {isLoading ? (
                    <LoadingButton text="Login" />
                  ) : (
                    <Button
                      className="mt-4 rounded-full border-2 border-emon-accent bg-emon-sub_bg px-6 py-4"
                      type="submit"
                    >
                      Login
                    </Button>
                  )}
                  <Link href={"/register"}>Create new account ?</Link>
                </form>
              </Form>
              {/* <div className="mt-4"> */}
              {/*   <LoginButton /> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
