import { GET_TABLE_DATA, GET_TABLE_DATA_SUCCESS, GET_TABLE_DATA_FAILURE } from './constants';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

export const tablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TABLE_DATA: {
      const { path } = action.payload;

      return {
        ...state,
        [path]: {
          loading: true,
          error: null,
          data: null,
        },
      };
    }
    case GET_TABLE_DATA_SUCCESS: {
      const { path, dataSources } = action.payload;

      return {
        ...state,
        [path]: {
          loading: false,
          error: null,
          data: dataSources,
        },
      };
    }
    case GET_TABLE_DATA_FAILURE: {
      const { path, error } = action.payload;

      return {
        ...state,
        [path]: {
          error,
          loading: false,
          data: null,
        },
      };
    }
    default:
      return state;
  }
};
