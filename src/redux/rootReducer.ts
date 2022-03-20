import { Action, Reducer } from "redux";
import { TOGGLESIDEBAR, LOGIN, LOGOFF, MEMBERSHIP } from "./ActionDeclare";

type StoreValue = {
  sideNavOn: boolean;
  isLogin?: boolean;
  username: string | null;
  membership: string | null;
};

export const rootReducer: Reducer<StoreValue> = (
  state = {
    sideNavOn: false,
    isLogin: false,
    username: null,
    membership: null,
  },
  action: any
) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload, isLogin: true };
    case LOGOFF:
      return { ...state, isLogin: false, username: null, membership: null };
    case MEMBERSHIP:
      return { ...state, membership: action.payload.membership };
    case TOGGLESIDEBAR:
      return { ...state, sideNavOn: !state.sideNavOn };
    default:
      return state;
  }
};

export type RootState = ReturnType<typeof rootReducer>;
