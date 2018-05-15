export function removeArrayelement(arr, el) {
    let index = arr.indexOf(el)
    if (index==-1) return arr;
    arr.splice(index, 1)
    return arr
}