export function shuffle(arr: number[]): number[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function copyBoard(board: (number | null)[][]): (number | null)[][] {
  return board.map(row => [...row]);
}
