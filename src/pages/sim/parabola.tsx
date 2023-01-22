import { Mafs, CartesianCoordinates, Plot } from "mafs"
import { useState } from "react"
import Layout from "../components/layout"


interface ICoEfficients{
  a: number,
  b: number,
  c: number
}

interface ISolvable extends ICoEfficients{
  x: number
}

//Math

function resolve({a,b,c,x}: ISolvable){
  // ax^2 + bx + c
  return a*(x**2) + b*x + c

}

function sign(value: number): string{
  if(value > 0){
  return `+${value}`
  }else {
    return String(value)
  }
  
}

// Represent quadratic equation in completing the square form
function cts({a,b,c}:ICoEfficients){

  let d = b /(2*a);
  let e = c - (Math.pow(b,2)/(4*a));

  d = Math.round((d + Number.EPSILON) * 100) / 100
  e = Math.round((e + Number.EPSILON) * 100) / 100
  
  return `${a != 1 ? a : ""}(x${ d != 0 ? sign(d): ""})² ${e != 0 ? sign(e): ""}`

}








// Graph
function Graph({vars}: {vars: ICoEfficients}){
  const {a,b,c} = vars;
  return <>
   <CartesianCoordinates />
   <Plot.OfX y={(x) => resolve({a,b,c,x})} />
   </>
}

export default function Parabola() {
  
  let [a,setA] = useState(1)
  let [b,setB] = useState(1)
  let [c,setC] = useState(1)

  return (
    <Layout math={<Graph vars={{a,b,c}}/>}>
      <div className="flex  space-x-12 text-xl justify-between">
        <div>
          <h1 className="font-math">{a}x² + {b}x + {c}</h1>
          <h1 className="font-math">{cts({a,b,c})}</h1>
        </div>
      <div className="flex flex-col w-1/2 space-y-4">
      <input
          type="range"
          min={-12}
          step={1}
          max={12}
          value={a}
          onChange={(event) => setA(+event.target.value)}
        />
        <input
          type="range"
          min={-12}
          step={1}
          max={12}
          value={b}
          onChange={(event) => setB(+event.target.value)}
        /><input
        type="range"
        min={-12}
        step={1}
        max={12}
        value={c}
        onChange={(event) => setC(+event.target.value)}
      />
      </div>
        
      </div>
      
    </Layout>
  )
}
