import express from 'express';
// @ts-ignore
import LlmController from '../controllers/llm.controller';
// @ts-ignore
import { validateLlmInput } from '../middleware/validators';

const router = express.Router();

// Route pour obtenir tous les LLMs
router.get('/', LlmController.getAllLlms);

// Route pour obtenir un LLM spécifique par ID
router.get('/:id', LlmController.getLlmById);

// Route pour créer un nouveau LLM
router.post('/',  validateLlmInput, LlmController.createLlm);

// Route pour mettre à jour un LLM existant
router.put('/:id', validateLlmInput, LlmController.updateLlm);

// Route pour supprimer un LLM
router.delete('/:id',  LlmController.deleteLlm);

export default router;
