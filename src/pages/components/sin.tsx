import { Mafs, Plot, Theme, useStopwatch, Text } from "mafs"
import { useEffect } from "react"

export default function Sin(){
    const {time,start} = useStopwatch()

    useEffect(() => start(), [start])
    return (
        <Mafs pan={false}>
            <Plot.OfX y={(x) => Math.sin(x+(time*4))} color={Theme.blue} />
            <Plot.OfX y={(x) => Math.cos(x+(time*4))} color={Theme.pink} />
        </Mafs>
    )
}