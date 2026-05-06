"use client"
import Game from "./game";

export default function Page() {
  return (
    <div className="flex mt-10">
      <div className="flex flex-col items-center gap-10 flex-1">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wide text-slate-800">
          Tic Tac Toe
        </h1>
        {/* <div className="font-bold text-l">Current Player: You</div> */}
        <Game></Game>
        <Game size={6}></Game>
      </div>
    </div>
  );
}
