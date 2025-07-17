import express, { Request, Response } from 'express';
import LlmController from '../controllers/llm.controller';
import { validateLlmInput } from '../middleware/validators';

const router = express.Router();

// Route pour obtenir tous les LLMs
router.get('/', (req: Request, res: Response) =>
  LlmController.getAllLlms(req, res)
);

// Route pour obtenir un LLM spécifique par ID
router.get('/:id', (req: Request, res: Response) =>
  LlmController.getLlmById(req, res)
);

// Route pour créer un nouveau LLM
router.post('/', validateLlmInput, (req: Request, res: Response) =>
  LlmController.createLlm(req, res)
);

// Route pour mettre à jour un LLM existant
router.put('/:id', validateLlmInput, (req: Request, res: Response) =>
  LlmController.updateLlm(req, res)
);

// Route pour supprimer un LLM
router.delete('/:id', (req: Request, res: Response) =>
  LlmController.deleteLlm(req, res)
);

export default router;
