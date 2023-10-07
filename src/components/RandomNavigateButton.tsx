"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { ButtonPropType } from "@/lib/formDataTypes";
import { validateForm } from "@/lib/validateForm";
import sendFormData from "@/lib/sendFormData";
import selectChildPass from "@/lib/selectChildPass";

export default function RandomNavigateButton(
  props: ButtonPropType
): JSX.Element {
  //extract formData form props object
  const { grandParentPass, parentpass, childpass1, childpass2, formData } =
    props;

  //select next child pass
  const childpass = selectChildPass(childpass1, childpass2);

  //check fail or not, init state
  const [isFail, setIsFail] = useState(false);
  const [isPending, setIsPending] = useState(false);

  //setting of router
  const router = useRouter();
  //navigate logic
  function navigateToNextPage(
    parentpass: string,
    childpass: string,
    grandParentPass?: string
  ) {
    //navigate to next page
    if (grandParentPass) {
      router.prefetch(`/${grandParentPass}/${parentpass}/${childpass}`);
      router.push(`/${grandParentPass}/${parentpass}/${childpass}`);
    } else {
      router.prefetch(`/${parentpass}/${childpass}`);
      router.push(`/${parentpass}/${childpass}`);
    }
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
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

    //send formData to DB
    const res = sendFormData(formData);

    //navigate to next form
    navigateToNextPage(parentpass, childpass, grandParentPass);
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
