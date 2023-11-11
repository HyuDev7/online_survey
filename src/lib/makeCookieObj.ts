export function makeCookieObj() {
  let cookieObj: any = {};
  if (typeof document !== "undefined") {
    const hasCookie = document.cookie;
    const cookieArray = hasCookie.replaceAll(" ", "").split(";");
    cookieArray.forEach((element) => {
      const [name, value] = element.split("=");
      cookieObj[name] = value;
    });
  }
  return cookieObj;
}
