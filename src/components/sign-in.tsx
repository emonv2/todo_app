'use client'

import { createAuthClient } from "better-auth/client"
export const SignIn = () => {
   const client = createAuthClient()
   const signIn = async () => {
      const data = await client.signIn.social({
         provider: "discord"
      })
      console.log(signIn)
   }

   return (
      <>
         <h1>Sign In with</h1>
         <button onClick={signIn} className="border-2 bg-blue-400 text-white px-4 py-2 rounded-full">Discord</button>
      </>
   )
}
