"use client"
import { authClient } from "@/lib/auth-client"; //import the auth client
import { useState } from 'react';

export default function SignUp() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [name, setName] = useState('');
   const [image, setImage] = useState<File | null>(null);

   const signUp = async () => {
      const { data, error } = await authClient.signUp.email({
         email,
         password,
         name
      }, {
         onRequest: (ctx) => {
            //show loading
         },
         onSuccess: (ctx) => {
            //redirect to the dashboard
         },
         onError: (ctx) => {
            alert(ctx.error.message);
         },
      });
   };

   return (
      <div className="space-y-2 text-gray-950">
         <div>
            <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
         </div>
         <div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
         </div>
         <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
         </div>
         <div>
            <button onClick={signUp}>Sign Up</button>
         </div>
      </div>
   );
}