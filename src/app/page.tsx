"use client";

import React from "react";
import Game from "@/components/Game";
import Close from "@/components/Close";
import Settings from "@/components/Settings";
import Hamburger from "@/components/Hamburger";

import { useAuth } from "@/context/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { auth, signIn, users } from "@/firebase";

function Page() {
  const { user, loading } = useAuth();

  const [game, showGame] = React.useState(false);
  const [settings, showSettings] = React.useState(false);

  const [finished, isFinished] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [componentLoading, isComponentLoading] = React.useState(true);
  
  React.useEffect(() => {
    const check = async () => {
      if (auth.currentUser) {
        const docRef = doc(users, auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
    
        const userObj = docSnap.exists() ? docSnap.data() : null;
    
        if (userObj && userObj.finished) {
          isFinished(true);
          setTime(userObj.time);
          isComponentLoading(false);
        } else {
          isComponentLoading(false);
        }
      }
    }
    
    check();
  }, [user]);
  
  return (
    <main className="flex items-center justify-center h-screen px-10">
      {loading ? (
        <p>Loading ...</p>
      ) : (
        game ? (
          <div>
            <div onClick={() => showGame(game ? false : true)}>
              <Close />
            </div>
            <Game />
          </div>
        ) : (
          settings ? (
            <div>
              <div onClick={() => showSettings(settings ? false : true)}>
                <Close />
              </div>
              <Settings />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center">
              {user && (
                <div onClick={() => showSettings(true)}>
                  <Hamburger />
                </div>
              )}
              <h1 className="text-4xl font-semibold">Math Rush</h1>
              <p className="leading-loose">Solve 20 math problems as fast as you can (new problems everyday).</p>
              <div className="mt-6">
                {user ? (
                  componentLoading ? (
                    <p>Loading ...</p>
                  ) : (
                    finished ? (
                      <p className="font-semibold leading-loose text-secondary">You have already completed today&apos;s set of problems in {time} seconds. Come back tommorow!</p>
                    ) : (
                      <button className="px-4 py-2 rounded bg-default hover:bg-hover" onClick={() => showGame(true)}>Start</button>
                    )
                  )
                ) : (
                  <button className="px-4 py-2 rounded bg-default hover:bg-hover" onClick={signIn}>Sign In</button>
                )}
              </div>
            </div>
          )
        )
      )}
    </main>
  )
}

export default Page;