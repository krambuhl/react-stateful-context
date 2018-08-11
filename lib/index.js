import React from 'react'

export const createStatefulContext = () => {
  const Context = React.createContext({
    setContextState: () => {}
  })

  return {
    Context,
    Consumer: Context.Consumer,
    Provider: class Provider extends React.Component {
      constructor (props) {
        super(props)

        const initialState =
          typeof props.getInitialState === 'function'
            ? props.getInitialState.call(this)
            : props.getInitialState

        this.state = {
          ...initialState,
          setContextState: (...args) => this.setContextState(...args)
        }
      }

      setContextState (newState) {
        this.setState(newState)
      }

      render () {
        return (
          <Context.Provider value={this.state}>
            {this.props.children}
          </Context.Provider>
        )
      }
    }
  }
}

const defaultContext = createStatefulContext()

export default defaultContext
export const { Context, Consumer, Provider } = defaultContext
