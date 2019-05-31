import ls from "localstorage-ttl";

export function setToken (token) {
  if (token) {
    ls.set("token", token);
  } else {
    localstorage.remove("token");
  }
}

export function getToken () {
  return ls.get("token");
}

export function getValidUserInfo () {
  return ls.get("user");
}

export function setValidUserInfo (user) {
  if (user) {
    ls.set("LogInUser", user.name);
    ls.set("isUserLoggedIn", true);
    ls.set("token", user.token);
    ls.set("user", user);
  } else {
    clearStorage()
  }
}

export function isUserLoggedIn () {
  if (ls.get("token")) {
    return true;
  } else {
    return false;
  }
}

export function clearStorage () {
  localstorage.remove("LogInUser");
  localstorage.remove("isUserLoggedIn");
  localstorage.remove("token");
  localstorage.remove("user");
}
