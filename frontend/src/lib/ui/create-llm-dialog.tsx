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
import { Bot } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
import { llmsApi } from '@/api/llms/llms';

interface CreateLlmDialogProps {
  onLlmCreated: () => void;
}

export default function CreateLlmDialog({
  onLlmCreated,
}: CreateLlmDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const llmData = {
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
    };

    try {
      await llmsApi.createLlm(llmData);
      setOpen(false);
      onLlmCreated();
    } catch (error) {
      console.error('Failed to create LLM : ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='cursor-pointer'>
          <Bot className='mr-2 h-4 w-4' />
          Add LLM Provider
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[525px]'>
        <DialogHeader>
          <DialogTitle>Create New LLM Provider</DialogTitle>
          <DialogDescription>
            Add a new LLM provider to the system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Provider Name</Label>
              <Input
                id='name'
                name='name'
                placeholder='Enter provider name'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='slug'>Slug</Label>
              <Input
                id='slug'
                name='slug'
                placeholder='provider-slug'
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
              disabled={isLoading}
              className='cursor-pointer'
            >
              {isLoading ? 'Creating...' : 'Create LLM'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
