import type { RoastLevel } from "../types/roast-level";
import "./RoastBar.css";

const LEVELS: Record<Exclude<RoastLevel, null>, number> = {
  Light: 1,
  Medium: 2,
  Dark: 3,
};

export function RoastBar({ roast }: { roast: RoastLevel }) {
  if (!roast) return null;
  const filled = LEVELS[roast];

  return (
    <div className="roast-bar" aria-label={`Roast level: ${roast}`}>
      <div className="roast-bar__segments">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`roast-bar__seg ${i <= filled ? "is-filled" : ""}`}
          />
        ))}
      </div>
      <span className="roast-bar__label">{roast} roast</span>
    </div>
  );
}
