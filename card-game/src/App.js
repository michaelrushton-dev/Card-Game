import { useEffect, useState } from 'react';
import useScore from './useScore';
import './App.css';

function App() {
  const [playerScore, setPlayerScore] = useState([]);
  const [dealerScore, setDealerScore] = useState([]);
  const [deckId, setDeckId] = useState([]);

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
  }, []);

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

  const player = useScore(playerScore);
  const dealer = useScore(dealerScore);
  console.log('player', player, 'dealer', dealer);

  return (
    <div className='App'>
      <button
        onClick={() => {
          newCard();
        }}
      >
        Draw Card
      </button>
      <h1>
        Dealer Score
        {dealerScore.map((player) => {
          return <img src={`${player.image}`} alt={player.value}></img>;
        })}
      </h1>
      <h1>
        Player Score
        {playerScore.map((player) => {
          return <img src={`${player.image}`} alt={player.value}></img>;
        })}
      </h1>
    </div>
  );
}

export default App;
