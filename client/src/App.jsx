import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import initializeStore from './store'
import AppContent from './AppContent'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [store, setStore] = useState(null)

  useEffect(() => {
    initializeStore().then(store => {
      setStore(store)
    })
  }, [])

  if (!store) {
    return <LoadingScreen />
  }

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App
