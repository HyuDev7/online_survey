import {
  ProfileFormDataType,
  FirstFormDataType,
  SecondFormDataType,
} from "./formDataTypes";

export function validateForm(
  formData: FirstFormDataType | SecondFormDataType | ProfileFormDataType
) {
  //store the result of validation
  let validationResult = false;

  if (formData.hasOwnProperty("old")) {
    validationResult = validateProfileForm(formData as ProfileFormDataType);
  } else if (formData.hasOwnProperty("firstGame")) {
    validationResult = validateFirstForm(formData as FirstFormDataType);
  } else if (formData.hasOwnProperty("distribution")) {
    validationResult = validateSecondForm(formData as SecondFormDataType);
  }

  return validationResult;
}

export function validateProfileForm(profileForm: ProfileFormDataType) {
  const { sessionID, old, sex, pref } = profileForm;

  //validation of prefecture
  if (pref === "") {
    return false;
  }

  //validation of sex
  if (sex === "") {
    return false;
  }

  const numOld = Number(old);

  //validation of old
  if (old === null) {
    return false;
  } else if (numOld < 18 || numOld > 100) {
    return false;
  } else {
    return true;
  }
}

export function validateFirstForm(firstForm: FirstFormDataType) {
  const { offer, assessment } = firstForm;
  let res = false;
  //validation of offer
  if (offer === null) {
    return(res = false);
  } else {
    res = true;
  }

  //validation of assessment
  if (assessment === null) {
    return(res= false);
  } else {
    res= true;
  }
  return res;

}

export function validateSecondForm(secondForm: SecondFormDataType) {
  const { distribution } = secondForm;
  //variable for storing validation result
  let valiRes = false;

  //validation of null
  if (distribution === null || distribution.length === 0) {
    return (valiRes = false);
  }

  //convert string distribution into number one
  const numDistri = Number(distribution);
  //validation of over or under input
  if (numDistri > 1000 || numDistri < 0) {
    return (valiRes = false);
  } else {
    valiRes = true;
  }
  //validation of integer
  if (Number.isInteger(numDistri)) {
    valiRes = true;
  } else {
    valiRes = false;
  }

  return valiRes;
}
