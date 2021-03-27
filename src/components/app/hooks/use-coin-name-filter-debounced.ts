import { useEffect, useState } from 'react'

function useCoinNameFilterDebounced() {
  const [coinNameFilter, setCoinNameFilter] = useState('')
  const [coinNameFilterDebounced, setCoinNameFilterDebounced] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCoinNameFilterDebounced(coinNameFilter)
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [coinNameFilter])

  return {
    coinNameFilter,
    coinNameFilterDebounced,
    setCoinNameFilter,
  }
}

export { useCoinNameFilterDebounced }
