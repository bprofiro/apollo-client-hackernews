export const generatePagesArray = (from: number, to: number) => {
  const genereatedArray = [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter(page => page > 0)

  return genereatedArray
}