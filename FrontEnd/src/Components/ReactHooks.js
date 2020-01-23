import React, {useState} from 'react'

function ReactHooks() {
    const initialCount = 0
    const [count,setCount ] = useState(initialCount)

    return (
        <div>
            <h1>{count}</h1>
            <button onClick = {() =>setCount(initialCount)}> Reset </button>
            <button onClick = {() =>setCount(prevCount => prevCount+1)}> Increment 1 </button>
            <button onClick = {() =>setCount(prevCount => prevCount-1)}> Decrement 1 </button>
        </div>
    )
}

export default ReactHooks
