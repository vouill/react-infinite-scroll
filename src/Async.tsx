import { useState } from "react"
import { LoadMore } from "../lib/LoadMore"
import { getAsyncFakeData, getSyncFakeData } from "./fakeData"

export const Async = () => {
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
          as={(props) => <div {...props}>"loading"</div>}
          onLoadMore={async () => {
            const data = await getAsyncFakeData()
            setData((d) => [...d, ...data])
          }}
        />
      </div>
    </div>
  )
}
