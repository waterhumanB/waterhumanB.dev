import {
  useReducer,
  createContext,
  Dispatch,
  ReactNode,
  useContext,
} from "react"

interface State {
  toggle: boolean
}

type Action =
  | {
      type: "Book"
      toggle: true
    }
  | {
      type: "Video"
      toggle: false
    }

const INIT_TOGGLE = {
  toggle: true,
}

const toggleReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "Book":
      return { toggle: action.toggle }
    case "Video":
      return { toggle: action.toggle }
    default:
      return state
  }
}

const ToggleStateContext = createContext<State>(INIT_TOGGLE)
const ToggleDispatchContext = createContext<Dispatch<Action>>(() => null)

export const useToggleStateContext = () => {
  return useContext(ToggleStateContext)
}

export const useToggleDispatch = () => {
  return useContext(ToggleDispatchContext)
}

export function ToggleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(toggleReducer, INIT_TOGGLE)

  return (
    <ToggleStateContext.Provider value={state}>
      <ToggleDispatchContext.Provider value={dispatch}>
        {children}
      </ToggleDispatchContext.Provider>
    </ToggleStateContext.Provider>
  )
}
