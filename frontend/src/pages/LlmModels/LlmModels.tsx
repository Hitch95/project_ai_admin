import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Settings, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LlmModel } from '@/utils/types/llm-model';
import { llmModelsApi } from '@/api/llms-model/llms-model';
import { CreateLlmModelDialog } from '@/lib/ui/create-llm-model-dialog';

const LlmModels = () => {
  const [models, setModels] = useState<LlmModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadModels = async () => {
    try {
      const data = await llmModelsApi.getLlmModels();
      setModels(data);
    } catch (error) {
      console.error('Failed to load LLM Models:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModels();
  }, []);

  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        Loading LLM Models...
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
            LLM Models
          </h1>
          <p className='text-muted-foreground'>
            Manage Language Model Variants
          </p>
        </div>
        <CreateLlmModelDialog onLlmModelCreated={loadModels} />
      </div>

      <Card>
        <CardHeader className='p-4'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
            <div className='flex items-center gap-2 w-full max-w-sm'>
              <Search className='h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search LLM Models...'
                className='h-9'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='flex items-center gap-2 ml-auto'>
              <Button variant='outline' size='sm'>
                Export
              </Button>
              <Button variant='outline' size='sm'>
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className='p-0 overflow-auto'>
          <div className='w-full min-w-[640px]'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>LLM ID</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredModels.map((model) => (
                  <TableRow key={model.id}>
                    <TableCell className='font-medium'>{model.name}</TableCell>
                    <TableCell>
                      <code className='bg-gray-100 px-2 py-1 rounded text-sm'>
                        {model.slug}
                      </code>
                    </TableCell>
                    <TableCell>{model.llm_id}</TableCell>
                    <TableCell>
                      {new Date(model.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(model.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        <Button variant='ghost' size='icon' asChild>
                          <Link to={`/admin/dashboard/llm-model/${model.id}`}>
                            <Eye className='h-4 w-4' />
                            <span className='sr-only'>View Model</span>
                          </Link>
                        </Button>
                        <Button variant='ghost' size='icon' asChild>
                          <Link to={`/admin/dashboard/llm-model/${model.id}`}>
                            <Settings className='h-4 w-4' />
                            <span className='sr-only'>Edit Model</span>
                          </Link>
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='text-red-600 hover:text-red-700 cursor-pointer'
                        >
                          <Trash2 className='h-4 w-4' />
                          <span className='sr-only'>Delete Model</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LlmModels;
