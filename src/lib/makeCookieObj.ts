export function makeCookieObj() {
  let cookieObj: any = {};
  if (typeof document !== "undefined") {
    const hasCookie = document.cookie;
    // console.log(hasCookie);
    const cookieArray = hasCookie.replaceAll(" ", "").split(";");
    // console.log(cookieArray);
    cookieArray.forEach((element) => {
      const [name, value] = element.split("=");
      cookieObj[name] = value;
    });
  }
//   console.log(cookieObj);
  return cookieObj;
}
