export interface Language {
  Language: string;
  LanguageCode: string;
  LanguageId: number;
  Translations: [
    {
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
    }
  ];
  RTL: number;
  createdAt: string;
  isDeleted: number;
  updatedAt: string;
}
