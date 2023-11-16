export default async function findSecondReaction(sessionId: string) {
    let firstGame: any;
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_Url}/api/findsecondreaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sessionId),
        }
      );
  
      if (!response.ok) {
        const message = `an error occurred : ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const res = await response.json();
      // console.log(res.firstCond)
      firstGame = res.secondGame;
    } catch (e) {
      console.dir(e);
    }
    return firstGame;
  }
  