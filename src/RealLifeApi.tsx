import { useEffect, useState } from "react"
import { LoadMore } from "../lib/LoadMore"

export const RealLifeApi = () => {
  const [count, setCount] = useState(0)
  const [nextPage, setNextPage] = useState("")
  const [data, setData] = useState<{ name: string }[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { results, next, count } = await (
        await fetch("https://pokeapi.co/api/v2/ability/?limit=40&offset=20")
      ).json()
      setCount(count)
      setNextPage(next)
      setData(results)
    }
    fetchData()
  }, [])
  return (
    <div className="App">
      <p>
        This list uses the{" "}
        <a href="https://pokeapi.co/docs/v2#resource-listspagination-section">
          pokeapi
        </a>
      </p>
      <div style={{ position: "relative" }}>
        {data.map(({ name }, index) => (
          <div key={index}>{name}</div>
        ))}
        {count > data.length && (
          <LoadMore
            style={{ position: "absolute", bottom: "20%" }}
            onLoadMore={async () => {
              if (nextPage) {
                const {
                  results = [],
                  next,
                  count,
                } = await (await fetch(nextPage)).json()
                setCount(count)
                setNextPage(next)
                setData((d) => [...d, ...results])
              }
            }}
          />
        )}
      </div>
    </div>
  )
}
