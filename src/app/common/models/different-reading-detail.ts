export interface DifferentReadingDetail {
  DifferentReadings: [
    {
      DifferentReadingComments: [
        {
          Comment: string;
          DifferentReadingCommentsId: number;
          LanguageId: number;
          ParentId: number;
          createdAt: string;
          isDeleted: number;
          updatedAt: string;
        }
      ];
      DifferentReadingCommentsId: number;
      DifferentReadingId: number;
      DifferentReadingReferenceId: number;
      DifferentReadingReferences: [
        {
          Description: string;
          DifferentReadingReferenceId: number;
          LanguageId: number;
          ParentId: number;
          ReferenceName: string;
          createdAt: string;
          isDeleted: number;
          updatedAt: string;
        }
      ];
      Authors: [
        {
          Comment: {
            DifferentReadingCommentsId: number;
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
            DifferentReadingReferenceId: number;
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
      ReadingCompare: {
        NarrationId: number;
        Narration: {
          Narration: string;
          NarrationId: number;
          NarrationImageId: number;
          SooraId: number;
          TranslationId: number;
          Verse: number;
          createdAt: string;
          isDeleted: number;
          updatedAt: string;
        };
        Reading: string;
        ReadingCompareId: number;
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
        TranslationId: number;
        Translation: {
          Description: string;
          Display: number;
          LanguageId: number;
          NarrationTypeId: number;
          Searchable: number;
          Translation: string;
          TranslationId: number;
          createdAt: string;
          isDeleted: number;
          updatedAt: string;
        };
        Verse: number;
        createdAt: string;
        isDeleted: number;
        updatedAt: string;
      };
      ReadingCompareId: number;
      ReadingSourceId: number;
      createdAt: string;
      isDeleted: number;
      updatedAt: string;
    }
  ];
  NarrationId: number;
  mainNarration: {
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
  Reading: string;
  ReadingSourceId: number;
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
  TranslationId: number;
  Verse: number;
  createdAt: string;
  isDeleted: number;
  updatedAt: string;
}
