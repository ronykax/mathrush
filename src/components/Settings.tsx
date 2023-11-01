import React from "react";
import { signOut, deleteAccount } from "@/firebase";

function Settings() {
  const [confirmation, showConfirmation] = React.useState(false);

  return (
    confirmation ? (
      <main className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-semibold">Delete Account</h1>
        <p className="leading-loose">Are you sure you want to delete your account?</p>
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 rounded bg-default hover:bg-hover" onClick={deleteAccount}>Yes</button>
          <button className="px-4 py-2 rounded bg-default hover:bg-hover" onClick={() => window.location.reload()}>Cancel</button>
        </div>
      </main>
    ) : (
      <main className="flex gap-3">
        <button className="px-4 py-2 rounded bg-default hover:bg-hover" onClick={signOut}>Sign Out</button>
        <button className="px-4 py-2 rounded bg-default hover:bg-hover" onClick={() => showConfirmation(true)}>Delete Account</button>
      </main>
    )    
    // <main className="flex flex-col items-center gap-4">
    //   <div className="flex flex-col gap-8 items-start">
    //     <div className="flex flex-col gap-4">
    //       <h1 className="text-4xl font-semibold">Account</h1>
    //       <div className="flex gap-3">
    //         <button className="px-4 py-2 rounded bg-default hover:bg-hover">Sign Out</button>
    //         <button className="px-4 py-2 rounded bg-default hover:bg-hover">Delete Account</button>
    //       </div>
    //     </div>
    //     <div className="flex flex-col gap-4">
    //       <h1 className="text-4xl font-semibold">Premium</h1>
    //       <p>Upgrade to premium to get unlimited retries</p>
    //       <div className="flex gap-3">
    //         <button className="px-4 py-2 rounded bg-default hover:bg-hover">Upgrade</button>
    //       </div>
    //     </div>
    //   </div>
    // </main>
  )
}

export default Settings;