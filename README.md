<div align="center">

![npm bundle size](https://img.shields.io/bundlephobia/min/%40vouill%2Freact-infinite-scroll)
![NPM License](https://img.shields.io/npm/l/%40vouill%2Freact-infinite-scroll)
![NPM Version](https://img.shields.io/npm/v/%40vouill%2Freact-infinite-scroll)

</div>

# @vouill/react-infinite-scroll

A very simple and opinionated way to handle infinite scrolling with react.

Uses the [Intersection Observer](https://caniuse.com/intersectionobserver) API and is SSR friendly.

[Have a look](./lib/LoadMore.tsx) at the code and feel free to take it directly if needed.

# Usage

```tsx
import { LoadMore } from "@vouill/react-infinite-scroll"

...
    <YourList/>
    <LoadMore onLoadMore={loadMoreData}/>
...
```

When this component is reached while scrolling or rendering, it will fire the `onLoadMore` event.

You can place this component at the end of an infinite list, or use a bit of CSS and place it at specific scroll percentage.

If you want to have more granular control over it, simply add your conditions when rendering it:

```tsx
{
  !isLoading && hasNextPage && <LoadMore onLoadMore={loadMoreData} />
}
```

Run this repo and it's examples:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/vouill/react-infinite-scroll)

## Examples

### Simple synchronous setup

[Codeblitz](https://stackblitz.com/edit/vitejs-vite-xjwzv55u?file=src%2FApp.tsx)

```tsx
export const SynchronousData = () => {
  const [data, setData] = useState<string[]>(fakeData)
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
            return setData((d) => [...d, ...fakeData])
          }}
        />
      </div>
    </div>
  )
}
```

### Real life api setup & load when 80% scrolled

#### With react query

[Try live on Codeblitz](https://stackblitz.com/edit/vitejs-vite-qnsv5wrs?file=package.json,src%2Fmain.tsx,src%2FApp.tsx)

```tsx
import { LoadMore } from "@vouill/react-infinite-scroll"
import { useInfiniteQuery } from "@tanstack/react-query"

const LIMIT = 30

const getUrlOffset = (url: string) => {
  if (!url) return null
  const regex = /[?&]offset=(\d+)/
  const match = url.match(regex)
  const offset = match ? match[1] : null
  return offset
}

export default function App() {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<{
    results: { name: string }[]
    count: number
    next: string
  }>({
    queryKey: ["pokemons"],
    queryFn: async ({ pageParam }) =>
      (
        await fetch(
          `https://pokeapi.co/api/v2/ability/?limit=${LIMIT}&offset=${pageParam}`
        )
      ).json(),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => getUrlOffset(lastPage.next),
  })

  return (
    <div className="App">
      <p>
        This list uses the{" "}
        <a href="https://pokeapi.co/docs/v2#resource-listspagination-section">
          pokeapi
        </a>
      </p>
      <div style={{ position: "relative" }}>
        {data?.pages?.map(({ results }, pageIndex) =>
          results.map(({ name }, resultIndex) => (
            <div key={name}>
              {pageIndex * LIMIT + resultIndex} - {name}
            </div>
          ))
        )}
        {isFetching && "loading..."}
        {!isFetching && hasNextPage && (
          <LoadMore
            style={{ position: "absolute", bottom: "20%" }}
            onLoadMore={() => {
              fetchNextPage()
            }}
          />
        )}
      </div>
    </div>
  )
}
```

### Simple fetch and useState

[Try live on Codeblitz](https://stackblitz.com/edit/vitejs-vite-hyqefdmj?file=src%2FApp.tsx)

```tsx
export const SynchronousData = () => {
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
```

# API

- `onLoadMore`: Event fired when the component is "visible" in the current view.
- `as`: redefine the rendered component, by default it's an empty `div`.
- `...props`: you can forward any props if needed.
