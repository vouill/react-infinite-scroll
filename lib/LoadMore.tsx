import React, { useRef, useEffect } from "react"

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
 * This component is used to trigger the infinite scroll for pipeline steps
 */
export const LoadMore = ({
  onLoadMore,
  as: Component = "div",
  ...props
}: LoadMoreProps) => {
  const ref = useRef(null)

  const callback: IntersectionObserverCallback = (entries) => {
    console.log(entries)
    if (entries[0].isIntersecting) {
      onLoadMore()
    }
  }
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)
    if (ref.current) {
      console.log("observing", ref.current)
      observer.observe(ref.current)
    }
    return () => {
      console.log("disconnecting observer")
      observer.disconnect()
    }
  }, [ref, callback])
  return <Component ref={ref} {...props} />
}
