"use client";

import Link from "next/link";

import { auth } from "@/firebase";
import { redirect } from "next/navigation";
import { deleteAccount } from "@/firebase";
import { useAppearance } from "@/hooks/useAppearance";
import { useAuthState } from "react-firebase-hooks/auth";

function Page() {
  const { mode } = useAppearance();

  const [user, loading] = useAuthState(auth);

  return (
    <main className={`flex items-center justify-center h-screen bg-${mode}-bgcolor`}>
      {loading ? (
        <p className={`text-${mode}-primary`}>Loading ...</p>
      ) : (
        user ? (
          <div className="text-center">
            <h1 className={`text-4xl font-semibold text-${mode}-primary`}>Delete Account</h1>
            <p className={`mt-4 mb-10 ml-12 mr-12 text-lg text-${mode}-secondary`}>Are you sure you want to delete your account?</p>
            <button className={`pt-2 pb-2 pl-4 pr-4 mr-4 rounded bg-${mode}-default hover:bg-${mode}-hover text-${mode}-primary`} onClick={deleteAccount}>Yes</button>
            <button className={`pt-2 pb-2 pl-4 pr-4 rounded bg-${mode}-default hover:bg-${mode}-hover text-${mode}-primary`}>
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