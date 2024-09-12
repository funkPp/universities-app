import store from "../redux/store";
import rootReducer from "../redux/reducers/";

export interface IUniversityRequest {
  id: string;
  domains?: string[];
  state_province?: null | string;
  web_pages: string[];
  country: string;
  name: string;
  alpha_two_code?: string;
}

export interface IUniversity extends IUniversityRequest {
  readonly idLocal: number;
}

export interface IStateForm {
  id: string | null;
  name: string | null;
  web_pages: string[];
  isEditing: boolean;
}

export interface IStateData {
  isLoading: boolean;
  respond: IUniversity[];
  error: string | null;
  currentPage: number;
}

export interface IStateCurrentPage {
  index: number;
}

export const LOADING = "LOADING";
export const RESOLVED = "RESOLVED";
export const REJECTED = "REJECTED";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const CHANGE_UNIVER = "CHANGE_UNIVER";
export const ADD_UNIVER = "ADD_UNIVER";
export const DEL_UNIVER = "DEL_UNIVER";

export const EDIT_FORM = "EDITING_FORM";
export const SAVE_FORM = "SAVING_FORM";
export const INIT_FORM = "SAVING_FORM";

export interface ILoadingAction {
  type: typeof LOADING;
}

export interface IResolveAction {
  type: typeof RESOLVED;
  payload: IUniversity[];
}

export interface IRejectAction {
  type: typeof REJECTED;
  payload: string;
}

export interface IChangePageAction {
  type: typeof CHANGE_PAGE;
  payload: number;
}

export interface IChangeFormAction {
  type: typeof CHANGE_UNIVER;
  payload: IUniversity;
}

export interface IAddFormAction {
  type: typeof ADD_UNIVER;
  payload: IUniversity;
}

// export interface IEditingFormAction {
//   type: typeof EDIT_FORM;
//   payload: string;
// }

// export interface ISavingFormAction {
//   type: typeof SAVE_FORM;
//   payload: IStateForm;
// }

export interface IDeleteFromAction {
  type: typeof DEL_UNIVER;
  payload: string;
}

export type DataActionTypes =
  | ILoadingAction
  | IResolveAction
  | IRejectAction
  | IAddFormAction
  | IChangeFormAction
  | IDeleteFromAction;
export type PageActionTypes = IChangePageAction;

// export type FormActionTypes =
//   | IChangeFormAction
//   | IAddFormAction
//   | IEditingFormAction
//   | ISavingFormAction;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
