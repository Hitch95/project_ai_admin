import db from '../models/index.js';

const { Llm } = db;

interface CreateLlmData {
  name: string;
  slug: string;
  description?: string;
  is_active?: boolean;
  api_base_url?: string;
  api_key?: string;
  created_by?: number;
}

interface UpdateLlmData {
  name?: string;
  slug?: string;
  description?: string;
  is_active?: boolean;
  api_base_url?: string;
  api_key?: string;
}

class LlmService {
  static async createLlm(data: CreateLlmData) {
    const {
      name,
      slug,
      description,
      is_active = true,
      api_base_url,
      api_key,
      created_by,
    } = data;

    // Vérifier si le slug existe déjà
    const existingLlm = await Llm.findOne({ where: { slug } });
    if (existingLlm) {
      throw new Error('Slug already exists');
    }

    const llm = await Llm.create({
      name,
      slug,
      description,
      is_active,
      api_base_url,
      api_key,
      created_by,
    });

    return llm;
  }

  static async getLlmById(id: string) {
    const llm = await Llm.findByPk(id);

    if (!llm) {
      throw new Error('LLM not found');
    }

    return llm;
  }

  static async getAllLlms() {
    return await Llm.findAll();
  }

  static async updateLlm(id: string, data: UpdateLlmData) {
    const llm = await Llm.findByPk(id);
    if (!llm) {
      throw new Error('LLM not found');
    }

    // Si le slug est modifié, vérifier qu'il n'existe pas déjà
    if (data.slug && data.slug !== llm.slug) {
      const existingLlm = await Llm.findOne({ where: { slug: data.slug } });
      if (existingLlm) {
        throw new Error('Slug already exists');
      }
    }

    await llm.update(data);
    return llm;
  }

  static async deleteLlm(id: string) {
    const llm = await Llm.findByPk(id);
    if (!llm) {
      throw new Error('LLM not found');
    }

    await llm.destroy();
    return true;
  }
}

export default LlmService;
