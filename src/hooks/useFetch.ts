import useSWR from 'swr'

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error } = useSWR<Data, Error>(
    url,
    async (url) => {
      const response = await fetch(url)
      if (response.status >= 400 && response.status <= 499) {
        throw new Error('API Client Error', await response.json())
      }
      const data = await response.json()
      return data
    },
    {
      revalidateOnReconnect: true
    }
  )

  return { data, error }
}
