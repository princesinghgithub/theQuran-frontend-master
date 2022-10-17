export interface TopicsList {
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
  Topic: {
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
    TopicImageName: string;
    TopicImageUrl: string;
    TopicCommentsId: number;
    TopicId: number;
    TopicNamesId: number;
    createdAt: string;
    isDeleted: number;
    updatedAt: string;
  };
  TopicId: number;
  TopicVerese: [
    {
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
      TopicId: number;
      VerseId: number;
      VerseTopicId: number;
      createdAt: string;
      isDeleted: number;
      updatedAt: string;
    }
  ];
  VerseId: number;
  VerseTopicId: number;
  createdAt: string;
  isDeleted: number;
  updatedAt: string;
}
