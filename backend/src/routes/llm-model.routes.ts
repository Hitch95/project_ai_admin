import { Router } from 'express';
// @ts-ignore
import { LlmModelController } from '../controllers/llm-model.controller';

const router = Router();

// Routes publiques
router.get('/', LlmModelController.getAllModels);
router.get('/:id', LlmModelController.getModelById);
router.get('/llm/:llmId', LlmModelController.getModelsByLlmId);

// Routes protégées (admin uniquement)
router.post('/', LlmModelController.createModel);
router.put('/:id', LlmModelController.updateModel);
router.delete('/:id', LlmModelController.deleteModel);

export default router;
