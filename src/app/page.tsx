import { api, HydrateClient } from "~/trpc/server";
import { auth } from "~/server/auth/config";
import { headers } from "next/headers";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const allTodo = await api.todo.getAllTodosCount();
  const allUser = await api.todo.getAllUserCount();

  return (
    <HydrateClient>
      <div className="flex min-h-screen flex-col items-center justify-between bg-emon-bg py-8 text-white">
        <div>
          <h1 className="text-center text-2xl font-extrabold tracking-wider">
            Better_Todos
          </h1>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center gap-y-3">
            <h1 className="text-center text-3xl font-bold">
              Keep track of You, What you are doing{" "}
            </h1>
            <h2 className="text-center text-3xl font-bold">
              or Could be done.
            </h2>
          </div>
          <div className="mt-10 text-center">
            {session?.user ? (
              <Link href={"/dashboard"}>
                <Button className="ho rounded-full border-2 border-emon-accent bg-emon-bg px-7 py-5 hover:bg-emon-accent hover:text-emon-bg">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href={"/login"}>
                <Button className="ho rounded-full border-2 border-emon-accent bg-emon-bg px-7 py-5 hover:bg-emon-accent hover:text-emon-bg">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="flex gap-x-10">
          <div className="rounded-lg bg-emon-sub_bg px-16 py-10">
            <h1 className="mb-2 text-4xl font-bold">{allTodo} +</h1>
            <h5 className="font-thin">Total Todos</h5>
          </div>
          <div className="rounded-lg bg-emon-sub_bg px-16 py-10">
            <h1 className="mb-2 text-4xl font-bold">{allUser} +</h1>
            <h5 className="font-thin">Total User</h5>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
