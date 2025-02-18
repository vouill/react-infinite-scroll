import { useState } from "react"
import { LoadMore } from "../lib/LoadMore"
import { getSyncFakeData } from "./fakeData"

export function Sync() {
  const [data, setData] = useState(getSyncFakeData())
  return (
    <div className="App">
      <div>
        {data.map((content, index) => (
          <div key={index}>
            {content} - {index}
          </div>
        ))}
        <LoadMore
          onLoadMore={() => {
            setData((d) => [...d, ...getSyncFakeData()])
          }}
        />
      </div>
    </div>
  )
}
