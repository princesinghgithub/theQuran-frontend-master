export interface RepetitionsList {
  Repetition: {
    LanguageId: number;
    ParentId: number;
    RepetitionAdminCommentsId: string;
    RepetitionId: number;
    RepetitionReference: string;
    RepetitionReferencesId: number;
    createdAt: string;
    isDeleted: number;
    updatedAt: string;
  };
  RepeatedInVerese: [
    {
      RepetitionId: number;
      RepetitionsSooraverseId: number;
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
  ];
  RepetitionId: number;
  RepetitionsSooraverseId: number;
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
  Narration: {
    Narration: string;
    NarrationId: number;
    NarrationImageId: number;
    SooraId: number;
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
  Verse: number;
  createdAt: string;
  isDeleted: number;
  updatedAt: string;
}
