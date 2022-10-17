export interface RepetitionsDetail {
  mainVerse: {
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
  repetitionData: [
    {
      LanguageId: number;
      ParentId: number;
      RepetitionComment: string;
      RepetitionId: number;
      RepetitionReference: string;
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
      RepetitionsRepetitionType: {
        RepetitionCategories: [
          {
            LanguageId: number;
            ParentId: number;
            RepetitionCategory: string;
            RepetitionCategoryId: number;
            createdAt: string;
            isDeleted: number;
            updatedAt: string;
          }
        ];
        RepetitionCategoryId: number;
        RepetitionId: number;
        RepetitionTypeId: number;
        RepetitionTypes: [
          {
            LanguageId: number;
            ParentId: number;
            RepetitionType: string;
            RepetitionTypesId: number;
            createdAt: string;
            isDeleted: number;
            updatedAt: string;
          }
        ];
        RepetitionsRepetitionTypesId: number;
        createdAt: string;
        isDeleted: number;
        updatedAt: string;
      };
      RepetitionsSooraverses: [
        {
          RepetitionId: number;
          RepetitionsSooraverseId: number;
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
          Verse: number;
          createdAt: string;
          isDeleted: number;
          updatedAt: string;
        }
      ];
      createdAt: string;
      isDeleted: number;
      updatedAt: string;
    }
  ];
}
