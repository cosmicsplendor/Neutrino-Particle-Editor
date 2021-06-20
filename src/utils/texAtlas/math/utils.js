export const rand = (to, from = 0) => from + Math.floor((to + 1)* Math.random())
export const randf = (to, from = 0) => from + (to - from)* Math.random()
export const pickOne = array => array[rand(array.length - 1)]
export const skewedRand = (to, from = 0) => from + Math.floor((to + 1) * Math.random() * Math.random())