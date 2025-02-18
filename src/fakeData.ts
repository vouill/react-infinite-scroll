export const getSyncFakeData = () =>
  new Array(100).fill(null).map(() => `lorem `)

export const getAsyncFakeData = async () => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(getSyncFakeData())
    }, 1000)
  })
}
