export interface Llm {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface CreateLlmRequest {
  name: string;
  slug: string;
}

export interface UpdateLlmRequest {
  name?: string;
  slug?: string;
}
