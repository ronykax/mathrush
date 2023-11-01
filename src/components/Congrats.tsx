import Close from "./Close";

function Congrats({ time }: { time: number }) {
  return (
    <main className="flex flex-col items-center gap-4 text-center">
      <div onClick={() => window.location.reload()}>
        <Close />
      </div>
      <h1 className="text-4xl font-semibold">Congrats</h1>
      <p>You finished the set of problems in {time} seconds</p>
      <div className="mt-6">
      <button className="px-4 py-2 rounded bg-default hover:bg-hover">Share</button>
      </div>
    </main>
  )
}

export default Congrats;