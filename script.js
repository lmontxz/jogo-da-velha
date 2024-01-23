document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';

    cells.forEach(cell => {
        cell.addEventListener("click", () => handleCellClick(cell));
    });

    function handleCellClick(cell) {
        if (!cell.textContent) {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer === 'X' ? 'simbolo-x' : 'simbolo-o');
          
            if (checkWinner()) {
                alert(`Jogador ${currentPlayer} venceu!`);
                resetBoard();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

                if(checkWinner()) {
                    alert(`Jogador ${currentPlayer} venceu!`);
                    resetBoard();
                } else {
                  setTimeout (computerMove, 900 )
                }
            }
        }
    }

  function computerMove() {
      const emptyCells = [...cells].filter(cell => !cell.textContent);
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const computerCell = emptyCells[randomIndex];

      if (computerCell) {
          computerCell.textContent = 'O';
          computerCell.classList.add('simbolo-o'); // Adicione a classe simbolo-o aqui

          if (checkWinner()) {
              alert('O computador venceu!');
              resetBoard();
          } else {
              currentPlayer = 'X';
          }
      }
  }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                return true;
            }
        }

        return false;
    }

    function resetBoard() {
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }
});

