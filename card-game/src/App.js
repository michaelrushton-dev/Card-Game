import { useEffect, useState } from 'react';
import useScore from './useScore';
import './App.css';

function App() {
  const [playerScore, setPlayerScore] = useState([]);
  const [dealerScore, setDealerScore] = useState([]);
  const [deckId, setDeckId] = useState([]);
  const [reset, setReset] = useState(false);
  const [winner, setWinner] = useState('');
  const [gameOver, setGameOver] = useState(false);

  // initial loading of cards and deck id
  useEffect(() => {
    async function initialLoad() {
      const response = await fetch(
        'https://www.deckofcardsapi.com/api/deck/new/draw/?count=4'
      );
      const res = await response.json();
      setDeckId(res.deck_id);
      //   console.log(res.deck_id);
      setPlayerScore([
        { image: res.cards[0].image, value: res.cards[0].value },
        { image: res.cards[2].image, value: res.cards[2].value },
      ]);
      setDealerScore([
        { image: res.cards[1].image, value: res.cards[1].value },
        { image: res.cards[3].image, value: res.cards[3].value },
      ]);
      //   console.log(res);
    }
    initialLoad();
  }, [reset]);

  //draws new card for player
  async function newCard() {
    const response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const res = await response.json();
    setPlayerScore((prev) => [
      ...prev,
      { image: res.cards[0].image, value: res.cards[0].value },
    ]);
  }
  //draws new card for dealer
  async function newDealerCard() {
    const response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const res = await response.json();
    setDealerScore((prev) => [
      ...prev,
      { image: res.cards[0].image, value: res.cards[0].value },
    ]);
  }

  const player = useScore(playerScore);
  const dealer = useScore(dealerScore);
  console.log('player', player, 'dealer', dealer);

  function compareScores(dealerscore, playerscore) {
    dealerscore > 21
      ? setWinner('Dealer bust, you win!')
      : dealerscore > playerscore
      ? setWinner('Dealer wins!')
      : setWinner('You win!');
    setGameOver(true);
  }

  function dealerTurn() {
    dealer < 17 && newDealerCard();
    dealer > 16 && compareScores(dealer, player);
  }

  function reseter() {
    setWinner('');
    setGameOver(false);
    setReset(!reset);
  }

  //   function dealerTurn(dealerscore, playerscore) {
  //     do {
  //       setDealersTotal(dealerscore);
  //       newDealerCard();
  //       console.log(dealerTurn);
  //     } while (dealersTotal < 17);
  //     compareScores(dealerscore, playerscore);
  //   }

  return (
    <div className='App'>
      <h1>{winner}</h1>
      <h1>
        Dealer Score {dealer}
        {dealerScore.map((player) => {
          return <img src={`${player.image}`} alt={player.value}></img>;
        })}
      </h1>
      <h1>
        Player Score {player}
        {playerScore.map((player) => {
          return <img src={`${player.image}`} alt={player.value}></img>;
        })}
      </h1>
      {player <= 21 ? (
        <div>
          <button
            onClick={() => {
              newCard();
            }}
          >
            Draw Card
          </button>
          <button
            onClick={() => {
              dealerTurn();
            }}
          >
            Stick
          </button>
          {gameOver ? (
            <button
              onClick={() => {
                reseter();
              }}
            >
              Play Again
            </button>
          ) : null}
        </div>
      ) : (
        <div>
          <h1>Bust!</h1>
          <button
            onClick={() => {
              setReset(!reset);
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
