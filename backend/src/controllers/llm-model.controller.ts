import { Request, Response } from 'express';
// @ts-ignore
import { LlmModelService } from '../services/llm-model.service';

export class LlmModelController {
    static async getAllModels(req: Request, res: Response) {
        try {
            const models = await LlmModelService.getAllModels();
            res.json(models);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des modèles' });
        }
    }

    static async getModelById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const model = await LlmModelService.getModelById(id);

            if (!model) {
                return res.status(404).json({ message: 'Modèle non trouvé' });
            }

            res.json(model);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération du modèle' });
        }
    }

    static async getModelsByLlmId(req: Request, res: Response) {
        try {
            const llmId = parseInt(req.params.llmId);
            const models = await LlmModelService.getModelsByLlmId(llmId);
            res.json(models);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des modèles' });
        }
    }

    static async createModel(req: Request, res: Response) {
        try {
            const model = await LlmModelService.createModel(req.body);
            res.status(201).json(model);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la création du modèle' });
        }
    }

    static async updateModel(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const updatedModel = await LlmModelService.updateModel(id, req.body);

            if (!updatedModel) {
                return res.status(404).json({ message: 'Modèle non trouvé' });
            }

            res.json(updatedModel);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la mise à jour du modèle' });
        }
    }

    static async deleteModel(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const success = await LlmModelService.deleteModel(id);

            if (!success) {
                return res.status(404).json({ message: 'Modèle non trouvé' });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression du modèle' });
        }
    }
}
