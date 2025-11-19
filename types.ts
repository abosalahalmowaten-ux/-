export enum Tone {
  MEDIA = 'إعلامي (Journalistic)',
  HUMAN = 'بشري وتلقائي (Human-like)',
  SIMPLE = 'بسيط وسهل (Simple)',
  PROFESSIONAL = 'احترافي ورسمي (Professional)',
}

export interface ArticleData {
  analysis: string[];
  suggestedTitles: string[];
  articleBody: string;
  metaDescription: string;
  keywords: string[];
}

export interface GenerationRequest {
  topic: string;
  tone: Tone;
}
