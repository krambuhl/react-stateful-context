# react-stateful-context

A stateful component wrapping the React Context API. Provides consumer callback to update the context state using `setState` internally.

> Codifies the [updating context from a nested component](https://reactjs.org/docs/context.html#updating-context-from-a-nested-component) pattern from the react docs.

## Install

```bash
# using yarn
yarn add react-stateful-context

# using npm
npm install react-stateful-context --save
```

## Usage

### StatefulContext

Wraps a React Context as a stateful component. Pass the `getInitialState` prop to initialize the component state, and use the `setContextState(newState)` consumer callback to update the component state.

```jsx
import StatefulContext from 'react-stateful-context'

<StatefulContext.Provider
  getInitialState={{ count: 0 }}
>
  {/* Retrieve context state property */}
  <StatefulContext.Consumer>
    {
      ({ count }) =>
        <div>Current Count: {count}</div>
    }
  </StatefulContext.Consumer>

  {/* Update context state property */}
  <StatefulContext.Consumer>
    {
      ({ count, setContextState }) =>
        <div>
          <button onClick={() => setContextState({ count: count + 1 })}>Add 1</button>
          <button onClick={() => setContextState({ count: count - 1 })}>Subtract 1</button>
        </div>
    }
  </StatefulContext.Consumer>
</StatefulContext.Provider>
```

#### Observing State Changes

Use `startObservingState` and `stopObservingState` to watch changes to a specific variable.


```jsx
class BaseInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: props.defaultValue }
    this.handleObservableChange = this.handleObservableChange.bind(this)
  }

  componentWillMount () {
    this.props.context.startObservingState('inputValue', this.handleObservableChange)
  }

  componentWillUnmount () {
    this.props.context.stopObservingState('inputValue', this.handleObservableChange)
  }

  handleObservableChange () {
    this.setState({ value: this.props.context.inputValue })
  }

  handleChange (ev) {
    this.props.context.setContextState({ inputValue: ev.target.value })
  }

  render () {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={ev => this.handleChange(ev)}
      />
    )
  }
}

const TextInput = () =>
  <StatefulContext.Consumer>
    {
      context =>
        <BaseInput context={context} {...args} />
    }
  </StatefulContext.Consumer>

// Use it!
<TextInput defaultValue="This the default value" />
<TextInput  />

{/* The 2nd Input will also get the default value after mounting */}

```


### createStatefulContext

By default the default export is a shared context – if you need to create a unique context, use `createStatefulContext()`.

```jsx
import { createStatefulContext } from 'react-stateful-context'

const { Context, Consumer, Provider } = createStatefulContext()

<Provider
  getInitialState={{ text: '' }}
>
  <Consumer>
    {
      ({ text, setContextState }) =>
        <div>
          <p>{text}</p>
          <button onClick={() => setContextState({ text: text + 'and then. ' })}>Make it longer</button>
        </div>
    }
  </Consumer>
</Provider>
```

## License

MIT License 2018
