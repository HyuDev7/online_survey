export default async function findOrder(id: string) {
  let assessOrder: any;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_Url}/api/findorder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      }
    );

    if (!response.ok) {
      const message = `an error occurred : ${response.statusText}`;
      // window.alert(message);
      return;
    }

    const res = await response.json();
    assessOrder = res.assessCond;
    // console.log(assessOrder);
  } catch (e) {
    console.dir(e);
  }

  return assessOrder;
}
