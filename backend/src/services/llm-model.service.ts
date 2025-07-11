// @ts-ignore
import {
  CreateLlmModelDTO,
  LlmModelDto,
  UpdateLlmModelDTO,
} from '../types/llm-model';
import db from '@/models/index';
const { LlmModel } = db;

export class LlmModelService {
  static async getAllModels(): Promise<LlmModelDto[]> {
    return LlmModel.findAll();
  }

  static async getModelById(id: number): Promise<LlmModelDto | null> {
    return LlmModel.findById(id);
  }

  static async getModelsByLlmId(llmId: number): Promise<LlmModelDto[]> {
    return LlmModel.findByLlmId(llmId);
  }

  static async createModel(data: CreateLlmModelDTO): Promise<LlmModelDto> {
    return LlmModel.create(data);
  }

  static async updateModel(
    id: number,
    data: UpdateLlmModelDTO
  ): Promise<LlmModelDto | null> {
    return LlmModel.update(id, data);
  }

  static async deleteModel(id: number): Promise<boolean> {
    return LlmModel.delete(id);
  }
}
