function debounce(func: Function, timeoutMs: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null

  return function (...args: any[]) {
    if (timeoutId != null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }

    timeoutId = setTimeout(() => func(...args), timeoutMs)
  }
}

function throttle(func: Function, timeoutMs: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (...args: any[]) {
    if (timeoutId == null) {
      timeoutId = setTimeout(() => {
        func(...args)
        timeoutId = null
      }, timeoutMs)
    }
  }
}

export { debounce, throttle }
