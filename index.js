const ROWS = 6;
const COLS = 7;
let board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
let currentPlayer = 'red';
let gameOver = false;

const boardEl = document.getElementById('gameBoard');
const statusEl = document.getElementById('status');

function createBoard() {
  boardEl.innerHTML = '';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('click', handleClick);
      const disc = document.createElement('div');
      disc.classList.add('disc');
      cell.appendChild(disc);
      boardEl.appendChild(cell);
    }
  }
}

function handleClick(e) {
  if (gameOver) return;

  const col = +e.currentTarget.dataset.col;

  for (let row = ROWS - 1; row >= 0; row--) {
    if (!board[row][col]) {
      board[row][col] = currentPlayer;
      updateUI();
      if (checkWinner(row, col)) {
        statusEl.textContent = `Player ${currentPlayer === 'red' ? '1' : '2'} Wins!`;
        gameOver = true;
      } else if (isBoardFull()) {
        statusEl.textContent = "It's a Draw!";
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        statusEl.textContent = `Player ${currentPlayer === 'red' ? '1' : '2'}'s Turn (${currentPlayer === 'red' ? 'Red' : 'Yellow'})`;
      }
      break;
    }
  }
}

function updateUI() {
  const discs = document.querySelectorAll('.disc');
  discs.forEach((disc, index) => {
    const row = Math.floor(index / COLS);
    const col = index % COLS;
    disc.className = 'disc';
    if (board[row][col]) {
      disc.classList.add(board[row][col]);
    }
  });
}

function isBoardFull() {
  return board.every(row => row.every(cell => cell !== null));
}

function checkWinner(r, c) {
  return checkDirection(r, c, 1, 0) || // vertical
         checkDirection(r, c, 0, 1) || // horizontal
         checkDirection(r, c, 1, 1) || // diagonal \
         checkDirection(r, c, 1, -1);  // diagonal /
}

function checkDirection(r, c, dr, dc) {
  const color = board[r][c];
  let count = 1;

  // Forward
  for (let i = 1; i < 4; i++) {
    const nr = r + dr * i;
    const nc = c + dc * i;
    if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr][nc] !== color) break;
    count++;
  }

  // Backward
  for (let i = 1; i < 4; i++) {
    const nr = r - dr * i;
    const nc = c - dc * i;
    if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr][nc] !== color) break;
    count++;
  }

  return count >= 4;
}

createBoard();
