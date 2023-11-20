export async function validateSessionID(sessionID: string) {

  // console.log(process.env.NEXT_PUBLIC_Url);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_Url}/api/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionID),
      cache: "no-store",
    });

    if (!response.ok) {
      const message = `here is validateSessionID.ts. an error occurred : ${response.statusText}`;
      // window.alert(message);
      return;
    }

    const validationRes = await response.json();

    return validationRes.isAuthorised;
  } catch (e) {
    console.log(e);
  }
}
