"use client";

import React from "react";
import Game from "@/components/Game";
import Close from "@/components/Close";
import Button from "@/components/Button";
import Settings from "@/components/Settings";
import Hamburger from "@/components/Hamburger";

import { signIn } from "@/firebase";
import { useAuth } from "@/context/AuthContext";

function Page() {
  const { user, loading } = useAuth();

  const [game, showGame] = React.useState(false);
  const [settings, showSettings] = React.useState(false);

  if (loading) return null;

  return (
    <main className="flex items-center justify-center h-screen">
      {settings ? (
        <div>
          <div onClick={() => showSettings(false)}>
            <Close />
          </div>
          <Settings />
        </div>
      ) : game ? (
        <div>
          <div onClick={() => showGame(false)}>
            <Close />
          </div>
          <Game />
        </div>
      ) : (
        <div>
          {user && (
            <div onClick={() => showSettings(true)}>
              <Hamburger />
            </div>
          )}
          <div className="flex flex-col items-center gap-4 text-center fade-in">
            <h1 className="text-4xl">Math Rush</h1>
            <p className="m-4">Speed run through 20 math problems</p>
            <div className="mt-8 flex gap-3">
              {user ? (
                <div onClick={() => showGame(true)}>
                  <Button text="START" />
                </div>
              ) : (
                <div onClick={signIn}>
                  <Button text="SIGN IN" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Page;