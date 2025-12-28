import { createContext, useContext, useEffect, useState } from 'react'

const networkStatusContext = createContext(null)

const NetworkStatusProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true)
  const [isOnlineStatus, setIsOnlineStatus] = useState(navigator.onLine)

  useEffect(() => {
    const checkInternet = async () => {
      const MILLISECONDE = 3000
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), MILLISECONDE)

      try {
        await fetch('https://www.google.com/favicon.ico', {
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller.signal,
        })
        setIsOnline(true)
      } catch {
        setIsOnline(false)
      } finally {
        clearTimeout(timeout)
      }
    }

    const MILLISECONDE_INTERVAL = 1000
    const intervalId = setInterval(() => checkInternet(), MILLISECONDE_INTERVAL)

    const handleOnline = () => {
      setIsOnlineStatus(true)
      setIsOnline(true)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setIsOnlineStatus(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <networkStatusContext.Provider value={{ isOnline, isOnlineStatus }}>
      {children}
    </networkStatusContext.Provider>
  )
}

const useNetworkStatus = () => useContext(networkStatusContext)

export { NetworkStatusProvider, useNetworkStatus }
