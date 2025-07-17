import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import type { LlmModel } from '@/utils/types/llm-model';
import { llmModelsApi } from '@/api/llms-model/llms-model';

const LlmModelDetail = () => {
  const { id } = useParams();
  const [model, setModel] = useState<LlmModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const data = await llmModelsApi.getLlmModelById(Number(id));
        setModel(data);
      } catch (error) {
        console.error('Failed to load LLM Model:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        Loading LLM Model...
      </div>
    );
  }

  if (!model) {
    return <div className='text-center mt-10'>Model not found.</div>;
  }

  return (
    <div className='flex flex-col gap-4'>
      <Card>
        <CardHeader>
          <h1 className='text-2xl font-bold'>LLM Model Detail</h1>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <div>
              <strong>Name:</strong> {model.name}
            </div>
            <div>
              <strong>Slug:</strong> {model.slug}
            </div>
            <div>
              <strong>LLM ID:</strong> {model.llm_id}
            </div>
            <div>
              <strong>Created At:</strong>{' '}
              {new Date(model.created_at).toLocaleString()}
            </div>
            <div>
              <strong>Updated At:</strong>{' '}
              {new Date(model.updated_at).toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LlmModelDetail;
