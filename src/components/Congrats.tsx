import ReactConfetti from "react-confetti";
import Button from "@/components/Button";

function Congrats({ time, name, confetti }: { time: number, name: string, confetti: boolean }) {
  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: `Join ${name} on Math Rush today`,
        text: `Beat me by solving 20 math problems in ${time} seconds!`,
        url: ""
      });
    } else {
      navigator.clipboard.writeText(`Join me on Math Rush today\nBeat me by solving 20 math problems in ${time} seconds!\n\nhttps://mathrush.fun`);

      alert("Coped to clipboard!");
    }
  }

  return (
    <main className="flex flex-col items-center gap-4 text-center fade-in">
      <h1 className="text-4xl">Congrats</h1>
      <p>You finished the set of problems in {time} seconds!</p>
      <div className="mt-8 flex gap-3">
        <div onClick={share}>
          <Button text="SHARE" />
        </div>
      </div>
      {confetti && <ReactConfetti className="fixed w-screen h-screen" />}
    </main>
  )
}

export default Congrats;