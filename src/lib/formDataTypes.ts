export interface ButtonPropType {
  buttonWord: string;
  grandParentPass?: string;
  parentpass: string;
  childpass1: string;
  childpass2: string;
  formData: FirstFormDataType | SecondFormDataType | ProfileFormDataType;
  //for checking whether number is enterd in second form
  // isEntered?: number | string | null;
}

export interface FirstFormDataType {
  sessionID: string;
  firstGame: string;
  offer: string | null;
}

export interface SecondFormDataType {
  sessionID: string;
  secondGame: string;
  distribution: number | null;
}

export interface UserIdType {
  passCode: string;
}

export interface ProfileFormDataType {
  sessionID: string;
  old: number | null;
  occupation: string | null;
}
