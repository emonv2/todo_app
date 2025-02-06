"use client";

import { useSession } from "~/server/auth";

export default function TestAuth() {
  const { data } = useSession();
  return (
    <>
      <h1>{data?.user ? "You are login" : "Sorry bro"}</h1>
    </>
  );
}
