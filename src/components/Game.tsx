import React from "react";
import Congrats from "./Congrats";
import useTimer from "@/hooks/useTimer";

import { auth } from "@/firebase";
import { users } from "@/firebase";
import { problems } from "@/problems";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { Sometype_Mono } from "next/font/google";

const font = Sometype_Mono({ subsets: ["latin"] });

function Game() {
  const [index, setIndex] = React.useState(0);
  const [answer, setAnswer] = React.useState("");
  const [finished, isFinished] = React.useState(false);

  const { start, stop, time } = useTimer(1000);
  const { num1, operator, num2 } = problems[index];

  const checkAnswer = (value: string) => {
    setAnswer(value);

    const result = eval(`${num1} ${operator} ${num2}`);

    if (parseInt(value) === result) {
      setTimeout(async () => {
        setAnswer("");

        if (index >= problems.length - 1) {
          isFinished(true);
          stop();

          const docRef = doc(users, auth.currentUser?.uid);
          const docSnap = await getDoc(docRef);

          !docSnap.exists() && (
            await setDoc(doc(users, auth.currentUser?.uid), {
              finished: true,
              time: time
            })
          );
        } else {
          setIndex(index + 1);
        }
      }, 150);
    }
  }
  
  React.useEffect(() => {
    if (time >= 600) {
      window.location.reload();
    } else {
      start();
    }
  }, [time]);

  return (
    finished ? (
      <Congrats time={time} />
    ) : (
      <div className="flex flex-col items-center gap-4">
        <h1 className={`${font.className} text-right text-6xl font-bold tracking-widest`}>
          {num1}<br />{operator.replace("/", "÷")} {num2}
        </h1>
        <input className={`${font.className} w-40 text-right text-6xl font-bold tracking-widest rounded-lg bg-default border-none focus:ring-primary placeholder:text-secondary placeholder:text-opacity-25 caret-invisible`} type="text" placeholder={`#${index + 1}`} inputMode="numeric" id="input" value={answer} onChange={(change) => checkAnswer(change.target.value)} autoFocus />
        <p className="text-sm text-secondary">Elapsed Time: {time}s</p>
      </div>
    )
  )
}

export default Game;