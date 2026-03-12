import styles from "./RatingStars.module.css";

interface RatingStarsProps {
  rating: number;
}

const MAX_STARS = 5;

export const RatingStars = ({ rating }: RatingStarsProps) => {
  const filledStars = Math.max(0, Math.min(MAX_STARS, Math.floor(rating)));

  return (
    <div className={styles.stars} aria-label={`Рейтинг ${rating.toFixed(1)} из ${MAX_STARS}`}>
      {Array.from({ length: MAX_STARS }, (_, index) => {
        const isFilled = index < filledStars;

        return (
          <img
            key={index}
            className={`${styles.star} ${isFilled ? styles.filled : styles.empty}`}
            src="/icons/star.svg"
            alt=""
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
};
