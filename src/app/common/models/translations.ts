export interface Translation {
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
}
