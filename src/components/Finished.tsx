function Finished({ time, premium }: { time: number, premium: boolean }) {
  return (
    <main className="text-center">
      <h1 className="text-4xl font-semibold">Congrats!</h1>
      <p className="mt-4 mb-10 ml-12 mr-12 text-lg">You finished the set of problems in {time} seconds</p>
      {premium ? (
        <div>
          <button className="pt-2 pb-2 pl-4 pr-4 mr-4 rounded bg-darkgray hover:bg-normalgray">Retry</button>
          <button className="pt-2 pb-2 pl-4 pr-4 rounded bg-darkgray hover:bg-normalgray">Share</button>
        </div>
      ) : (
        <button className="pt-2 pb-2 pl-4 pr-4 rounded bg-darkgray hover:bg-normalgray">Share</button>
      )}
    </main>
  );
}

export default Finished;