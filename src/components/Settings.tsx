import Link from "next/link";
import { signOut } from "@/firebase";

function Settings() {
  return (
    <main className="flex flex-col items-start gap-8">
      <div className="flex flex-col">
        <h1 className="mb-4 text-2xl font-semibold">Account</h1>
        <button className="px-4 py-2 mb-2 text-left rounded bg-darkgray hover:bg-lightdarkgray" onClick={signOut}>Sign Out</button>
        <button className="px-4 py-2 mb-2 text-left rounded bg-darkgray hover:bg-lightdarkgray">
          <Link href={"/delete"}>
            Delete Account
          </Link>
        </button>
      </div>
      <div className="flex flex-col">
        <h1 className="mb-4 text-2xl font-semibold">Appearance</h1>
        <select className="w-full px-4 py-2 mb-2 border-none rounded bg-darkgray focus:ring-2 focus:ring-normalgray hover:bg-lightdarkgray focus:bg-lightdarkgray">
          <option value="" hidden selected disabled>Theme</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
      </div>
    </main>
  )
}

export default Settings;