import StatefulContext from '../../dist'

export default () =>
  <StatefulContext.Provider
    getInitialState={{ count: 10 }}
  >
    <StatefulContext.Consumer>
      {
        (context) => {
          const { count, setContextState } = context
          return (
            <div>
              <div>Root Count: {count}</div>

              <button onClick={() => setContextState({ count: count + 1 })}>Add 1</button>
              <button onClick={() => setContextState({ count: count - 1 })}>Subtract 1</button>

              <StatefulContext.Provider getInitialState={() => context}>
                <StatefulContext.Consumer>
                  {
                    ({ count, setContextState }) => (
                      <div>
                        <div>Deep Count: {count}</div>

                        <button onClick={() => setContextState({ count: count + 1 })}>Add 1</button>
                        <button onClick={() => setContextState({ count: count - 1 })}>Subtract 1</button>
                      </div>
                    )
                  }
                </StatefulContext.Consumer>
              </StatefulContext.Provider>

              <StatefulContext.Consumer>
                {
                  ({ count, setContextState }) => (
                    <div>
                      <div>Root Count: {count}</div>

                      <button onClick={() => setContextState({ count: count + 1 })}>Add 1</button>
                      <button onClick={() => setContextState({ count: count - 1 })}>Subtract 1</button>
                    </div>
                  )
                }
              </StatefulContext.Consumer>
            </div>
          )
        }
      }
    </StatefulContext.Consumer>
  </StatefulContext.Provider>
