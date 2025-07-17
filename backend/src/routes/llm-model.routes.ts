import { Router, Request, Response } from 'express';
import LlmModelController from '../controllers/llm-model.controller';

const router = Router();

// Routes publiques
router.get('/', (req: Request, res: Response) =>
  LlmModelController.getAllModels(req, res)
);
router.get('/:id', (req: Request, res: Response) =>
  LlmModelController.getModelById(req, res)
);
router.get('/llm/:llmId', (req: Request, res: Response) =>
  LlmModelController.getModelsByLlmId(req, res)
);

// Routes protégées (admin uniquement)
router.post('/', (req: Request, res: Response) =>
  LlmModelController.createModel(req, res)
);
router.put('/:id', (req: Request, res: Response) =>
  LlmModelController.updateModel(req, res)
);
router.delete('/:id', (req: Request, res: Response) =>
  LlmModelController.deleteModel(req, res)
);

export default router;
