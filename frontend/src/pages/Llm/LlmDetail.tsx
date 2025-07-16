'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, X } from 'lucide-react';
import type { Llm } from '@/utils/types/llm';
import { llmsApi } from '@/api/llms/llms';

export default function LlmDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [llm, setLlm] = useState<Llm | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadLlm(parseInt(id));
    }
  }, [id]);

  const loadLlm = async (llmId: number) => {
    try {
      const llmData = await llmsApi.getLlm(llmId);
      setLlm(llmData);
      setFormData({
        name: llmData.name,
        slug: llmData.slug,
      });
    } catch (error) {
      console.error('Failed to load LLM:', error);
      setError('Failed to load LLM details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!llm) return;

    setSaving(true);
    setError(null);

    try {
      const updatedLlm = await llmsApi.updateLlm(llm.id, formData);
      setLlm(updatedLlm);
      // Optionally show success message
      console.log('LLM updated successfully');
    } catch (error) {
      console.error('Failed to update LLM:', error);
      setError('Failed to update LLM');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (llm) {
      setFormData({
        name: llm.name,
        slug: llm.slug,
      });
    }
  };

  const handleBack = () => {
    navigate('/admin/dashboard/llm');
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        Loading LLM details...
      </div>
    );
  }

  if (!llm) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
        <p className='text-lg text-muted-foreground'>LLM not found</p>
        <Button onClick={handleBack} variant='outline'>
          <ArrowLeft className='h-4 w-4 mr-2' />
          Back to LLMs
        </Button>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center gap-4'>
        <Button onClick={handleBack} variant='outline' size='sm'>
          <ArrowLeft className='h-4 w-4 mr-2' />
          Back
        </Button>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
            LLM Details
          </h1>
          <p className='text-muted-foreground'>
            View and edit LLM model information
          </p>
        </div>
      </div>

      {error && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded'>
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>LLM Information</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='id'>ID</Label>
              <Input id='id' value={llm.id} disabled className='bg-gray-50' />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='created_at'>Created At</Label>
              <Input
                id='created_at'
                value={new Date(llm.created_at).toLocaleString()}
                disabled
                className='bg-gray-50'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder='Enter LLM name'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='slug'>Slug</Label>
              <Input
                id='slug'
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder='Enter LLM slug'
              />
            </div>
          </div>

          <div className='flex items-center gap-3 pt-4'>
            <Button
              onClick={handleSave}
              disabled={saving}
              className='min-w-[100px] cursor-pointer'
            >
              {saving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className='h-4 w-4 mr-2' />
                  Save Changes
                </>
              )}
            </Button>
            <Button onClick={handleCancel} variant='outline' disabled={saving}>
              <X className='h-4 w-4 mr-2' />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
