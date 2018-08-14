import React from 'react'

export const createStatefulContext = () => {
  const Context = React.createContext({
    setContextState: () => {},
    startObservingState: () => {},
    stopObservingState: () => {}
  })

  class Provider extends React.Component {
    constructor (props) {
      super(props)

      const initialState =
        typeof props.getInitialState === 'function'
          ? props.getInitialState.call(this)
          : props.getInitialState

      this.observables = []
      this.state = {
        ...initialState,
        setContextState: (...args) => this.setContextState(...args),
        startObservingState: (...args) => this.startObservingState(...args),
        stopObservingState: (...args) => this.stopObservingState(...args)
      }
    }

    setContextState (newState) {
      this.setState(newState)
    }

    componentDidUpdate (_, prevState) {
      Object.keys(this.state)
        .filter(key => this.state !== prevState[key])
        .forEach(key => this.runObserver(key))
    }

    runObserver (name) {
      this.observables
        .filter(def => def.name === name)
        .forEach(def => def.fn(this.state, this))
    }

    startObservingState (name, fn) {
      this.observables.push({ name, fn })
    }

    stopObservingState (name, fn) {
      this.observables.filter(def => (
        def.name === name && def.fn === fn
      ))
    }

    render () {
      return (
        <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      )
    }
  }

  return {
    Context,
    Provider,
    Consumer: Context.Consumer
  }
}

const defaultContext = createStatefulContext()

export default defaultContext
export const { Context, Consumer, Provider } = defaultContext
