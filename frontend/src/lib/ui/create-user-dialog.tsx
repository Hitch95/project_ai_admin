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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
import { UserPlus } from 'lucide-react';
import { usersApi } from '@/api/users/users';

interface CreateUserDialogProps {
  onUserCreated: () => void;
}

export function CreateUserDialog({ onUserCreated }: CreateUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      is_admin: false, // Default to false, can be changed later
    };

    try {
      await usersApi.createUser(userData);
      // const form = e.currentTarget;
      // form.reset();

      setOpen(false);
      onUserCreated();
    } catch (error) {
      console.error('Failed to create user : ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='cursor-pointer'>
          <UserPlus className='mr-2 h-4 w-4' />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[525px]'>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>Add a new user to the system.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                name='name'
                placeholder='Enter full name'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='user@example.com'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                placeholder='Enter password'
                required
              />
            </div>

            {/* <div className='space-y-2'>
              <Label htmlFor='role'>Role</Label>
              <Select name='role' required>
                <SelectTrigger id='role'>
                  <SelectValue placeholder='Select user role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='user'>Regular User</SelectItem>
                  <SelectItem value='admin'>Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
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
              {isLoading ? 'Creating...' : 'Create User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
