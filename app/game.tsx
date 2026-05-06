import { useEffect, useState } from "react";

type Cell = "X" | "O" | "";
type Board = Cell[][];

export default function Game({ size = 3 }: { size?: number }) {
  // X is you, O is theirs
  const [board, setBoard] = useState<Board>(Array.from({ length: size }, () => Array(size).fill("")));
  // true is yours, false is theirs
  const [turn, setTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<Cell>("");

  const onCellClick =
    (i: number, j: number) =>
    ({ ...args }) => {
      if (winner) return;
      console.log({ i, j });
      console.log(args);
      setBoard((b) => {
        const copy = b.map((row) => [...row]);
        copy[i][j] = turn ? "X" : "O";
        return copy;
      });
      setTurn((t) => !t);
    };

  useEffect(() => {
    if (checkWinner()) {
      console.log("winner");
      setWinner(turn ? "X" : "O");
    }
  }, [board]);

  const checkWinner = () => {
    // create an array for each possible row and check them all at once
    // check horizontal is same as board
    const copy = board.map((row) => [...row]);
    // check vertical is all the same indexes
    const cols = board[0].map((_, j) => board.map((row) => row[j]));
    // check diagnol - 2 items (i,j) incrementing from 0,0 and i.length-1,0 i decrementing and i incrementing
    const diag1 = board.map((row, i) => row[i]); // top-left to bottom-right
    const diag2 = board.map((row, i) => row[board.length - 1 - i]); // top-right to bottom-left
    const check = [...copy, ...cols, diag1, diag2];
    console.log(check);
    // assume the winning player is the one whose turn it is
    // turn has already changed, we are checking the other player
    const player = !turn ? "X" : "O";
    console.log(`checking ${player}`);
    const winner = check.some((line) => line.every((cell) => cell === player));
    return winner;
  };

  const onResetClicked = () => {
    setBoard((Array.from({ length: size }, () => Array(size).fill(""))));
    setTurn(true);
    setWinner("");
  };

  return (
    <div>
      <div className="flex justify-center font-bold text-l">Current Player: {turn ? "You(X)" : "Them(O)"}</div>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
        {board.map((line, i) =>
          line.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              className="w-16 h-16 flex items-center justify-center border border-gray-400 cursor-pointer"
              onClick={onCellClick(i, j)}
            >
              {cell}
            </button>
          ))
        )}
      </div>
      <div className="flex justify-center mt-4">
        {winner ? (
          <button
            onClick={onResetClicked}
            className="text-green-500 text-xl cursor-pointer"
          >
            {!turn ? "X" : "O"} is the winner. Reset game 
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
