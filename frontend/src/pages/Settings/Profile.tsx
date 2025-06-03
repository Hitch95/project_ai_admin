import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
// import { useSession } from '@/lib/auth-client';

export default function ProfileSettings() {
  // const { data: session } = useSession();

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
          Profile Settings
        </h1>
        <p className='text-muted-foreground'>
          Manage your personal information and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details here.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                  id='name'
                  placeholder='Enter your full name'
                  //   defaultValue={session?.user?.name || ''}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='Enter your email'
                  //   defaultValue={session?.user?.email || ''}
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='currentPassword'>Current Password</Label>
              <Input
                id='currentPassword'
                type='password'
                placeholder='Enter current password'
              />
            </div>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='newPassword'>New Password</Label>
                <Input
                  id='newPassword'
                  type='password'
                  placeholder='Enter new password'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                <Input
                  id='confirmPassword'
                  type='password'
                  placeholder='Confirm new password'
                />
              </div>
            </div>
            <div className='flex justify-end gap-2'>
              <Button variant='outline'>Reset</Button>
              <Button type='submit'>Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
