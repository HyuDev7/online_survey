export default async function findSecondReaction(sessionId: string) {
    let thirdGame: any;
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_Url}/api/findthirdreaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sessionId),
          cache: "no-store",
        }
      );
  
      if (!response.ok) {
        const message = `an error occurred : ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const res = await response.json();
      thirdGame = res.thirdGame;
      
    } catch (e) {
      console.dir(e);
    }
    return thirdGame;
  }
  