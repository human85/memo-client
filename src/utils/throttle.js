function throttle(fn, delay) {
  let timer = null

  return function (...rest) {
    if (timer) return

    timer = setTimeout(() => {
      fn.apply(this, rest)
      timer = null
    }, delay)
  }
}

export default throttle
