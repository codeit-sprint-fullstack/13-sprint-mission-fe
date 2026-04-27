import { useState, useEffect } from 'react'
import { getProductList } from '../services/productService'

export function useProductList({ page, pageSize, keyword, orderBy }) {
  const [list, setList] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)

    getProductList({ page, pageSize, keyword, orderBy })
      .then((data) => {
        if (cancelled) return
        setList(data.list ?? [])
        setTotalCount(data.totalCount ?? 0)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => { cancelled = true }
  }, [page, pageSize, keyword, orderBy])

  return { list, totalCount, isLoading, error }
}
