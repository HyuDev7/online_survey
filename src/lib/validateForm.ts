import {
  ProfileFormDataType,
  FirstFormDataType,
  SecondFormDataType,
  ThirdFormDataType,
  AssessmentFormDataType,
} from "./formDataTypes";

export function validateForm(
  formData:
    | FirstFormDataType
    | SecondFormDataType
    | ThirdFormDataType
    | ProfileFormDataType
    | AssessmentFormDataType
) {
  //store the result of validation
  let validationResult = false;

  if (formData.hasOwnProperty("old")) {
    validationResult = validateProfileForm(formData as ProfileFormDataType);
  } else if (formData.hasOwnProperty("firstGame")) {
    validationResult = validateFirstForm(formData as FirstFormDataType);
  } else if (formData.hasOwnProperty("secondDistribution")) {
    validationResult = validateSecondForm(formData as SecondFormDataType);
  } else if (formData.hasOwnProperty("thirdDistribution")) {
    validationResult = validateThirdForm(formData as ThirdFormDataType);
  } else if (formData.hasOwnProperty("compAssessment")) {
    validationResult = validateAssessForm(formData as AssessmentFormDataType);
  }

  return validationResult;
}

export function validateProfileForm(profileForm: ProfileFormDataType) {
  const { old, sex } = profileForm;

  //validation of sex
  if (sex === "") {
    return false;
  }

  //storing a result of validation
  let valiRes: boolean;

  //convert string old into number old
  const numOld = Number(old);

  //validation of old
  if (old === null || old.length === 0) {
    return (valiRes = false);
  }

  //validation of over or under input
  if (numOld < 18 || numOld > 100) {
    return (valiRes = false);
  } else {
    valiRes = true;
  }

  //validation of integer
  if (Number.isInteger(numOld)) {
    valiRes = true;
  } else {
    valiRes = false;
  }

  return valiRes;
}

export function validateFirstForm(firstForm: FirstFormDataType) {
  const { offer, assessment } = firstForm;
  let res = false;
  //validation of offer
  if (offer === null) {
    return (res = false);
  } else {
    res = true;
  }

  //validation of assessment
  if (assessment === null) {
    return (res = false);
  } else {
    res = true;
  }
  return res;
}

export function validateSecondForm(secondForm: SecondFormDataType) {
  const { secondDistribution } = secondForm;
  //variable for storing validation result
  let valiRes = false;

  //validation of null
  if (secondDistribution === null || secondDistribution.length === 0) {
    return (valiRes = false);
  }

  //convert string distribution into number one
  const numDistri = Number(secondDistribution);

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

export function validateThirdForm(secondForm: ThirdFormDataType) {
  const { thirdDistribution } = secondForm;
  //variable for storing validation result
  let valiRes = false;

  //validation of null
  if (thirdDistribution === null || thirdDistribution.length === 0) {
    return (valiRes = false);
  }

  //convert string distribution into number one
  const numDistri = Number(thirdDistribution);
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

export function validateAssessForm(assessForm: AssessmentFormDataType) {
  const { compAssessment } = assessForm;
  let res = false;

  //validation of assessment
  if (compAssessment === null) {
    return (res = false);
  } else {
    res = true;
  }
  return res;
}
