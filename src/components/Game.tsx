import React from "react";
import Congrats from "@/components/Congrats";

import { problems } from "@/problems";
import { auth, users } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Sometype_Mono } from "next/font/google";

import useCountdown from "@/hooks/useCountdown";
import useTimer from "@/hooks/useTimer";

const font = Sometype_Mono({ subsets: ["latin"] });

interface Settings {
  autoFocus: boolean,
  confetti: boolean,
  countdown: boolean,
  elapsedTime: boolean
}

function Game() {
  const { startCountdown, stopCountdown, countdownTime } = useCountdown(1000, 3);
  const { startTimer, stopTimer, timerTime } = useTimer(1000);

  const [loading, isLoading] = React.useState(true);

  const [countdown, showCountdown] = React.useState(true);
  const [finished, isFinished] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [answer, setAnswer] = React.useState("");

  const [settings, setSettings] = React.useState<Settings>({
    autoFocus: true,
    confetti: true,
    countdown: true,
    elapsedTime: true
  });

  const { num1, operator, num2 } = problems[index];

  const checkAnswer = (value: string) => {
    setAnswer(value);

    const result = eval(`${num1} ${operator} ${num2}`);

    if (parseInt(value) === result) {
      setTimeout(async () => {
        setAnswer("");

        if (index >= problems.length - 1) {
          isFinished(true);
          stopTimer();

          const docRef = doc(users, auth.currentUser?.uid);
          const docSnap = await getDoc(docRef);

          await setDoc(doc(users, auth.currentUser?.uid), {
            ...docSnap.data(),
            finished: true,
            time: timerTime
          });
        } else {
          setIndex(index + 1);
        }
      }, 175);
    }
  }

  React.useEffect(() => {
    const fetch = async () => {
      const docRef = await getDoc(doc(users, auth.currentUser?.uid));
      const docSnap = docRef.data();

      if (docSnap && docSnap.settings) {
        const settings: Settings = docSnap.settings;

        setSettings({
          autoFocus: settings.autoFocus === undefined ? true : settings.autoFocus,
          confetti: settings.confetti === undefined ? true : settings.confetti,
          countdown: settings.countdown === undefined ? true : settings.countdown,
          elapsedTime: settings.elapsedTime === undefined ? true : settings.elapsedTime
        });
      }

      isLoading(false);
    }

    fetch();

    if (!loading) {
      if (settings.countdown) {
        if (countdownTime >= 0) {
          startCountdown();
        }
    
        if (countdownTime <= 0) {
          stopCountdown();
          showCountdown(false);
    
          startTimer();
        }
      } else {
        startTimer();
      }
  
      if (timerTime >= 600) {
        window.location.reload();
      }
    }
  }, [countdownTime, timerTime, loading]);

  if (loading) return (
    <p className="fade-in">Loading...</p>
  )

  if (settings.countdown && countdown) return (
    <h1 className={`${font.className} font-bold text-6xl fade-in`}>{countdownTime}</h1>
  )

  if (finished) return (
    <Congrats time={timerTime} name={`${auth.currentUser?.displayName}`} confetti={settings.confetti} />
  )

  return (
    <main className="flex flex-col items-center gap-4 text-center fade-in">
      <div className={`${font.className} font-bold text-6xl flex flex-col items-center gap-4`}>
        <h1 className="text-right tracking-widest">{num1}<br />{operator} {num2}</h1>
        <input className="w-40 p-3 rounded-md bg-default text-right tracking-widest focus:ring-2 focus:ring-secondary focus:border-none focus:outline-none placeholder:text-primary placeholder:text-opacity-30 caret-default" type="text" id="answer-input" placeholder={`#${index + 1}`} value={answer} onChange={(change) => checkAnswer(change.target.value)} autoFocus={settings.autoFocus} />
      </div>
      {settings.elapsedTime && <p className="text-sm text-secondary" onClick={() => isFinished(true)}>Elapsed Time: {timerTime}s</p>}
    </main>
  )
}

export default Game;