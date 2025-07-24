'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bot } from 'lucide-react';
import { llmModelsApi } from '@/api/llms-model/llms-model';
import { llmsApi } from '@/api/llms/llms';
import type { Llm } from '@/utils/types/llm';

interface CreateLlmModelDialogProps {
  onLlmModelCreated: () => void;
}

export function CreateLlmModelDialog({
  onLlmModelCreated,
}: CreateLlmModelDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [llms, setLlms] = useState<Llm[]>([]);
  const [selectedLlmId, setSelectedLlmId] = useState<string>('');

  // Load LLMs when dialog opens
  const loadLlms = async () => {
    try {
      const llmsData = await llmsApi.getLlms();
      setLlms(llmsData);
    } catch (error) {
      console.error('Failed to load LLMs:', error);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      loadLlms();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const llmModelData = {
      llm_id: parseInt(selectedLlmId, 10),
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
    };

    try {
      await llmModelsApi.createLlmModel(llmModelData);
      setOpen(false);
      onLlmModelCreated();
      // Reset form
      setSelectedLlmId('');
    } catch (error) {
      console.error('Failed to create LLM Model:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className='cursor-pointer'>
          <Bot className='mr-2 h-4 w-4' />
          Add LLM Model
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[525px]'>
        <DialogHeader>
          <DialogTitle>Create New LLM Model</DialogTitle>
          <DialogDescription>
            Add a new LLM model to the system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='llm-select'>LLM Provider</Label>
              <Select
                value={selectedLlmId}
                onValueChange={setSelectedLlmId}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select an LLM provider' />
                </SelectTrigger>
                <SelectContent>
                  {llms.map((llm) => (
                    <SelectItem key={llm.id} value={llm.id.toString()}>
                      {llm.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='name'>Model Name</Label>
              <Input
                id='name'
                name='name'
                placeholder='Enter model name (e.g., GPT-4)'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='slug'>Slug</Label>
              <Input
                id='slug'
                name='slug'
                placeholder='model-slug (e.g., gpt-4)'
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              className='cursor-pointer'
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isLoading || !selectedLlmId}
              className='cursor-pointer'
            >
              {isLoading ? 'Creating...' : 'Create Model'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
