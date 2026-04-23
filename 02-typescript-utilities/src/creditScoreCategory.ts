export type CreditScoreCategory =
  | "subprime"
  | "near-prime"
  | "prime"
  | "super-prime";

const MIN_SCORE = 300;
const MAX_SCORE = 900;

export function creditScoreCategory(score: number): CreditScoreCategory {
  if (!Number.isFinite(score)) {
    throw new RangeError(`Score must be a finite number, received ${score}`);
  }

  const whole = Math.floor(score);

  if (whole < MIN_SCORE || whole > MAX_SCORE) {
    throw new RangeError(
      `Score ${whole} is outside the accepted range ${MIN_SCORE}-${MAX_SCORE}`,
    );
  }

  if (whole < 580) return "subprime";
  if (whole < 670) return "near-prime";
  if (whole < 800) return "prime";
  return "super-prime";
}
