export interface ErrorList {
  ErrorCommentsId: number;
  ErrorDescription: string;
  ErrorId: number;
  ErrorReferencesId: number;
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
