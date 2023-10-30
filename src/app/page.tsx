"use client";

import React from "react";
import Game from "@/components/Game";
import Settings from "@/components/Settings";
import Hamburger from "@/components/Hamburger";

import { auth } from "@/firebase";
import { signIn } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppearance } from "@/hooks/useAppearance";

function Page() {
  const { mode } = useAppearance();
  
  const [user, loading] = useAuthState(auth);
  const [game, setGame] = React.useState(false);
  const [settings, setSettings] = React.useState(false);

  return (
    <main className={`flex items-center justify-center h-screen bg-${mode}-bgcolor`}>
      {user && (
        <div className="fixed top-0 left-0 m-6 outline-2" onClick={() => {settings ? setSettings(false) : setSettings(true)}}>
          <Hamburger />
        </div>
      )}
      {loading ? (
        <p className={`text-${mode}-primary`}>Loading ...</p>
      ) : (
        settings ? (
          <Settings />
        ) : (
          () => window.location.reload()
        ) && game ? (
          <Game />
        ) : (
          <div className="text-center">
            <h1 className={`text-4xl font-semibold text-${mode}-primary`}>Math Rush</h1>
            <p className={`mt-4 mb-10 ml-12 mr-12 text-lg text-${mode}-secondary`}>Solve 20 math problems as fast as you can (new ones daily)</p>
            {user ? (
              <button className={`pt-2 pb-2 pl-4 pr-4 rounded bg-${mode}-default hover:bg-${mode}-hover text-${mode}-primary`} onClick={() => setGame(true)}>Start</button>
            ) : (
              <button className={`pt-2 pb-2 pl-4 pr-4 rounded bg-${mode}-default hover:bg-${mode}-hover text-${mode}-primary`} onClick={signIn}>Sign In</button>
            )}
          </div>
        )
      )}
    </main>
  );
}

export default Page;