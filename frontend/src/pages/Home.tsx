import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  UsersIcon,
  UserPlusIcon,
  UserXIcon,
  ActivityIcon,
  BarChart3,
  Database,
  Shield,
} from 'lucide-react';
import { DashboardChart } from '../lib/ui/dashboard-chart';

const Home = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
          Admin Dashboard
        </h1>
      </div>

      <Tabs defaultValue='overview' className='space-y-4'>
        <div className='flex items-center justify-between'>
          <TabsList>
            <TabsTrigger value='overview' className='cursor-pointer'>
              Overview
            </TabsTrigger>
            <TabsTrigger value='users' className='cursor-pointer'>
              Users
            </TabsTrigger>
            <TabsTrigger value='llm' className='cursor-pointer'>
              LLM Providers
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value='overview' className='space-y-4'>
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Users
                </CardTitle>
                <UsersIcon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>3</div>
                <p className='text-xs text-muted-foreground'>
                  All registered users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Admin Users
                </CardTitle>
                <Shield className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>2</div>
                <p className='text-xs text-muted-foreground'>
                  Active administrators
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  LLM Providers
                </CardTitle>
                <Database className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>3</div>
                <p className='text-xs text-muted-foreground'>
                  Configured providers
                </p>
              </CardContent>
            </Card>
          </div>

          <div className='grid gap-4 grid-cols-1 lg:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>User Registration Trends</CardTitle>
                <CardDescription>User registration over time</CardDescription>
              </CardHeader>
              <CardContent className='pl-2'>
                <DashboardChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>
                  Current system health and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Database</span>
                    <div className='flex items-center gap-2'>
                      <div className='h-2 w-2 bg-green-500 rounded-full'></div>
                      <span className='text-sm text-green-600'>Healthy</span>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>API Services</span>
                    <div className='flex items-center gap-2'>
                      <div className='h-2 w-2 bg-green-500 rounded-full'></div>
                      <span className='text-sm text-green-600'>Online</span>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>LLM Providers</span>
                    <div className='flex items-center gap-2'>
                      <div className='h-2 w-2 bg-green-500 rounded-full'></div>
                      <span className='text-sm text-green-600'>Connected</span>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Authentication</span>
                    <div className='flex items-center gap-2'>
                      <div className='h-2 w-2 bg-green-500 rounded-full'></div>
                      <span className='text-sm text-green-600'>Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='users' className='space-y-4'>
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  New Users Today
                </CardTitle>
                <UserPlusIcon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>0</div>
                <p className='text-xs text-muted-foreground'>
                  No new registrations today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Active Users
                </CardTitle>
                <ActivityIcon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>3</div>
                <p className='text-xs text-muted-foreground'>
                  All users active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Verified Emails
                </CardTitle>
                <UserXIcon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>3</div>
                <p className='text-xs text-muted-foreground'>
                  100% verification rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Admin Accounts
                </CardTitle>
                <Shield className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>2</div>
                <p className='text-xs text-muted-foreground'>67% admin ratio</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='llm' className='space-y-4'>
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Providers
                </CardTitle>
                <Database className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>3</div>
                <p className='text-xs text-muted-foreground'>
                  OpenAI, Anthropic, Google
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Available Models
                </CardTitle>
                <BarChart3 className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>4</div>
                <p className='text-xs text-muted-foreground'>
                  Across all providers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  API Connections
                </CardTitle>
                <ActivityIcon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>3</div>
                <p className='text-xs text-muted-foreground'>
                  Users with API keys
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Monthly Requests
                </CardTitle>
                <BarChart3 className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>1,234</div>
                <p className='text-xs text-muted-foreground'>
                  +18% from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
