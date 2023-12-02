function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningLines.length; i++) {
    const [first, second, third] = winningLines[i];
    if (
      squares[first] &&
      squares[first] === squares[second] &&
      squares[first] === squares[third]
    ) {
      return squares[first];
    }
  }
  return null;
};

export default calculateWinner;
