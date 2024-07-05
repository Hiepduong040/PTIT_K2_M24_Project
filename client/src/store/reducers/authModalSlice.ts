// reducers/authModalSlice.js
// slices/authModalSlice.js
export interface AuthModalState {
    open: boolean;
    view: "login" | "signup" | "resetPassword";
  }
  
  interface AuthModalAction {
    type: string;
    payload?: any;
  }
  
  const initialState: AuthModalState = {
    open: false,
    view: "login",
  };
  
  export const authModalReducer = (state: AuthModalState = initialState, action: AuthModalAction): AuthModalState => {
    switch (action.type) {
      case 'OPEN_MODAL':
        return {
          ...state,
          open: true,
          view: action.payload,
        };
      case 'CLOSE_MODAL':
        return {
          ...state,
          open: false,
        };
      case 'SET_VIEW':
        return {
          ...state,
          view: action.payload,
        };
      default:
        return state;
    }
  };
  
  // Action creators
  export const openModal = (view: "login" | "signup" | "resetPassword") => ({
    type: 'OPEN_MODAL',
    payload: view,
  });
  
  export const closeModal = () => ({
    type: 'CLOSE_MODAL',
  });
  
  export const setView = (view: "login" | "signup" | "resetPassword") => ({
    type: 'SET_VIEW',
    payload: view,
  });
  