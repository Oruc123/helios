
export type PayloadType = Record<string, unknown>

interface ReducerShape<StateType> {
  initialState?: StateType;
  actions?: {
    [key: string]: (state: StateType, payload: PayloadType) => StateType,
  };
}

interface ActionShape {
  type: string;
  payload: PayloadType;
}

function createReducer<T>({ initialState = {} as T, actions = {} }: ReducerShape<T>) {
  return function reducer(state: T = initialState, { type, payload }: ActionShape): T {
    if (typeof actions[type] === 'function') {
      return actions[type](state, payload);
    }

    return state;
  };
}

export default createReducer;
