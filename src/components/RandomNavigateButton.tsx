"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import {
  ButtonPropType,
  ProfileFormDataType,
  FirstFormDataType,
  SecondFormDataType,
  ThirdFormDataType,
  AssessmentFormDataType,
} from "@/lib/formDataTypes";
import { validateForm } from "@/lib/validateForm";
import sendFormData from "@/lib/sendFormData";

export default function RandomNavigateButton(props: ButtonPropType) {
  //extract formData form props object
  const { grandParentPass, parentpass, nextNum, formData } = props;

  //check fail or not, init state
  const [isFail, setIsFail] = useState(false);
  const [isPending, setIsPending] = useState(false);

  //setting of router
  const router = useRouter();

  //navigate logics
  async function navigateToNextPage(
    //sessionID is passed as grand parent path
    parentpass: string,
    gameNum: number | undefined,
    grandParentPass?: string
  ) {
    let childpass = "";
    try {
      const response = await fetch("/api/path", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionID: grandParentPass }),
      });
      const res = await response.json();

      //choose which pass is used
      if (gameNum === 1) {
        childpass = res.paths.firstroute;
      } else if (gameNum === 2) {
        childpass = res.paths.secondroute;
      } else if (gameNum === 3) {
        childpass = res.paths.thirdroute;
      } else if (gameNum === 4) {
        childpass = parentpass;
      }
    } catch (e) {
      console.dir(e);
    }

    //if 3rd route is "skip", navigate to contentAssess page
    if (childpass === "assessment") {
      childpass = "contentAssess";
      // router.prefetch(`/${grandParentPass}/${childpass}`);
      router.push(`/${grandParentPass}/${childpass}`);
    } else if (childpass === "fin") {
      childpass = "debriefing";
      router.push(`/${grandParentPass}/${childpass}`);
    } else {
      // router.prefetch(`/${grandParentPass}/${parentpass}/${childpass}`);
      router.push(`/${grandParentPass}/${parentpass}/${childpass}`);
    }
  }

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsPending(true);
    setIsFail(false);

    //validate formdata
    const validateResult = validateForm(formData);
    //if result is false block going to the next page
    if (!validateResult) {
      setIsPending(false);
      setIsFail(true);
      return;
    }

    //add clicked time to passed form data
    if ("old" in formData) {
      (formData as ProfileFormDataType)["profileCreatedAt"] = new Date();
    } else if ("firstCondition" in formData) {
      (formData as FirstFormDataType)["firstGameCreatedAt"] = new Date();
    } else if ("secondCondition" in formData) {
      (formData as SecondFormDataType)["secondGameCreatedAt"] = new Date();
    } else if ("thirdCondition" in formData) {
      (formData as ThirdFormDataType)["thirdGameCreatedAt"] = new Date();
    } else if ("compAssessment" in formData) {
      (formData as AssessmentFormDataType)["assessmentCreatedAt"] = new Date();
    }

    //send formData to DB
    await sendFormData(formData);

    //navigate to next form
    navigateToNextPage(parentpass, nextNum, grandParentPass);
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="my-2 rounded-lg border border-solid border-gray-500 p-1.5 max-w-fit"
      >
        {props.buttonWord}
      </button>
      {isPending && <p className="text-sm">しばらくお待ちください...</p>}
      {isFail && (
        <p className="text-sm text-red-600">
          入力内容に誤りがあるようです。もう一度お試しください
        </p>
      )}
    </>
  );
}
