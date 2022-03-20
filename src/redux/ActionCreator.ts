import { LOGOFF, LOGIN, TOGGLESIDEBAR, MEMBERSHIP } from "./ActionDeclare";

type USERINFO = {
  username: string;
  password: string;
};
type MEMBERSHIP = {
  membership: string;
};

export function login({ username, password }: USERINFO) {
  const payload = {
    username,
    password,
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

export function setmembership({ membership }: MEMBERSHIP) {
  return {
    type: MEMBERSHIP,
    payload: membership,
  };
}
