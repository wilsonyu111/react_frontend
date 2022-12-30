export function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export function extractSessionCookie() {
  let token = "";
  let cookieList = document.cookie.split(";");
  if (cookieList !== undefined) {
    cookieList.forEach((coookie) => {
      if (coookie.indexOf("sessionID=") > -1) {
        token = coookie.substring(coookie.indexOf("sessionID=") + 10);
        return;
      }
    });
  }
  return token;
}

export default { extractSessionCookie, deleteAllCookies };
