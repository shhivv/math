import { Mafs, Plot, CartesianCoordinates, useMovablePoint } from "mafs";
import { useEffect } from "react";

export default function VectorField() {
  const a = useMovablePoint([0.6, 0.6]);

  useEffect(() => {
    document.onmousemove = (e) => {
      a.setPoint([e.clientX, e.clientY]);
    };
  }, []);
  return (
    <Mafs>
      <Plot.VectorField
        xy={([x, y]) => [y - a.y - (x - a.x), -(x - a.x) - (y - a.y)]}
        step={0.5}
        xyOpacity={([x, y]) => (Math.abs(x) + Math.abs(y)) / 10}
      />
      {a.element}
    </Mafs>
  );
}
