import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section className="card">
      <h2>Counter</h2>
      <p className="display">{count}</p>
      <div className="buttons">
        <button onClick={() => setCount((c) => c - 1)}>−</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
      </div>
    </section>
  );
}
