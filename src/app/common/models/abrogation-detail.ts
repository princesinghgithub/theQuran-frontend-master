export interface AbrogationDetail {
  AbrogatedSooraId: number;
  AbrogatedVerse: number;
  AbrogatedVerseId: number;
  Abrogations: [
    {
      AbrogatedVerseId: number;
      AbrogatingVerse: {
        AbrogatingSooraId: number;
        AbrogatingVerse: number;
        AbrogatingVerseId: number;
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
        createdAt: string;
        isDeleted: number;
        updatedAt: string;
      };
      AbrogationOthers: [
        {
          AbrogationOtherId: number;
          LanguageId: number;
          Name: string;
          ParentId: number;
          createdAt: string;
          isDeleted: number;
          updatedAt: string;
        }
      ];
      AbrogationOtherId: number;
      AbrogatingVerseId: number;
      AbrogationAuthor: {
        AbrogationAuthorId: number;
        AbrogationsId: number;
        Author: {
          AuthorId: number;
          ParentId: number;
          LanguageId: number;
          AuthorName: string;
          Description: string;
          About: string;
          createdAt: string;
          isDeleted: number;
          updatedAt: string;
        };
        AuthorId: number;
        createdAt: string;
        isDeleted: number;
        updatedAt: string;
      };
      AbrogationComments: [
        {
          AbrogationCommentsId: number;
          Comment: string;
          LanguageId: number;
          ParentId: number;
          createdAt: string;
          isDeleted: number;
          updatedAt: string;
        }
      ];
      AbrogationCommentsId: number;
      AbrogationReference: {
        AbrogationReferenceId: number;
        AbrogationsId: number;
        References: [
          {
            Description: string;
            LanguageId: number;
            ParentId: number;
            ReferenceId: number;
            ReferenceName: string;
            createdAt: string;
            isDeleted: number;
            updatedAt: string;
          }
        ];
        ReferenceId: number;
        createdAt: string;
        isDeleted: number;
        updatedAt: string;
      };
      AbrogationsId: number;
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
  ];
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
  createdAt: string;
  isDeleted: number;
  updatedAt: string;
}
