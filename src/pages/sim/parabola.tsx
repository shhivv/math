import { Mafs, CartesianCoordinates, Plot } from "mafs"
import { useState } from "react"
import Layout from "../components/layout"

function resolve(a: number,b: number ,c: number,x: number){
  return a*(x**2) + b*x + c

}
function Math({vars}: {vars: {a: number, b: number, c:number}}){
  return <>
   <CartesianCoordinates />
   <Plot.OfX y={(x) => resolve(vars.a,vars.b,vars.c,x)} />
   </>
}

export default function Parabola() {
  
  let [a,setA] = useState(1)
  let [b,setB] = useState(1)
  let [c,setC] = useState(1)

  return (
    <Layout math={<Math vars={{a,b,c}}/>}>
      <h1>{a}x^2 + {b}x + {c}</h1>
        <input
          type="range"
          min={1}
          step={1}
          value={a}
          onChange={(event) => setA(+event.target.value)}
        />
    </Layout>
  )
}
