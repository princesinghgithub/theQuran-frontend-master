export interface QuranDetail {
  AbrogatedVerses: [];
  Errors: [];
  Narration: string;
  NarrationId: number;
  NarrationImageId: number;
  RepetitionsSooraverses: [];
  Readings: [];
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
  VerseBackground: {
    SooraId: number;
    Verse: number;
    VersesBackgroundCommentsId: number;
    VersesBackgroundId: number;
    createdAt: string;
    isDeleted: number;
    updatedAt: string;
  };
  TranslationId: number;
  Verse: number;
  createdAt: string;
  isDeleted: number;
  updatedAt: string;
}
