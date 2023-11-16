export interface ButtonPropType {
  buttonWord: string;
  nextNum?:number;
  grandParentPass?: string;
  parentpass: string;
  formData:
    | FirstFormDataType
    | SecondFormDataType
    | ThirdFormDataType
    | ProfileFormDataType;
}

export interface FirstFormDataType {
  sessionID: string;
  firstGame: string;
  offer: string | null;
  assessment: string | null;
}

export interface SecondFormDataType {
  sessionID: string;
  secondGameType: string;
  secondCondition: string;
  secondDistribution: string | null;
}

export interface ThirdFormDataType {
  sessionID: string;
  thirdGameType: string;
  thirdCondition: string;
  thirdDistribution: string | null;
}

export interface UserIdType {
  passCode: string;
}

export interface ProfileFormDataType {
  sessionID: string;
  old: string | null;
  sex: string;
}

export interface AgreementFormDataType {
  sessionID: string;
  firstAgreement: string;
  secondAgreement: string;
  example: string;
}
