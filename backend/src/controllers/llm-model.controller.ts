import { Request, Response } from 'express';
import { LlmModelService } from '../services/llm-model.service';

class LlmModelController {
  static async getAllModels(req: Request, res: Response): Promise<void> {
    try {
      const models = await LlmModelService.getAllModels();
      res.json(models);
    } catch (error) {
      res.status(500).json({ message: 'Error while fetching models' });
    }
  }

  static async getModelById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const model = await LlmModelService.getModelById(id);

      if (!model) {
        res.status(404).json({ message: 'Model not found' });
        return;
      }

      res.json(model);
    } catch (error) {
      res.status(500).json({ message: 'Error while fetching model' });
    }
  }

  static async getModelsByLlmId(req: Request, res: Response): Promise<void> {
    try {
      const llmId = parseInt(req.params.llmId);
      const models = await LlmModelService.getModelsByLlmId(llmId);
      res.json(models);
    } catch (error) {
      res.status(500).json({ message: 'Error while fetching models' });
    }
  }

  static async createModel(req: Request, res: Response): Promise<void> {
    try {
      const model = await LlmModelService.createModel(req.body);
      res.status(201).json(model);
    } catch (error) {
      res.status(500).json({ message: 'Error while creating model' });
    }
  }

  static async updateModel(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const updatedModel = await LlmModelService.updateModel(id, req.body);

      if (!updatedModel) {
        res.status(404).json({ message: 'Model not found' });
        return;
      }

      res.json(updatedModel);
    } catch (error) {
      res.status(500).json({ message: 'Error while updating model' });
    }
  }

  static async deleteModel(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await LlmModelService.deleteModel(id);

      if (!success) {
        res.status(404).json({ message: 'Model not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error while deleting model' });
    }
  }
}

export default LlmModelController;
