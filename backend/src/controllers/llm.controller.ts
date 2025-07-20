import type { Request, Response } from 'express';
import LlmService from '../services/llm.service.js';

class LlmController {
  static async createLlm(req: Request, res: Response): Promise<void> {
    try {
      const llm = await LlmService.createLlm(req.body);
      res.status(201).json(llm);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  static async getLlmById(req: Request, res: Response): Promise<void> {
    try {
      const llm = await LlmService.getLlmById(req.params.id);
      if (!llm) {
        res.status(404).json({ error: 'LLM not found' });
        return;
      }
      res.status(200).json(llm);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  static async getAllLlms(req: Request, res: Response): Promise<void> {
    try {
      const llms = await LlmService.getAllLlms();
      res.status(200).json(llms);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  static async updateLlm(req: Request, res: Response): Promise<void> {
    try {
      const llm = await LlmService.updateLlm(req.params.id, req.body);
      if (!llm) {
        res.status(404).json({ error: 'LLM not found' });
        return;
      }
      res.status(200).json(llm);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  static async deleteLlm(req: Request, res: Response): Promise<void> {
    try {
      const success = await LlmService.deleteLlm(req.params.id);
      if (!success) {
        res.status(404).json({ error: 'LLM not found' });
        return;
      }
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}

export default LlmController;
