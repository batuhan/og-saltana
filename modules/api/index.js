import { createInstance } from 'stelace'
import swr from "swr"

export const api = createInstance({ apiKey: 'seck_test_...' })

function fetcher(...args) {
    console.log("recieved", ...args)
    return api.apiKey.get(...args);
}

export function useApi (path, opts) {
    const { data, error } = useSWR(`/api/${path}`, fetcher)
  
    return {
      user: data,
      isLoading: !error && !data,
      isError: error
    }
  }
