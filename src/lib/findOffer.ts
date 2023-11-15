export default async function findOffer(id: string) {
  let firstOffer: any;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_Url}/api/findoffer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });

    if (!response.ok) {
      const message = `an error occurred : ${response.statusText}`;
      window.alert(message);
      return;
    }

    const res = await response.json();
    firstOffer = res.firstroute;

  } catch (e) {
    console.dir(e);
  }

  return firstOffer;
}
