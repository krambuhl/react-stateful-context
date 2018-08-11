import StatefulContext from '../../dist'

export default () =>
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
