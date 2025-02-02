import React from "react";

export const Counter = () => {
    const [counter, setCounter] = React.useState(0);
    const handleIncrement = () => setCounter(counter + 1);
    return(
        <div>
            <p>Counter: {counter}</p>
            <button onClick={handleIncrement}>Increment</button>
        </div>
    )
};