# react-stateful-context

A stateful component wrapping the React Context API. Provides consumer callback to update the context state using `setState` internally.

> Codifies the [updating context from a nested component](https://reactjs.org/docs/context.html#updating-context-from-a-nested-component) pattern from the react docs.

## Install

```cli
// using yarn
yarn add react-stateful-context

// using npm
npm install react-stateful-context --save
```

## Usage

### StatefulContext

Wraps a React Context as a stateful component. Pass the `getInitialState` prop to initialize the component state, and use the `setContextState` consumer callback to update the component state.

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

### createStatefulContext

By default the default export is a shared context – if you need to create a unique context, use `createStatefulContext()`.

```js
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
