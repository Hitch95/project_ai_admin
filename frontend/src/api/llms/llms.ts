import type {
  Llm,
  CreateLlmRequest,
  UpdateLlmRequest,
} from '@/utils/types/llm';

const backendUrl =
  import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000';

export const llmsApi = {
  async getLlms(): Promise<Llm[]> {
    const response = await fetch(`${backendUrl}/llm`, {
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

  async getLlm(id: number): Promise<Llm> {
    const response = await fetch(`${backendUrl}/llm/${id}`, {
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

  async createLlm(llmData: CreateLlmRequest): Promise<Llm> {
    const response = await fetch(`${backendUrl}/llm`, {
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

  async updateLlm(id: number, llmData: UpdateLlmRequest): Promise<Llm> {
    const response = await fetch(`${backendUrl}/llm/${id}`, {
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

  async deleteLlm(id: number): Promise<void> {
    const response = await fetch(`${backendUrl}/llm/${id}`, {
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
