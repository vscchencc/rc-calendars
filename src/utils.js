// 分割数组
export function groupArray (arr, subGroupLength) {
  let index = 0
  let newArray = []
  while(index < arr.length) {
      newArray.push(arr.slice(index, index += subGroupLength))
  }
  return newArray
}