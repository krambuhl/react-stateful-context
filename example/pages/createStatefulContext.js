import { createStatefulContext } from '../../dist'

const Context = createStatefulContext()

export default () =>
  <Context.Provider
    getInitialState={{ text: '' }}
  >
    <Context.Consumer>
      {
        ({ text, setContextState }) =>
          <div>
            <p>{text}</p>
            <button onClick={() => setContextState({ text: text + 'and then. ' })}>Make it longer</button>
          </div>
      }
    </Context.Consumer>
  </Context.Provider>
