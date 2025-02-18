# @vouill/react-infinite-scroll

A very simple and opinionated way to handle infinite scrolling with react.

Uses the [Intersection Observer](https://caniuse.com/intersectionobserver) API and should be SSR friendly.

# Usage

`@vouill/react-infinite-scroll` exposes a `<LoadMore onLoadMore={()=>{}}/>` component.

When this component is reached while scrolling or rendering, it will fire the `onLoadMore` event.

You can place this component at the end of an infinite list, or use a bit of CSS and place it at specific scroll percentage.

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

[Codeblitz](https://stackblitz.com/edit/vitejs-vite-hyqefdmj?file=src%2FApp.tsx)

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
