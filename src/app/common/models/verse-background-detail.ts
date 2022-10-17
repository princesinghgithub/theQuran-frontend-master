export interface VerseBackgroundDetail {
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
  VersesBackgroundCommentsId: number;
  VersesBackgroundId: number;
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
  Authors: [
    {
      Comment: {
        AbrogationCommentsId: number;
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
        LanguageId: number;
        ParentId: number;
        ReferenceId: number;
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
  createdAt: string;
  isDeleted: number;
  updatedAt: string;
}
