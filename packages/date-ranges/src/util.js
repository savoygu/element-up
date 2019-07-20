export const isTwoDimensionArray = (val, verifyElFn) => Array.isArray(val) && val.length > 0 && val.every(item => Array.isArray(item) && (verifyElFn ? item.every(verifyElFn) : true))

export const getDataByCol = (data, col = 0) => {
  col = Array.isArray(col) ? col : [col]
  const retVal = data.reduce((acc, val) => {
    col.forEach((item, i) => {
      acc[i].push(val[item])
    })
    return acc
  }, col.map(() => []))
  return col.length > 1 ? retVal : retVal[0]
}
