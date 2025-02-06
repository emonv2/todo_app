"use client";

import { Button } from "~/components/ui/button";
import { authClient } from "~/server/auth";

export default function LoginButton() {
   const handleLogin = async () => {
      await authClient.signIn.social({
         provider: "discord",
         callbackURL: "/dashboard",
      });
   };
   return (
      <div className="flex flex-col gap-2">
         {/* <Button className="bg-[#1877f2] text-white after:flex-1 hover:bg-[#1877f2]/90">
            <span className="pointer-events-none me-2 flex-1">
               <RiFacebookFill className="opacity-60" size={16} aria-hidden="true" />
            </span>
            Login with Facebook
         </Button> */}
         <Button
            onClick={handleLogin}
            className="bg-blue-500 text-white after:flex-1 hover:bg-blue-500/90"
         >
            <span className="pointer-events-none me-2 flex-1">
               {/* <RiGithubFill className="opacity-60" size={16} aria-hidden="true" /> */}
            </span>
            Login with Discord
         </Button>
      </div>
   );
}
