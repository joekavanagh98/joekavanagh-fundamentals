# Notes, 03 React Counter and Timer

## Tooling (package.json, vite.config.js, index.html)

### "type": "module" in package.json
Tells Node and Vite to treat my files as ES modules so I can use
import/export. Without it, older default was CommonJS (require).
First time using this flag knowingly.

### Vite + @vitejs/plugin-react
Vite runs the dev server and handles the build. The React plugin is
what turns JSX into real JS the browser can run. Both are
devDependencies, not runtime.

### index.html is the entry point
Coming from vanilla JS where index.html was kind of the "end", this
flipped for me. In Vite, index.html is the starting file and it
points to src/main.jsx with a module script tag.

## main.jsx

### createRoot
React 18 way of attaching the app to the DOM. Replaced the older
ReactDOM.render. Didn't have to think about it much, it's just the
entry pattern now.

### StrictMode
Wraps the app and double-runs effects in dev mode to help catch
missing cleanup. My timer ticked twice the first time I loaded it
and I thought I had a bug. Turned out StrictMode was mounting and
unmounting on purpose. Fine.

### Importing CSS from JS
Putting `import "./styles.css"` in main.jsx felt weird. Vite
recognizes the import and wires up the styles. No <link> tag needed.

## Counter.jsx

### useState returns a pair
`const [count, setCount] = useState(0)`. First item is the current
value, second is the setter to update it. The array destructure was
new to me here.

### Functional updater
I started out writing `setCount(count + 1)` and it worked for the
counter because the user can only click so fast. But I learned the
right pattern is `setCount(c => c + 1)`. The callback form gets the
latest value, which matters if updates stack. Became necessary in
the timer.

### onClick with an arrow function
`onClick={() => setCount(c => c + 1)}`. The arrow function means
React calls my function when clicked instead of immediately on
render. Took me a second to see why I couldn't just write
`onClick={setCount(c => c + 1)}`, that would call it right away.

## Timer.jsx

### useEffect with cleanup
The effect returns a function. React runs that function before the
next effect and when the component unmounts. I used it to
clearInterval so pausing actually stops the interval instead of
leaving a dead one running.

### [running] dependency array
Effect re-runs when running changes. So starting creates an
interval, pausing triggers cleanup (which clears it), restarting
makes a new one. The dependency array is how I told React what to
watch.

### Why I needed the functional setter here
First attempt: `setSeconds(seconds + 1)` inside the interval. The
timer went to 1 and froze. The interval's callback was closed over
`seconds` at the time the effect ran (0), so it kept calling
setSeconds(0 + 1). Switching to `setSeconds(s => s + 1)` fixed it
because the callback form always gets the current value. This was
the thing that made closures click for me in React.

### padStart for mm:ss
`String(minutes).padStart(2, "0")` adds a leading zero if the number
is one digit. "5" becomes "05". Saved me writing a ternary.

## What could be better

- The timer drifts a little over time. setInterval doesn't fire
  exactly every 1000ms, so over a long run it falls behind.
  Tracking a start timestamp with Date.now() and computing elapsed
  would be more accurate.
- Nothing persists. If I reload, the counter resets and the timer
  resets. localStorage would fix that the same way it did in 01.
- The counter has no bounds. Clicking minus forever goes into
  negative numbers. A min/max prop would be an easy add.
- No tests. The logic is small enough to test with Vitest once I
  learn it.

## For later

- Custom hooks like useInterval or useCounter to move the stateful
  logic out of the components
- useReducer for when state gets more complex than one value
- React.memo and useCallback, read about them but haven't needed
  them yet
- Vitest + React Testing Library
