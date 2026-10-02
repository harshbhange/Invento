import { useEffect, useState } from "react"

type ApiFunction<T> = () => Promise<T>

export function useApi<T>(apiFunction: ApiFunction<T>) {
  const [data, setData] = useState<T | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const result = await apiFunction()

        setData(result)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [apiFunction])

  return {
    data,
    loading,
    error,
  }
}
