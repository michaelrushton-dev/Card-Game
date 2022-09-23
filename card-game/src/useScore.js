export default function useScore(arr) {
  let score = 0;
  let valuesArr = arr.map((arr) => {
    return arr.value;
  });
  console.log('valuesArr', valuesArr);
  arr.map((card) => {
    return card.value === 'KING'
      ? (score = score + 10)
      : card.value === 'QUEEN'
      ? (score = score + 10)
      : card.value === 'JACK'
      ? (score = score + 10)
      : card.value === 'ACE'
      ? (score = score + 11)
      : (score = score + Number(card.value));
  });
  return valuesArr.includes('ACE') && score > 21 ? (score = score - 10) : score;
}
