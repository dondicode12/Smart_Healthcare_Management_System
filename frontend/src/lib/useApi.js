import { useCallback, useEffect, useState } from 'react'
import api, { getErrorMessage } from './api'

// Loads data from the backend when a page opens.
//
//   const { data, loading, error, retry, setData } = useApi('/patients')
//
// loading -> true until the answer (or an error) arrives
// error   -> a message to show the user, or ''
// retry   -> call it from a "Try again" button
// setData -> change the list on screen (used by the local-only Delete for now)
export default function useApi(path) {
  const [state, setState] = useState({ data: null, error: '', loading: true })
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let ignore = false
    api
      .get(path)
      .then(({ data }) => {
        if (!ignore) setState({ data, error: '', loading: false })
      })
      .catch((err) => {
        if (!ignore) setState({ data: null, error: getErrorMessage(err), loading: false })
      })
    return () => {
      ignore = true
    }
  }, [path, reloadKey])

  const retry = useCallback(() => {
    setState({ data: null, error: '', loading: true })
    setReloadKey((key) => key + 1)
  }, [])

  const setData = useCallback((update) => {
    setState((previous) => ({
      ...previous,
      data: typeof update === 'function' ? update(previous.data) : update,
    }))
  }, [])

  return { ...state, retry, setData }
}
