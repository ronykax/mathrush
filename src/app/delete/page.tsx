"use client";

import Link from "next/link";

import { auth } from "@/firebase";
import { redirect } from "next/navigation";
import { deleteAccount } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Page() {
  const [user, loading] = useAuthState(auth);

  return (
    <main className="flex items-center justify-center h-screen">
      {loading ? (
        <p>Loading ...</p>
      ) : (
        user ? (
          <div className="text-center">
            <h1 className="text-4xl font-semibold">Delete Account</h1>
            <p className="mt-4 mb-10 ml-12 mr-12 text-lg">Are you sure you want to delete your account?</p>
            <button className="pt-2 pb-2 pl-4 pr-4 mr-4 rounded bg-darkgray hover:bg-normalgray" onClick={deleteAccount}>Yes</button>
            <button className="pt-2 pb-2 pl-4 pr-4 rounded bg-darkgray hover:bg-normalgray">
              <Link href={"/"}>
                Cancel
              </Link>
            </button>
          </div>
        ) : redirect("/")
      )}
    </main>
  )
}

export default Page;