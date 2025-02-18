import { useState } from "react"

import "./App.css"

import { Sync } from "./Sync"
import { Async } from "./Async"
import { RealLifeApi } from "./RealLifeApi"
import { ShortList } from "./ShortList"

function App() {
  const [section, setSection] = useState("sync")
  return (
    <div className="App">
      <div>
        <button onClick={() => setSection("sync")}>Sync</button>
        <button onClick={() => setSection("async")}>Async</button>
        <button onClick={() => setSection("realLifeApi")}>RealLifeApi</button>
        <button onClick={() => setSection("short-list")}>Short List</button>
      </div>
      {section === "sync" && <Sync />}
      {section === "async" && <Async />}
      {section === "realLifeApi" && <RealLifeApi />}
      {section === "short-list" && <ShortList />}
    </div>
  )
}
export default App
