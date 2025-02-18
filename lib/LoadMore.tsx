import { useRef, useEffect, useCallback } from "react"

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1,
}

type LoadMoreProps = {
  onLoadMore: () => void
  as?: React.ElementType
} & React.HTMLAttributes<HTMLDivElement>

/**
 * The hook needed to do all this, can be used independently if needed
 */
export const useLoadMore = ({
  onLoadMore,
}: Pick<LoadMoreProps, "onLoadMore">) => {
  const ref = useRef(null)

  const callback = useCallback<IntersectionObserverCallback>(
    (entries) => {
      if (entries[0].isIntersecting) {
        onLoadMore()
      }
    },
    [onLoadMore]
  )
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [ref, callback])
  return [ref]
}

/**
 * This component is used to trigger the infinite scroll for pipeline steps
 */
export const LoadMore = ({
  onLoadMore,
  as: Component = "div",
  ...props
}: LoadMoreProps) => {
  const [ref] = useLoadMore({ onLoadMore })
  return <Component ref={ref} {...props} />
}
