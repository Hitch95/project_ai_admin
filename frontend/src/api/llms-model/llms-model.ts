import type {
  LlmModel,
  CreateLlmModelRequest,
  UpdateLlmModelRequest,
} from '@/utils/types/llm-model';

const API_BASE_URL = 'http://localhost:3000';

export const llmModelsApi = {
  async getLlmModels(): Promise<LlmModel[]> {
    const response = await fetch(`${API_BASE_URL}/llm-model`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[llmsApi.getLlms] Error response:', errorText);
      throw new Error('Failed to fetch LLMs');
    }
    const llms = await response.json();
    return llms;
  },

  async getLlmModelById(id: number): Promise<LlmModel> {
    const response = await fetch(`${API_BASE_URL}/llm-model/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch LLM');
    }

    const data = await response.json();
    return data.data || data;
  },

  async createLlmModel(llmData: CreateLlmModelRequest): Promise<LlmModel> {
    const response = await fetch(`${API_BASE_URL}/llm-model`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(llmData),
    });

    if (!response.ok) {
      throw new Error('Failed to create LLM');
    }

    const data = await response.json();
    return data.data || data;
  },

  async updateLlmModel(
    id: number,
    llmData: UpdateLlmModelRequest
  ): Promise<LlmModel> {
    const response = await fetch(`${API_BASE_URL}/llm-model/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(llmData),
    });

    if (!response.ok) {
      throw new Error('Failed to update LLM');
    }

    const data = await response.json();
    return data.data || data;
  },

  async deleteLlmModel(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/llm-model/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete LLM');
    }
  },
};
