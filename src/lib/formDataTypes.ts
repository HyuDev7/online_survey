export interface ButtonPropType {
  buttonWord: string;
  nextNum?: number;
  grandParentPass?: string;
  parentpass: string;
  formData:
    | FirstFormDataType
    | SecondFormDataType
    | ThirdFormDataType
    | ProfileFormDataType
    | AssessmentFormDataType;
}

export interface FirstFormDataType {
  sessionID: string;
  firstCondition: string;
  offer: string | null;
  assessment: string | null;
  firstGameCreatedAt: Date | null;
}

export interface SecondFormDataType {
  sessionID: string;
  secondGameType: string;
  secondCondition: string;
  secondDistribution: string | null;
  secondGameCreatedAt: Date | null;
}

export interface ThirdFormDataType {
  sessionID: string;
  thirdGameType: string;
  thirdCondition: string;
  thirdDistribution: string | null;
  thirdGameCreatedAt: Date | null;
}

export interface AssessmentFormDataType {
  sessionID: string;
  compAssessment: string | null;
  assessmentCreatedAt: Date | null;
}

export interface UserIdType {
  passCode: string;
}

export interface ProfileFormDataType {
  sessionID: string;
  old: string | null;
  sex: string;
  profileCreatedAt: Date | null;
}

export interface AgreementFormDataType {
  sessionID: string;
  firstAgreement: string;
  secondAgreement: string;
  example: string;
  firstCreatedAt: Date | null;
  secondCreatedAt: Date | null;
}
