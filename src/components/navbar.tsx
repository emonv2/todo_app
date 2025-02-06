import { auth } from "~/server/auth/config";
import { Button } from "./ui/button";
import { headers } from "next/headers";
import AvatarButton from "./origin_ui/avaterButton";
import Image from "next/image";
import Link from "next/link";

export default async function Navbar() {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   return (
      <>
         <header className="z-50 min-h-[70px] px-4 py-4 sm:px-10">
            <div className="relative flex flex-wrap items-center gap-4">
               <Link href={"/"}>
                  <Image
                     src={"logo.svg"}
                     alt="logo"
                     className="w-36"
                     width={144}
                     height={64}
                  />
               </Link>

               <div
                  id="collapseMenu"
                  className="z-50 max-lg:fixed max-lg:hidden max-lg:before:fixed max-lg:before:inset-0 max-lg:before:z-50 max-lg:before:bg-black max-lg:before:opacity-50 lg:!block"
               >
                  <button
                     id="toggleClose"
                     className="fixed right-4 top-2 z-[100] rounded-full bg-white p-3 lg:hidden"
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 fill-black"
                        viewBox="0 0 320.591 320.591"
                     >
                        <path
                           d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                           data-original="#000000"
                        ></path>
                        <path
                           d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                           data-original="#000000"
                        ></path>
                     </svg>
                  </button>

                  <ul className="z-50 gap-x-6 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-full max-lg:w-1/2 max-lg:min-w-[300px] max-lg:space-y-3 max-lg:overflow-auto max-lg:bg-white max-lg:p-6 max-lg:shadow-md lg:ml-12 lg:flex">
                     <li className="mb-6 hidden max-lg:block">
                        <a href="javascript:void(0)">
                           <img
                              src="https://readymadeui.com/readymadeui.svg"
                              alt="logo"
                              className="w-36"
                           />
                        </a>
                     </li>
                     <li className="px-3 max-lg:border-b max-lg:py-3">
                        <a
                           href="javascript:void(0)"
                           className="block font-semibold text-blue-600 transition-all hover:text-blue-600"
                        >
                           Home
                        </a>
                     </li>
                     <li className="px-3 max-lg:border-b max-lg:py-3">
                        <a
                           href="javascript:void(0)"
                           className="block font-semibold transition-all hover:text-blue-600"
                        >
                           Team
                        </a>
                     </li>
                     <li className="px-3 max-lg:border-b max-lg:py-3">
                        <a
                           href="javascript:void(0)"
                           className="block font-semibold transition-all hover:text-blue-600"
                        >
                           Feature
                        </a>
                     </li>
                     <li className="px-3 max-lg:border-b max-lg:py-3">
                        <a
                           href="javascript:void(0)"
                           className="block font-semibold transition-all hover:text-blue-600"
                        >
                           Blog
                        </a>
                     </li>
                     <li className="px-3 max-lg:border-b max-lg:py-3">
                        <a
                           href="javascript:void(0)"
                           className="block font-semibold transition-all hover:text-blue-600"
                        >
                           About
                        </a>
                     </li>
                  </ul>
               </div>

               <div className="ml-auto flex">
                  {session ? (
                     <AvatarButton />
                  ) : (
                     <Link href={"/login"}>
                        <Button>Login</Button>
                     </Link>
                  )}
               </div>
            </div>
         </header>
      </>
   );
}
