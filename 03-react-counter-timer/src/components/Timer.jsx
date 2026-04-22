import { useEffect, useState } from "react";

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  return (
    <section className="card">
      <h2>Timer</h2>
      <p className="display">{formatTime(seconds)}</p>
      <div className="buttons">
        <button onClick={() => setRunning((r) => !r)}>
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
