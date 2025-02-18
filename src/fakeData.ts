export const getSyncFakeData = (nb = 100) =>
  new Array(nb).fill(null).map(() => `lorem `)

export const getAsyncFakeData = async () => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(getSyncFakeData())
    }, 1000)
  })
}
