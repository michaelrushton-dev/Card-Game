export default function useScore(arr) {
  let score = 0;
  let x = 0;

  arr.map((card) => {
    switch (
      card.value === 'KING'
        ? (score = score + 10)
        : card.value === 'QUEEN'
        ? (score = score + 10)
        : card.value === 'JACK'
        ? (score = score + 10)
        : card.value === 'ACE'
        ? (score = score + x)
        : (score = score + Number(card.value))
    ) {
      case 0:
        x = 1;
        break;
      case score < 10:
        x = 11;
    }
  });
  //   return arr.includes('ACE') && score > 21 ? (score = score - 10) : score;
  //   arr.map((card) => {
  //     return card.value === 'KING'
  //       ? (score = score + 10)
  //       : card.value === 'QUEEN'
  //       ? (score = score + 10)
  //       : card.value === 'JACK'
  //       ? (score = score + 10)
  //       : card.value === 'ACE'
  //       ? score > 10
  //         ? (score = score + 1)
  //         : (score = score + 11)
  //       : (score = score + Number(card.value));
  //   });
  //   return arr.includes('ACE') && score > 21 ? (score = score - 10) : score;
}
