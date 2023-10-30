"use client";

import React from "react";
import Game from "@/components/Game";
import Settings from "@/components/Settings";

import { auth } from "@/firebase";
import { signIn } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Page() {
  const [user, loading] = useAuthState(auth);
  const [game, setGame] = React.useState(false);
  const [settings, setSettings] = React.useState(false);

  return (
    <main className="flex items-center justify-center h-screen">
      {user && (
        <div className="fixed top-0 left-0 m-6 outline-2" onClick={() => {settings ? setSettings(false) : setSettings(true)}}>
          <svg className="w-6 cursor-pointer fill-normalgray hover:fill-lightergray" viewBox="0 0 24 17" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_37_2)">
            <rect width="24" height="2"/>
            <rect y="8" width="24" height="2"/>
            <rect y="15" width="24" height="2"/>
            </g>
            <defs>
            <clipPath id="clip0_37_2">
            <rect width="24" height="17"/>
            </clipPath>
            </defs>
          </svg>
        </div>
      )}
      {loading ? (
        <p>Loading ...</p>
      ) : (
        settings ? (
          <Settings />
        ) : (
          () => window.location.reload()
        ) && game ? (
          <Game />
        ) : (
          <div className="text-center">
            <h1 className="text-4xl font-semibold">Math Rush</h1>
            <p className="mt-4 mb-10 ml-12 mr-12 text-lg">Solve 20 math problems as fast as you can (new ones daily)</p>
            {user ? (
              <button className="pt-2 pb-2 pl-4 pr-4 rounded bg-darkgray hover:bg-lightdarkgray" onClick={() => setGame(true)}>Start</button>
            ) : (
              <button className="pt-2 pb-2 pl-4 pr-4 rounded bg-darkgray hover:bg-lightdarkgray" onClick={signIn}>Sign In</button>
            )}
          </div>
        )
      )}
    </main>
  );
}

export default Page;