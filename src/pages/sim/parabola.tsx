import { Kaisei_HarunoUmi } from "@next/font/google";
import {
  CartesianCoordinates,
  Line,
  Plot,
  Point,
  Theme,
  UseMovablePoint,
  useMovablePoint,
  Vector,
} from "mafs";
import { useState } from "react";
import Layout from "../components/layout";

interface ICoEfficients {
  a: number;
  b: number;
  c: number;
}

interface ICoEfficientsWCTS {
  a: number;
  b: number;
  c: number;
  h: number;
  k: number;
}

interface ISolvable extends ICoEfficientsWCTS {
  x: number;
}

//Math

function round(value: number) {
  return Math.round((value + Number.EPSILON) * 5) / 5;
}

function resolve({ a, b, c, x }: ISolvable) {
  // ax^2 + bx + c
  return a * x ** 2 + b * x + c;
}

function sign(value: number): string {
  if (value >= 0) {
    return `+ ${value}`;
  } else {
    return `- ${-value}`;
  }
}

function expand(a: number, h: number, k: number) {
  let b = -2 * h * a;
  let c = Math.pow(h, 2) * a + k;

  return [b, c];
}

// Represent quadratic equation in completing the square form
function cts({ a, b, c, h, k }: ICoEfficientsWCTS) {
  return `${a != 1 ? a : ""}(𝑥${h != 0 ? ` ${sign(-h)}` : ""})² ${
    k != 0 ? sign(k) : ""
  }`;
}

function calculateH({ a, b }: ICoEfficients) {
  return -(b / (2 * a));
}
function calculateK({ a, b, c }: ICoEfficients) {
  return c - Math.pow(b, 2) / (4 * a);
}
// Graph
function Graph({
  vars,
  moving,
  movingFocus,
  intercept,
}: {
  vars: ICoEfficientsWCTS;
  moving: UseMovablePoint;
  movingFocus: UseMovablePoint;
  intercept: UseMovablePoint;
}) {
  const { a, b, c, h, k } = vars;
  let fY = k + (1 / 4) * a;
  return (
    <>
      <CartesianCoordinates />

      <Plot.OfX y={(x) => resolve({ a, b, c, h, k, x })} color={Theme.blue} />
      <Vector tail={[0, 0]} tip={[h, k]} />
      <Point x={h} y={movingFocus.y} />
      <Vector
        tail={[h, movingFocus.y]}
        tip={[Math.sqrt((movingFocus.y - k) / a) + h, movingFocus.y]}
      />
      <Vector
        tail={[h, movingFocus.y]}
        tip={[-Math.sqrt((movingFocus.y - k) / a) + h, movingFocus.y]}
      />
      <Plot.OfY x={() => intercept.x}></Plot.OfY>
      {moving.element}
      {movingFocus.element}
      {intercept.element}
    </>
  );
}

export default function Parabola() {
  let [p, setP] = useState(0.25);
  let a = 1 / (4 * p);
  let [h, setH] = useState(calculateH({ a, b: 0, c: 0 }));
  let [k, setK] = useState(calculateK({ a, b: 0, c: 0 }));
  let [i, setI] = useState(-h);

  let b = expand(a, h, k)[0];
  let c = expand(a, h, k)[1];

  const turning = useMovablePoint([-h, k], {
    constrain: ([x, y]) => [Math.round(x), Math.round(y)],
  });

  const intercept = useMovablePoint([i, k - 1], {
    constrain: ([x, y]) => [round(x), -1],
  });

  let [prevMovingFocusY, setPrevMovingFocusY] = useState(a + k);

  const movingFocus = useMovablePoint([h, a + k], {
    constrain: ([_, y]) => {
      y = Math.round(y);
      if (y - k == 0) {
        if (prevMovingFocusY > 0) {
          y = y - 1;
        } else {
          y = y + 1;
        }
      }

      setPrevMovingFocusY(y);
      return [h, y];
    },
  });

  if (h != turning.x) {
    setH(turning.x);
  }

  if (movingFocus.x != h) {
    movingFocus.setPoint([h, movingFocus.y]);
  }

  if (i != intercept.x) {
    setI(intercept.x);
  }

  if (movingFocus.y != k + a || k != turning.y) {
    if (k != turning.y) {
      setK(turning.y);
      movingFocus.setPoint([movingFocus.x, turning.y + a]);
    } else {
      setP(1 / (4 * (movingFocus.y - k)));
    }
  }

  return (
    <Layout
      math={
        <Graph
          vars={{ a, b, c, h, k }}
          moving={turning}
          movingFocus={movingFocus}
          intercept={intercept}
        />
      }
    >
      <div className="flex  space-x-12 text-xl justify-between">
        <div>
          <p className="font-math">
            {a}𝑥² {sign(b)}𝑥 {sign(c)}
          </p>
          <p className="font-math">{cts({ a, b, c, h, k })}</p>
          <div className="flex">
            Vertex:<p className="font-math">{`(${sign(h)}, ${sign(k)})`}</p>
            <p>{resolve({ a, b, c, h, k, x: i })}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-4 w-2/3">
          <div>
            A
            <input
              type="range"
              min={1}
              step={1}
              max={12}
              value={a}
              className="w-2/3"
              onChange={(event) => {
                let newA = +event.target.value;
                movingFocus.setPoint([h, newA]);
              }}
            />
          </div>
          <div>
            H
            <input
              type="range"
              min={-12}
              step={1}
              max={12}
              value={h}
              className="w-2/3"
              onChange={(event) => {
                let newH = +event.target.value;
                turning.setPoint([newH, calculateK({ a, b, c })]);
                setH(newH);
              }}
            />
          </div>
          <div className="w">
            K
            <input
              type="range"
              min={-12}
              step={1}
              max={12}
              value={k}
              className="w-2/3"
              onChange={(event) => {
                let newK = +event.target.value;
                turning.setPoint([calculateH({ a, b, c }), newK]);
                movingFocus.setPoint([h, newK]);
              }}
            />
            <div>
              B
              <input
                type="range"
                min={-12}
                step={1}
                max={12}
                value={b}
                className="w-2/3"
                onChange={(event) => {
                  let newB = +event.target.value;
                  turning.setPoint([
                    calculateH({ a, b: newB, c }),
                    calculateK({ a, b: newB, c }),
                  ]);
                }}
              />
            </div>
            <div>
              C
              <input
                type="range"
                min={-12}
                step={1}
                max={12}
                value={c}
                className="w-2/3"
                onChange={(event) => {
                  let newC = +event.target.value;
                  turning.setPoint([
                    calculateH({ a, b, c: newC }),
                    calculateK({ a, b, c: newC }),
                  ]);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
