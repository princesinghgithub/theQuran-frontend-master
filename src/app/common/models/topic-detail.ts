export interface TopicDetail {
  TopicCommentsId: number;
  TopicComments: [
    {
      AuthorId: number;
      Comment: string;
      LanguageId: number;
      ParentId: number;
      TopicCommentsId: number;
      createdAt: string;
      isDeleted: number;
      updatedAt: string;
    }
  ];
  TopicId: number;
  TopicImageName: string;
  TopicImageUrl: string;
  TopicNames: [
    {
      TopicNamesId: number;
      Name: string;
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
      ParentId: number;
      createdAt: string;
      isDeleted: number;
      updatedAt: string;
    }
  ];
  TopicNamesId: number;
  VerseTopics: [
    {
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
      TopicId: number;
      VerseId: number;
      VerseTopicId: number;
      Narrations: [
        {
          Narration: string;
          NarrationId: number;
          SooraId: number;
          TranslationId: number;
          Verse: number;
          NarrationImageId: number;
          AbrogatedVerses: [
            {
              AbrogatedSooraId: number;
              AbrogatedVerse: number;
              AbrogatedVerseId: number;
              Abrogations: [];
              createdAt: string;
              isDeleted: number;
              updatedAt: string;
            }
          ];
          Errors: [
            {
              ErrorCommentsId: number;
              ErrorDescription: string;
              ErrorId: number;
              ErrorReferencesId: number;
              LanguageId: number;
              NarrationId: number;
              ParentId: number;
              SooraId: number;
              Verse: number;
              createdAt: string;
              isDeleted: number;
              updatedAt: string;
            }
          ];
          RepetitionsSooraverses: [
            {
              Repetition: {
                LanguageId: number;
                ParentId: number;
                RepetitionAdminCommentsId: number;
                RepetitionId: number;
                RepetitionReferencesId: number;
                createdAt: string;
                isDeleted: number;
                updatedAt: string;
              };
              RepetitionId: number;
              RepetitionsSooraverseId: number;
              SooraId: number;
              Verse: number;
              createdAt: string;
              isDeleted: number;
              updatedAt: string;
            }
          ];
          Readings: [
            {
              DifferentReadings: [];
              NarrationId: number;
              Reading: string;
              ReadingSourceId: number;
              SooraId: number;
              TranslationId: number;
              Verse: number;
              createdAt: string;
              isDeleted: number;
              updatedAt: string;
            }
          ];
          VerseBackground: {
            SooraId: number;
            Verse: number;
            VersesBackgroundCommentsId: number;
            VersesBackgroundId: number;
            createdAt: string;
            isDeleted: number;
            updatedAt: string;
          };
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
  createdAt: string;
  isDeleted: number;
  updatedAt: string;
}
