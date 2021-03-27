import { useRef, useEffect } from 'react'

function useSafeSetState() {
  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
      return
    }
  }, [])

  const safeSetState = (setState: Function) => {
    if (!isMounted.current) {
      return
    }

    setState()
  }

  return safeSetState
}

export { useSafeSetState }
