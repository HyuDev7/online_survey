export interface ButtonPropType {
  buttonWord: string;
  grandParentPass?: string;
  parentpass: string;
  childpass1: string;
  childpass2: string;
  childpass3?:string;
  formData: FirstFormDataType | SecondFormDataType | ProfileFormDataType;
  //for checking whether number is enterd in second form
}

export interface FirstFormDataType {
  sessionID: string;
  firstGame: string;
  offer: string | null;
  assessment:string|null;
}

export interface SecondFormDataType {
  sessionID: string;
  secondGame: string;
  distribution: string | null;
}

export interface UserIdType {
  passCode: string;
}

export interface ProfileFormDataType {
  sessionID: string;
  old: number | null;
  sex: string;
  pref: string | null;
}

export interface AgreementFormDataType {
  sessionID: string;
  firstAgreement: string;
  secondAgreement: string;
  example:string;
}
