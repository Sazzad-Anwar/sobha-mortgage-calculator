let number = '100,000'

console.log((number.split('')).filter(ele => ele !== ',').join(''))
