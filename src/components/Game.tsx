import React from "react";
import Close from "./Close";
import Finished from "./Finished";
import useTimer from "@/hooks/useTimer";

import { Sometype_Mono } from "next/font/google";

const font = Sometype_Mono({ subsets: ["latin"] });

interface problem {
  num1: number,
  operator: "+" | "-" | "*" | "/",
  num2: number
}

function Game() {
  const [index, setIndex] = React.useState(0);
  const [answer, setAnswer] = React.useState("");
  const [finished, isFinished] = React.useState(false);

  const { start, stop, time } = useTimer(1000);

  React.useEffect(() => {
    if (time > 600) {
      window.location.reload();
    } else {
      start();
    }
  }, [time]);

  const problems: problem[] = [ { "num1": 2, "operator": "+", "num2": 9 }, { "num1": 4, "operator": "-", "num2": 8 }, { "num1": 9, "operator": "+", "num2": 7 }, { "num1": 1, "operator": "+", "num2": 3 } ]

  const { num1, operator, num2 } = problems[index];

  const checkAnswer = (value: string) => {
    setAnswer(value);

    const result = eval(`${num1} ${operator} ${num2}`);

    if (parseInt(value) === result) {
      setAnswer("");

      if (index >= problems.length - 1) {
        isFinished(true);
        stop();
      } else {
        setIndex(index + 1);
      }
    }
  }

  return (
    finished ? (
      <Finished time={time} premium={false} />
    ) : (
      <main className="flex flex-col items-center gap-4">
        <Close />
        <h1 className="text-[#d1d1d1] text-lg mb-8 font-semibold">Problem {index + 1} / {problems.length}</h1>
        <h1 className={`${font.className} text-6xl font-bold text-right`}>
          {num1}<br />{operator.replace("/", "÷")} {num2}
        </h1>
        <div className="text-center">
          <input name="answer" className={`${font.className} appearance-none border-none font-semibold w-40 pt-1 pb-1 pl-2 pr-2 text-6xl text-right rounded-lg bg-darkgray focus:outline-none focus:ring-2 focus:ring-lighergray`} type="text" inputMode="numeric" value={answer} onChange={(change) => checkAnswer(change.target.value)} />
          <p className="mt-2 text-sm text-lightgray">Elapsed Time: {time}s</p>
        </div>
      </main>
    )
  )
}

export default Game;