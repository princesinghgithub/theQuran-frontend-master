export interface ErrorDetail {
  Authors: [
    {
      Comment: {
        ErrorAdminCommentsId: number;
        Comment: string;
        LanguageId: number;
        ParentId: number;
        createdAt: string;
        isDeleted: number;
        updatedAt: string;
      };
      Description: string;
      Email: string;
      FirstName: string;
      Id: number;
      LastName: string;
      ProfilePicture: string;
      Reference: {
        Description: string;
        ErrorReferencesId: number;
        LanguageId: number;
        ParentId: number;
        ReferenceName: string;
        createdAt: string;
        isDeleted: number;
        updatedAt: string;
      };
      UserId: string;
      WebLink: string;
      isActivated: number;
      isDeleted: number;
    }
  ];
  ErrorCommentsId: number;
  ErrorAdminComments: [
    {
      Comment: string;
      ErrorAdminCommentsId: number;
      LanguageId: number;
      ParentId: number;
      createdAt: string;
      isDeleted: number;
      updatedAt: string;
    }
  ];
  ErrorDescription: string;
  ErrorId: number;
  ErrorReferencesId: number;
  ErrorReferences: [
    {
      Description: string;
      ErrorReferencesId: number;
      LanguageId: number;
      ParentId: number;
      ReferenceName: string;
      createdAt: string;
      isDeleted: number;
      updatedAt: string;
    }
  ];
  ErrorsErrorTypes: [
    {
      ErrorId: number;
      ErrorTypeId: number;
      ErrorTypes: [
        {
          ErrorType: string;
          ErrorTypeId: number;
          LanguageId: number;
          ParentId: number;
          createdAt: string;
          isDeleted: number;
          updatedAt: string;
        }
      ];
      ErrorsErrorTypesId: number;
      createdAt: string;
      isDeleted: number;
      updatedAt: string;
    }
  ];
  LanguageId: number;
  NarrationId: number;
  Narration: {
    Narration: string;
    NarrationId: number;
    NarrationImageId: number;
    SooraId: number;
    Translation: {
      Description: string;
      Display: number;
      LanguageId: number;
      Language: {
        Language: string;
        LanguageCode: string;
        LanguageId: number;
        RTL: number;
        createdAt: string;
        isDeleted: number;
        updatedAt: string;
      };
      NarrationTypeId: number;
      Searchable: number;
      Translation: string;
      TranslationId: number;
      createdAt: string;
      isDeleted: number;
      updatedAt: string;
    };
    TranslationId: number;
    Verse: number;
    createdAt: string;
    isDeleted: number;
    updatedAt: string;
  };
  ParentId: number;
  Soora: {
    ArabicEnglishName: string;
    SooraId: number;
    SooraName: string;
    StartPage: number;
    VerseCount: number;
    createdAt: string;
    isDeleted: number;
    updatedAt: string;
  };
  SooraId: number;
  Verse: number;
  createdAt: string;
  isDeleted: number;
  updatedAt: string;
}
