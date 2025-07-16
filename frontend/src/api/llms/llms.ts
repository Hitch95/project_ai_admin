import type { Llm, CreateLlmRequest, UpdateLlmRequest } from '@/utils/types/llm';

const API_BASE_URL = 'http://localhost:8080/api';

export const llmsApi = {
  async getLlms(): Promise<Llm[]> {
    const response = await fetch(`${API_BASE_URL}/llms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch LLMs');
    }

    const data = await response.json();
    return data.data || data;
  },

  async getLlm(id: number): Promise<Llm> {
    const response = await fetch(`${API_BASE_URL}/llms/${id}`, {
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
    const response = await fetch(`${API_BASE_URL}/llms`, {
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
    const response = await fetch(`${API_BASE_URL}/llms/${id}`, {
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
    const response = await fetch(`${API_BASE_URL}/llms/${id}`, {
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
