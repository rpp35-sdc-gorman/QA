
export const getAverageRating = (product) => {
  let ratings = product.ratings;
  let [ totalResponses, score] = [0, 0];
  for (let star in ratings) {
    score += Number(star) * Number(ratings[star]);
    totalResponses += Number(ratings[star]);
  }
  let finalScore = Math.ceil(4 * (score / totalResponses)) / 4;
  if (!finalScore) {
    return 0
  } else {
    return finalScore;
  }
};