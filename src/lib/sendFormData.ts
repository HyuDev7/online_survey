import {
  FirstFormDataType,
  SecondFormDataType,
  ProfileFormDataType,
  ThirdFormDataType,
  AssessmentFormDataType,
} from "./formDataTypes";

export default async function sendFormData(
  formData:
    | ProfileFormDataType
    | FirstFormDataType
    | SecondFormDataType
    | ThirdFormDataType
    | AssessmentFormDataType
    | undefined
) {
  try {
    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const message = `an error occurred : ${response.statusText}`;
      window.alert(message);
      return;
    }

    return response.json();
  } catch (e) {
    console.log(e);
  }
}
