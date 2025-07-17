export interface LlmModel {
  id: number;
  llm_id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface CreateLlmModelRequest {
  name: string;
  slug: string;
}

export interface UpdateLlmModelRequest {
  name?: string;
  slug?: string;
}
