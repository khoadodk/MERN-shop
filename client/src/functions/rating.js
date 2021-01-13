import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    // Populate the rating array
    ratingsArray.map((r) => total.push(r.star));
    // Nominator
    let totalReduced = total.reduce((p, n) => p + n, 0);
    let result = (totalReduced * 5) / (length * 5);
    return (
      <div className='text-center py-2'>
        <span>
          <StarRating
            starDimension='2em'
            rating={result}
            starRatedColor='red'
            editing={false}
          />{' '}
          ({p.ratings.length})
        </span>
      </div>
    );
  }
};
