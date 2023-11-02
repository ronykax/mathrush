"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { signOut, deleteAccount, users, auth } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Settings() {
  const [loading, isLoading] = React.useState(true);

  const [autoFocus, setAutoFocus] = React.useState(true);
  const [confetti, setConfetti] = React.useState(true);
  const [countdown, setCountdown] = React.useState(true);
  const [elapsedTime, setElapsedTime] = React.useState(true);

  const [confirmation, showConfirmation] = React.useState(false);

  React.useEffect(() => {
    const check = async () => {
      const docRef = await getDoc(doc(users, auth.currentUser?.uid));
      const docSnap = docRef.data();
  
      if (docSnap && docSnap.settings) {
        const settings = docSnap.settings;

        setAutoFocus(settings.autoFocus === undefined ? true : settings.autoFocus);
        setConfetti(settings.confetti === undefined ? true : settings.confetti);
        setCountdown(settings.countdown === undefined ? true : settings.countdown);
        setElapsedTime(settings.elapsedTime === undefined ? true : settings.elapsedTime);
      }

      isLoading(false);
    }

    check();
  }, [autoFocus, confetti, countdown, elapsedTime]);

  const handleCheck = async (field: "autoFocus" | "confetti" | "countdown" | "elapsedTime") => {
    let checked: boolean = false;
    
    if (field === "autoFocus") {
      checked = !autoFocus;
    } else if (field === "confetti") {
      checked = !confetti;
    } else if (field === "countdown") {
      checked = !countdown;
    } else if (field === "elapsedTime") {
      checked = !elapsedTime;
    }

    const docRef = doc(users, auth.currentUser?.uid);
    const docSnap = await getDoc(docRef);

    await setDoc(docRef, {
      ...docSnap.data(),
      settings: {
        ...docSnap.data()?.settings,
        [field]: checked
      }
    }).then(() => {
      if (field === "autoFocus") {
        setAutoFocus(checked);
      } else if (field === "confetti") {
        setConfetti(checked);
      } else if (field === "countdown") {
        setCountdown(checked);
      } else if (field === "elapsedTime") {
        setElapsedTime(checked);
      }
    });
  }

  const Dot = () => {
    return (
      <span className="mr-3">•</span>
    )
  }

  if (loading) return (
    <p className="fade-in">Loading...</p>
  )

  if (confirmation) return (
    <div className="flex flex-col items-center gap-4 text-center fade-in">
      <h1 className="text-4xl">Delete Account</h1>
      <p className="mx-4">Sad to see you go :(</p>
      <div className="mt-8 flex gap-3">
        <div onClick={deleteAccount}>
          <Button text="Confirm" />
        </div>
      </div>
    </div>
  )

  return (
    <main className="flex flex-col gap-8 fade-in">
      <h1 className="text-4xl">Rony Philip</h1>
      <div className="flex flex-col gap-3 md:flex-row">
        <div onClick={signOut}>
          <Button text="Sign out" />
        </div>
        <div onClick={() => showConfirmation(true)}>
          <Button text="Delete Account" />
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        <li>
          <div className="flex justify-between">
            <h1><Dot />Auto Focus</h1>
            <input className="w-4 focus:ring-secondary focus:ring-0" type="checkbox" id="auto-focus-checkbox" onChange={() => handleCheck("autoFocus")} checked={autoFocus} />
          </div>
        </li>
        <li>
          <div className="flex justify-between">
            <h1><Dot />Confetti</h1>
            <input className="w-4 focus:ring-secondary focus:ring-0" type="checkbox" id="confetti-checkbox" onChange={() => handleCheck("confetti")} checked={confetti} />
          </div>
        </li>
        <li>
          <div className="flex justify-between">
            <h1><Dot />Countdown</h1>
            <input className="w-4 focus:ring-secondary focus:ring-0" type="checkbox" name="countdown-checkbox" onChange={() => handleCheck("countdown")} checked={countdown} />
          </div>
        </li>
        <li>
          <div className="flex justify-between">
            <h1><Dot />Elapsed Time</h1>
            <input className="w-4 focus:ring-secondary focus:ring-0" type="checkbox" name="elapsed-time-checkbox" onChange={() => handleCheck("elapsedTime")} checked={elapsedTime} />
          </div>
        </li>
      </ul>
      <ul className="flex flex-col gap-2">
        <li>
          <Dot /><Link className="hover:text-secondary" href={"/privacy"}>Privacy Policy</Link>
        </li>
        <li>
          <Dot /><Link className="hover:text-secondary" href={"/terms"}>Terms of Service</Link>
        </li>
      </ul>
    </main>
  )
}

export default Settings;