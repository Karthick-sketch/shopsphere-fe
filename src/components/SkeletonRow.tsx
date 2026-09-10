interface SkeletonRowProps {
  cols: number;
  rows?: number;
}

function Cell({ widths }: { widths: string[] }) {
  return (
    <>
      {widths.map((w, i) => (
        <td key={i}>
          <span className="skeleton skeleton-text" style={{ width: w }} />
        </td>
      ))}
    </>
  );
}

// Deterministic pseudo-random width based on position
function pseudoWidth(col: number, row: number): string {
  const widths = ["60%", "75%", "50%", "85%", "65%", "80%", "55%", "70%"];
  return widths[(col + row * 3) % widths.length];
}

export default function SkeletonRow({ cols, rows = 5 }: SkeletonRowProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, row) => (
        <tr key={row}>
          <Cell widths={Array.from({ length: cols }, (_, col) => pseudoWidth(col, row))} />
        </tr>
      ))}
    </>
  );
}
