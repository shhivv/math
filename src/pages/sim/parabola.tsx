import { CartesianCoordinates, MovablePoint, Plot, Transform, UseMovablePoint, useMovablePoint } from "mafs"
import { useState } from "react"
import Layout from "../components/layout"


interface ICoEfficients{
  a: number,
  b: number,
  c: number
}

interface ICoEfficientsWCTS{
  a: number,
  b: number,
  c: number,
  h: number,
  k: number
}

interface ISolvable extends ICoEfficientsWCTS{
  x: number
}

//Math

function resolve({a,b,c,x}: ISolvable){
  // ax^2 + bx + c
  return a*(x**2) + b*x + c

}

function sign(value: number): string{
  if(value > 0){
  return `+ ${value}`
  }else {
    return String(value)
  }
  
}

function expand(a: number, h: number, k: number){
  let b = 2*h;
  let c = Math.pow(h,2) + k

  return [b,c]
}

// Represent quadratic equation in completing the square form
function cts({a,b,c,h,k}:ICoEfficientsWCTS){

  return `${a != 1 ? a : ""}(𝑥 ${ h != 0 ? sign(h): ""})² ${k != 0 ? sign(k): ""}`

}

function calculateH({a,b}: ICoEfficients){
   return (b/(2*a))
}
function calculateK({a,b,c}: ICoEfficients){
  return c -((Math.pow(b,2))/(4*a))
}
// Graph
function Graph({vars, moving}: {vars: ICoEfficientsWCTS, moving: UseMovablePoint}){
  const {a,b,c,h,k} = vars;
 
  return <>
   <CartesianCoordinates />
   <Plot.OfX y={(x) => resolve({a,b,c,h,k,x})} />
   {}
   </>
}

export default function Parabola() {
  
  let [a,setA] = useState(1)
  let [h,setH] = useState(calculateH({a,b: 1, c: 1}))
  let [k,setK] = useState(calculateK({a,b: 1,c: 1}))

  let b = expand(a,h,k)[0]
  let c = expand(a,h,k)[1]
  const turning = useMovablePoint([h,k], {
    constrain: "vertical"
  })

  return (
    <Layout math={<Graph vars={{a,b,c,h,k}} moving={turning}/>}>
      <div className="flex  space-x-12 text-xl justify-between">
        <div>
          <h1 className="font-math">{a}𝑥² + {b}𝑥 + {c}</h1>
          <h1 className="font-math">{cts({a,b,c,h,k})}</h1>
        </div>
      <div className="flex flex-col w-1/2 space-y-4">
      <input
          type="range"
          min={1}
          step={1}
          max={12}
          value={a}
          onChange={(event) => {
            let newA = +event.target.value
            setA(newA)

          }}
        />
        <input
          type="range"
          min={-12}
          step={1}
          max={12}
          value={h}
          onChange={(event) => 
            {
              let newH = +event.target.value
              setH(newH)
          }}
        /><input
        type="range"
        min={-12}
        step={1}
        max={12}
        value={k}
        onChange={(event) => {
          let newK = +event.target.value
          setK(newK)
        }}
      />
      <input
        type="range"
        min={-12}
        step={1}
        max={12}
        value={b}
        onChange={(event) => {
          let newB = +event.target.value
          setH(calculateH({a,b: newB, c}))
          setK(calculateK({a,b: newB, c}))
        }}
      /><input
      type="range"
      min={-12}
      step={1}
      max={12}
      value={c}
      onChange={(event) => {
        let newC = +event.target.value
        setH(calculateH({a,b, c: newC}))
        setK(calculateK({a,b, c: newC}))
      }}
    />
      </div>
        
      </div>
      
    </Layout>
  )
}
