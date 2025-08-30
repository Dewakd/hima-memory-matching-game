import './App.css'
import { useState, useEffect } from 'react';

interface Card {
  id: number;
  symbol: string;
  matched: boolean;
}

const MemoryGame: React.FC = () => {
  const symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'];
  const countDownTime = 120;
  
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(countDownTime); // 2 minutes in seconds
  const [gameStarted, setGameStarted] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  const createCards = () => {
    const newCards: Card[] = [];
    for (let i = 0; i < symbols.length; i++) {
      newCards.push({ id: i * 2, symbol: symbols[i], matched: false });
      newCards.push({ id: i * 2 + 1, symbol: symbols[i], matched: false });
    }
    
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    
    setCards(newCards);
  };

  const resetGame = () => {
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setTimeRemaining(120);
    setGameStarted(false);
    setShowWinModal(false);
    setShowGameOverModal(false);
  };

  const newGame = () => {
    resetGame();
    createCards();
  };

  const resetCurrentGame = () => {
    resetGame();
    setCards(prev => prev.map(card => ({ ...card, matched: false })));
  };

  const flipCard = (index: number) => {
    if (flippedCards.length >= 2 || flippedCards.includes(index) || cards[index].matched) {
      return;
    }

    if (!gameStarted) {
      setGameStarted(true);
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      setTimeout(() => {
        checkForMatch(newFlippedCards);
      }, 800);
    }
  };

  const checkForMatch = (flippedIndices: number[]) => {
    const [firstIndex, secondIndex] = flippedIndices;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (firstCard.symbol === secondCard.symbol) {
      setCards(prev => prev.map((card, index) => 
        index === firstIndex || index === secondIndex
          ? { ...card, matched: true }
          : card
      ));
      
      setMatches(prev => {
        const newMatches = prev + 1;
        if (newMatches === 10) {
          setShowWinModal(true);
          setGameStarted(false); // Stop the timer when game is won
        }
        return newMatches;
      });
    }
    
    setFlippedCards([]);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    createCards();
  }, []);

  useEffect(() => {
    let interval: number;
    
    if (gameStarted && !showWinModal && !showGameOverModal) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setShowGameOverModal(true);
            setGameStarted(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, showWinModal, showGameOverModal]);

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center p-5">
      <div className="text-center max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-2xl">
          🧠 Memory Match
        </h1>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-6">
          <div className="bg-white/20 backdrop-blur-lg rounded-xl px-6 py-3 text-white font-semibold text-lg shadow-lg">
            Moves: {moves}
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-xl px-6 py-3 text-white font-semibold text-lg shadow-lg">
            Matches: {matches}/10
          </div>
          <div className={`bg-white/20 backdrop-blur-lg rounded-xl px-6 py-3 text-white font-semibold text-lg shadow-lg ${
            timeRemaining <= 30 ? 'animate-pulse bg-red-500/30' : ''
          }`}>
            Time: {formatTime(timeRemaining)}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3 max-w-2xl mx-auto mb-6 aspect-[5/4]">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => flipCard(index)}
              disabled={card.matched || flippedCards.includes(index)}
              className={`
                aspect-square rounded-xl font-bold text-2xl transition-all duration-300 transform
                flex items-center justify-center shadow-lg hover:shadow-xl
                ${flippedCards.includes(index) || card.matched
                  ? card.matched 
                    ? 'bg-gradient-to-br from-green-400 to-green-600 text-white scale-95' 
                    : 'bg-gradient-to-br from-blue-400 to-blue-600 text-white'
                  : 'bg-gradient-to-br from-white to-gray-200 text-gray-400 hover:-translate-y-1'
                }
                ${!card.matched && !flippedCards.includes(index) ? 'hover:shadow-2xl cursor-pointer' : 'cursor-default'}
                disabled:cursor-default
              `}
            >
              {flippedCards.includes(index) || card.matched ? card.symbol : '?'}
            </button>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={newGame}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            New Game
          </button>
          <button
            onClick={resetCurrentGame}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {showWinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              🎉 Congratulations!
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              You completed the game in <span className="font-bold text-blue-600">{moves}</span> moves 
              with <span className="font-bold text-blue-600">{formatTime(timeRemaining)}</span> remaining!
            </p>
            <button
              onClick={newGame}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {showGameOverModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              ⏰ Game Over!
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Time's up! You matched <span className="font-bold text-red-600">{matches}</span> out of 10 pairs 
              in <span className="font-bold text-red-600">{moves}</span> moves.
            </p>
            <button
              onClick={newGame}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
