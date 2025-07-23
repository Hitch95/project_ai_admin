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
import { Search, UserCog, Trash2, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type User as UserType } from '@/utils/types/user';
import { usersApi } from '@/api/users/users';
import { CreateUserDialog } from '@/lib/ui/create-user-dialog';

export default function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const fetchedUsers = await usersApi.getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await usersApi.deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        Loading users...
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
            Users
          </h1>
          <p className='text-muted-foreground'>
            Manage user accounts and permissions
          </p>
        </div>
        <CreateUserDialog onUserCreated={loadUsers} />
      </div>

      <Card>
        <CardHeader className='p-4'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
            <div className='flex items-center gap-2 w-full max-w-sm'>
              <Search className='h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search users...'
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
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email Verified</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className='font-medium'>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <span className='text-gray-700'>User</span>
                        <span className='h-4 w-4 text-gray-500'>
                          <User className='h-4 w-4' />
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          user.email_verified_at
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                            : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                        }`}
                      >
                        {user.email_verified_at ? 'Verified' : 'Unverified'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        <Button variant='ghost' size='icon' asChild>
                          <Link to={`/admin/dashboard/user/${user.id}`}>
                            <UserCog className='h-4 w-4' />
                            <span className='sr-only'>Edit user</span>
                          </Link>
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleDeleteUser(user.id)}
                          className='text-red-600 hover:text-red-700 cursor-pointer'
                        >
                          <Trash2 className='h-4 w-4' />
                          <span className='sr-only'>Delete user</span>
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
