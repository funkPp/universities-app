import {
  IStateData,
  DataActionTypes,
  LOADING,
  RESOLVED,
  REJECTED,
  CHANGE_PAGE,
  CHANGE_UNIVER,
  PageActionTypes,
  ADD_UNIVER,
  DEL_UNIVER,
  IUniversity,
} from "../../types";

const initialState: IStateData = {
  isLoading: false,
  error: null,
  respond: [],
  currentPage: 0,
};

export default function dataReducer(
  state = initialState,
  action: DataActionTypes | PageActionTypes
): IStateData | null {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case RESOLVED:
      return {
        ...state,
        isLoading: false,
        respond: action.payload,
        currentPage: 0,
      };
    case REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        respond: [],
      };
    case CHANGE_PAGE:
      return { ...state, currentPage: action.payload };

    case CHANGE_UNIVER: {
      const data = [...state.respond];
      const newData = data.map((univer) => {
        if (univer.id === action.payload.id)
          return {
            ...univer,
            name: action.payload.name,
            web_pages: action.payload.web_pages,
            country: action.payload.country,
          };
        else return univer;
      });
      return { ...state, respond: newData };
    }

    case ADD_UNIVER: {
      const data = [...state.respond];
      const newData = [...data, action.payload];
      return { ...state, respond: newData };
    }

    case DEL_UNIVER: {
      const data = [...state.respond];
      const newData = data.filter((univer) => univer.id !== action.payload);
      return { ...state, respond: newData };
    }

    default:
      return state;
  }
}
