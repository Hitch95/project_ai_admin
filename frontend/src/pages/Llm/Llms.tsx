'use client';

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
import { Search, Settings, Trash2, Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Llm as LlmType } from '@/utils/types/llm';
import { llmsApi } from '@/api/llms/llms';

export default function Llm() {
  const [llms, setLlms] = useState<LlmType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadLlms();
  }, []);

  const loadLlms = async () => {
    try {
      const fetchedLlms = await llmsApi.getLlms();
      setLlms(fetchedLlms);
    } catch (error) {
      console.error('Failed to load LLMs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLlm = async (id: number) => {
    if (confirm('Are you sure you want to delete this LLM?')) {
      try {
        await llmsApi.deleteLlm(id);
        setLlms(llms.filter((llm) => llm.id !== id));
      } catch (error) {
        console.error('Failed to delete LLM:', error);
      }
    }
  };

  const filteredLlms = llms.filter(
    (llm) =>
      llm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      llm.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        Loading LLMs...
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
            Manage Language Learning Models
          </p>
        </div>
        <Button className='cursor-pointer'>
          <Plus className='h-4 w-4 mr-2' />
          Add LLM Model
        </Button>
      </div>

      <Card>
        <CardHeader className='p-4'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
            <div className='flex items-center gap-2 w-full max-w-sm'>
              <Search className='h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search LLMs...'
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
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLlms.map((llm) => (
                  <TableRow key={llm.id}>
                    <TableCell className='font-medium'>{llm.name}</TableCell>
                    <TableCell>
                      <code className='bg-gray-100 px-2 py-1 rounded text-sm'>
                        {llm.slug}
                      </code>
                    </TableCell>
                    <TableCell>
                      {new Date(llm.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(llm.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        <Button variant='ghost' size='icon' asChild>
                          <Link to={`/admin/dashboard/llm/${llm.id}`}>
                            <Eye className='h-4 w-4' />
                            <span className='sr-only'>View LLM</span>
                          </Link>
                        </Button>
                        <Button variant='ghost' size='icon' asChild>
                          <Link to={`/admin/dashboard/llm/${llm.id}`}>
                            <Settings className='h-4 w-4' />
                            <span className='sr-only'>Edit LLM</span>
                          </Link>
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleDeleteLlm(llm.id)}
                          className='text-red-600 hover:text-red-700 cursor-pointer'
                        >
                          <Trash2 className='h-4 w-4' />
                          <span className='sr-only'>Delete LLM</span>
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
}
