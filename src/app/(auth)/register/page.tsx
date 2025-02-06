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
import { signupSchema } from "~/validate/auth-schema";
import { z } from "zod";
import LoginButton from "~/components/origin_ui/loginButton";
import { authClient } from "~/server/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LoadingButton from "~/components/origin_ui/loadingButton";

export default function RegisterPage() {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const form = useForm<z.infer<typeof signupSchema>>({
      resolver: zodResolver(signupSchema),
      defaultValues: {
         email: "",
         password: "",
         username: "",
      },
   });

   async function onSubmit(values: z.infer<typeof signupSchema>) {
      await authClient.signUp.email(
         {
            email: values.email,
            password: values.password,
            name: values.username,
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
         <div className="bg-gradient-to-b from-[#2e026d] to-[#15162c] font-[sans-serif]">
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
               <div className="w-full max-w-md">
                  <div className="mb-6 flex items-center justify-center py-4">
                     <Link href={"/"}>
                        <Image
                           src={"logo.svg"}
                           alt="logo"
                           className="w-36"
                           width={144}
                           height={72}
                        />
                     </Link>
                  </div>

                  <div className="rounded-2xl bg-white p-8 shadow">
                     <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
                        Resister
                     </h2>

                     <Form {...form}>
                        <form
                           onSubmit={form.handleSubmit(onSubmit)}
                           className="space-y-4"
                        >
                           <FormField
                              control={form.control}
                              name="username"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                       <Input placeholder="EmonSAS" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                       <Input placeholder="emon@mail.com" {...field} />
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
                                       <Input placeholder="******" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           {isLoading ? (
                              <LoadingButton text="Register" />
                           ) : (
                              <Button type="submit">Register</Button>
                           )}
                        </form>
                     </Form>
                     <div className="mt-4">
                        <LoginButton />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
