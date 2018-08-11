# react-stateful-context

A stateful component wrapping the React Context API. Provides consumer callback to update the context state using `setState` internally.

> Codifies the [updating context from a nested component](https://reactjs.org/docs/context.html#updating-context-from-a-nested-component) pattern from the react docs.

## Install

```cli
// using npm
npm install react-stateful-context -S

// using yarn
yarn add react-stateful-context -S
```

## Usage

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

By default the default export is a shared context, if you need to create a unique context use `createStatefulContext()`.  This will create a unique Context and Consumer and Provider components.

```js
{
  Context,
  Consumer,
  Provider
}
```

## License

MIT License 2018
