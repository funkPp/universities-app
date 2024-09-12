import {
  IUniversity,
  ILoadingAction,
  IResolveAction,
  IRejectAction,
  LOADING,
  RESOLVED,
  REJECTED,
  IChangePageAction,
  CHANGE_PAGE,
  IChangeFormAction,
  CHANGE_UNIVER,
  ADD_UNIVER,
  IAddFormAction,
	DEL_UNIVER,
	IDeleteFromAction
  // IStateForm,
} from "../types";

export function loadingAction(): ILoadingAction {
  return {
    type: LOADING,
  };
}

export function successfulAction(
  respond: IUniversity[]
): IResolveAction {
  return {
    type: RESOLVED,
    payload: respond,
  };
}

export function errorAction(error: string): IRejectAction {
  return {
    type: REJECTED,
    payload: error,
  };
}

export function changePageAction(index: number): IChangePageAction {
  return {
    type: CHANGE_PAGE,
    payload: index,
  };
}

export function changeFormAction(details: IUniversity ): IChangeFormAction {
  return {
    type: CHANGE_UNIVER,
    payload: details 
  }
}   

export function addFormAction(details: IUniversity ): IAddFormAction {
  return {
    type: ADD_UNIVER,
    payload: details 
  }
}   

export function deleteFormAction(id: string): IDeleteFromAction {
	return {
		type: DEL_UNIVER,
		payload: id
	}
}


