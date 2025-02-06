"use client";

import { Button } from "~/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { authClient } from "~/server/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function AvatarButton() {
  const router = useRouter();
  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
            <Avatar className="bg-white text-black">
              {session?.user.image && <AvatarImage src={session?.user.image} />}
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <ChevronDown
              size={16}
              strokeWidth={2}
              className="ms-2 opacity-60"
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 min-w-72 p-4">
          <DropdownMenuLabel>{session?.user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer px-6 py-3">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-6 py-3">
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-6 py-3">
            Team
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              onClick={async () =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login");
                    },
                  },
                })
              }
              variant="ghost"
              className="text-red-600 hover:text-red-700"
            >
              Sign out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
