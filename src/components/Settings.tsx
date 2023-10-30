import React from "react";
import Link from "next/link";
import { signOut } from "@/firebase";
import { useAppearance } from "@/hooks/useAppearance";

function Settings() {
  const { mode, changeMode } = useAppearance();

  const handleChange = (change: string) => {
    // set mode to 'change' in firestore
    // ...

    setTimeout(() => {
      changeMode(mode);

      window.location.reload();
    }, 500);
  }
  
  return (
    <main className="flex flex-col items-start gap-8">
      <div className="flex flex-col">
        <h1 className={`mb-4 text-2xl font-semibold text-${mode}-primary`}>Account</h1>
        <button className={`px-4 py-2 mb-2 text-left rounded bg-${mode}-default hover:bg-${mode}-hover text-${mode}-primary`} onClick={signOut}>Sign Out</button>
        <Link href={"/delete"}>
          <button className={`px-4 py-2 mb-2 text-left rounded bg-${mode}-default hover:bg-${mode}-hover text-${mode}-primary`}>
            Delete Account
          </button>
        </Link>
      </div>
      <div className="flex flex-col">
        <h1 className={`mb-4 text-2xl font-semibold text-${mode}-primary`}>Appearance</h1>
        <select defaultValue={mode} className={`w-full px-4 py-2 mb-2 border-none rounded text-${mode}-primary bg-${mode}-default hover:bg-${mode}-hover focus:ring-2 focus:ring-${mode}-primary focus:bg-${mode}-hover`} onChange={(change) => handleChange(change.target.value)}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>
    </main>
  )
}

export default Settings;