import React, { useEffect } from 'react'
import './App.css'
import { Header } from './components/Header'
import { InputLabel } from './components/InputLabel'
import { IssuesSection } from './components/IssuesSection'
import { Provider, useDispatch } from 'react-redux'
import { store } from './store/store'
import { getIssues } from './store/actions/issues-actions'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIssues())
  }, [])

  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div>
        <InputLabel />
      </div>
      <IssuesSection />
    </div>
  )
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
