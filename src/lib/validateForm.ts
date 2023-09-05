import {
  ProfileFormDataType,
  FirstFormDataType,
  SecondFormDataType,
} from "./formDataTypes";

export function validateForm(
  formData: FirstFormDataType | SecondFormDataType | ProfileFormDataType
) {
  //store the result of validation
  let validationResult: boolean;

  if (formData.hasOwnProperty("old")) {
    validationResult = validateProfileForm(formData as ProfileFormDataType);
  } else if (formData.hasOwnProperty("firstGame")) {
    validationResult = validateFirstForm(formData as FirstFormDataType);
  } else {
    validationResult = validateSecondForm(formData as SecondFormDataType);
  }

  console.log(formData);
  if (!validationResult) {
    window.alert("hi!");
  }
  return validationResult;
}

export function validateProfileForm(profileForm: ProfileFormDataType) {
  //   console.log(profileForm);
  const { sessionID, old, occupation } = profileForm;

  //validation of year
  if (old === null) {
    return false;
  } else if (old < 18 || old > 100) {
    return false;
  } else {
    return true;
  }
}

export function validateFirstForm(firstForm: FirstFormDataType) {
  const { offer } = firstForm;

  //validation of offer
  if (offer === null) {
    return false;
  } else {
    return true;
  }
}

export function validateSecondForm(secondForm: SecondFormDataType) {
  const { distribution } = secondForm;

  //validation of distribution
  if (distribution === null) {
    return false;
  } else if (distribution > 1000 || distribution < 0) {
    return false;
  } else {
    return true;
  }
}
