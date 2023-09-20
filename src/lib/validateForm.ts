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
  //convert string distribution into number one
  const numDistri=Number(distribution)

  //variable for storing validation result
  let valiRes = false;

  //validation of distribution
  if (numDistri === null) {
    valiRes = false;
  } else if (numDistri > 1000 || numDistri < 0) {
    valiRes = false;
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
