"use client";
import { useEffect } from "react";

export function useLeavePageConfirmation(sessionID: string, loc: string) {
  useEffect(() => {
    window.addEventListener("visibilitychange", (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      fetch("/api/sendClose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: sessionID, location: loc }),
      });

      // try {
      // const response = await fetch("/api/sendClose", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ id: sessionID, location: loc }),
      // });

      //   if (!response.ok) {
      //     const message = `an error occurred : ${response.statusText}`;

      //     return;
      //   }
      // } catch (e) {
      //   console.dir;
      // }
      return;
    });
  },[]);
}
