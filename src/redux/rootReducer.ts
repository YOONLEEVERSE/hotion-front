import { Action, Reducer, Store } from "redux";
import {
  TOGGLESIDEBAR,
  LOGIN,
  LOGOFF,
  MEMBERSHIP,
  CREATEPAGE,
  CREATEWORKSPACE,
} from "./ActionDeclare";

type PAGEID = number;
type WORKSPACEID = number;
type StoreValue = {
  sideNavOn: boolean;
  isLogin?: boolean;
  username: string | null;
  membership: string | null;
  selectedPage: PAGEID;
  currentWorkspace: WORKSPACEID;
  pageInfo: { [name: number]: string[] };
};

export const rootReducer: Reducer<StoreValue> = (
  state = {
    sideNavOn: false,
    isLogin: false,
    username: null,
    membership: null,
    selectedPage: 1,
    currentWorkspace: 1,
    pageInfo: {
      0: [JSON.stringify({ type: "paragraph", children: [{ text: "" }] })],
      5: [
        JSON.stringify({
          type: "paragraph",
          children: [{ text: "하이입니둥~" }],
        }),
      ],
      1: [
        JSON.stringify({
          type: "paragraph",
          children: [{ text: "TEST1" }],
        }),
        JSON.stringify({
          type: "paragraph",
          children: [{ text: "TESTline2" }],
        }),
      ],
      2: [
        JSON.stringify({
          type: "paragraph",
          children: [{ text: "TEST2" }],
        }),
      ],
      3: [
        JSON.stringify({
          type: "paragraph",
          children: [{ text: "TEST3" }],
        }),
      ],
      4: [
        JSON.stringify({
          type: "paragraph",
          children: [{ text: "TEST4" }],
        }),
      ],
    },
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
    case CREATEPAGE:
      return {
        ...state,
        pageInfo: {
          ...state.pageInfo,
          [action.payload.pageId]: action.payload.content,
        },
      };
    case CREATEWORKSPACE:
    default:
      return state;
  }
};

// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = StoreValue;
