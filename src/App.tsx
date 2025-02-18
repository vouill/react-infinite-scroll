import { useState } from "react"

import "./App.css"

import { Sync } from "./Sync"
import { Async } from "./Async"

function App() {
  const [section, setSection] = useState("sync")
  return (
    <div className="App">
      <div>
        <button onClick={() => setSection("sync")}>Sync</button>
        <button onClick={() => setSection("async")}>Async</button>
      </div>
      {section === "sync" && <Sync />}
      {section === "async" && <Async />}
    </div>
  )
}
export default App
