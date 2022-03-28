import {
  LOGOFF,
  LOGIN,
  TOGGLESIDEBAR,
  MEMBERSHIP,
  CREATEPAGE,
  CREATEWORKSPACE,
  DELETEPAGE,
  DELETEWORKSPACE,
} from "./ActionDeclare";

type USERINFO = {
  username: string;
};
type MEMBERSHIPTYPE = {
  membership: string;
};

type PAGEINFO = {
  title: string;
  content: string;
  level?: number;
  parentId?: number;
  pageId?: number;
};

type WORKSPACEINFO = {
  title: string;
  isTeam: boolean;
  workspaceId: number;
};

export function login({ username }: USERINFO) {
  const payload = {
    username,
  };
  return {
    type: LOGIN,
    payload,
  };
}

export function logoff() {
  return {
    type: LOGOFF,
  };
}

export function setmembership({ membership }: MEMBERSHIPTYPE) {
  return {
    type: MEMBERSHIP,
    payload: membership,
  };
}

export function createpage(page: PAGEINFO) {
  return {
    type: CREATEPAGE,
    payload: page,
  };
}
export function createWorkspace(workspacedata: WORKSPACEINFO) {
  return {
    type: CREATEWORKSPACE,
    payload: workspacedata,
  };
}
export function deletepage(
  page: Pick<PAGEINFO, "parentId" | "title" | "pageId">
) {
  return {
    type: DELETEPAGE,
    payload: page,
  };
}
export function deleteworkspace(
  workspacedata: Pick<WORKSPACEINFO, "title" | "workspaceId">
) {
  return {
    type: DELETEWORKSPACE,
    payload: workspacedata,
  };
}
