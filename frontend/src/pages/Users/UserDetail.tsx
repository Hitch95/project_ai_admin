import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, User as UserIcon, Shield } from 'lucide-react';
import { usersApi } from '@/api/users/users';
import type { User } from '@/utils/types/user';

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (id) {
      loadUser(parseInt(id, 10));
    }
  }, [id]);

  const loadUser = async (userId: number) => {
    try {
      const userData = await usersApi.getUser(userId);
      setUser(userData);
      setFormData({
        name: userData.name,
        email: userData.email,
      });
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const updatedUser = await usersApi.updateUser(user.id, formData);
      setUser(updatedUser);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePromoteToAdmin = async () => {
    if (!user) return;

    if (confirm(`Are you sure you want to promote ${user.name} to admin?`)) {
      try {
        await usersApi.promoteToAdmin(user.id);
        alert(
          `${user.name} has been promoted to admin! They can now login with their email and the default password.`
        );
      } catch (error) {
        console.error('Failed to promote user:', error);
        alert('Failed to promote user to admin. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div>Loading user details...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
        <div>User not found</div>
        <Button onClick={() => navigate('/admin/dashboard/users')}>
          <ArrowLeft className='h-4 w-4 mr-2' />
          Back to Users
        </Button>
      </div>
    );
  }

  const hasChanges =
    formData.name !== user.name || formData.email !== user.email;

  return (
    <div className='flex flex-col gap-6 max-w-4xl mx-auto'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          onClick={() => navigate('/admin/dashboard/users')}
          className='p-2'
        >
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
            User Details
          </h1>
          <p className='text-muted-foreground'>
            Edit and manage user information
          </p>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* User Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <UserIcon className='h-5 w-5' />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {/* User ID (Read-only) */}
            <div className='space-y-2'>
              <Label htmlFor='userId'>User ID</Label>
              <Input
                id='userId'
                value={user.id}
                disabled
                className='bg-muted'
              />
            </div>

            {/* Name (Editable) */}
            <div className='space-y-2'>
              <Label htmlFor='userName'>Name</Label>
              <Input
                id='userName'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder='Enter user name'
              />
            </div>

            {/* Email (Editable) */}
            <div className='space-y-2'>
              <Label htmlFor='userEmail'>Email</Label>
              <Input
                id='userEmail'
                type='email'
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder='Enter user email'
              />
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className='w-full cursor-pointer'
            >
              <Save className='h-4 w-4 mr-2' />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>

        {/* User Status & Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>User Status & Actions</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {/* Role Status */}
            <div className='space-y-2'>
              <Label>Role</Label>
              <div className='flex items-center gap-2'>
                <UserIcon className='h-4 w-4 text-gray-500' />
                <span className='text-sm font-medium text-gray-600'>User</span>
              </div>
            </div>

            {/* Email Verification Status */}
            <div className='space-y-2'>
              <Label>Email Status</Label>
              <div
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  user.email_verified_at
                    ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                    : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                }`}
              >
                {user.email_verified_at ? 'Verified' : 'Unverified'}
              </div>
            </div>

            {/* Created Date */}
            <div className='space-y-2'>
              <Label>Member Since</Label>
              <div className='text-sm text-muted-foreground'>
                {new Date(user.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>

            {/* Admin Promotion */}
            <div className='pt-4 border-t'>
              <Button
                variant='outline'
                onClick={handlePromoteToAdmin}
                className='w-full cursor-pointer bg-black text-white'
              >
                <Shield className='h-4 w-4 mr-2' />
                Promote to Admin
              </Button>
              <p className='text-xs text-muted-foreground mt-2'>
                This will create an admin account in Better-Auth with the same
                email and name.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetail;
