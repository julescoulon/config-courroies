function setCookie(name, data) {
  data = JSON.stringify(data);
  window.localStorage.setItem(`${name}`, data);
}

function getCookie(name) {
  let cookie = JSON.parse(window.localStorage.getItem(name));
  while (
    typeof cookie === "string" &&
    cookie[0] == "[" &&
    cookie[cookie.length - 1] == "]"
  ) {
    cookie = JSON.parse(cookie);
  }
  return cookie;
}

function wipeAllCookies() {
  localStorage.clear();
}

export { setCookie, getCookie, wipeAllCookies };
