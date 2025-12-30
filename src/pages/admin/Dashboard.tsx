import { Users, BookOpen, GraduationCap, TrendingUp, Activity, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/admin/PageHeader';
import { StatsCard } from '@/components/admin/StatsCard';
import { mockDashboardStats, mockUsers } from '@/data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', users: 400, completions: 240 },
  { name: 'Feb', users: 600, completions: 380 },
  { name: 'Mar', users: 800, completions: 520 },
  { name: 'Apr', users: 1000, completions: 690 },
  { name: 'May', users: 1100, completions: 780 },
  { name: 'Jun', users: 1247, completions: 892 },
];

const recentActivity = [
  { id: 1, action: 'New user registered', user: 'Sarah Connor', time: '2 minutes ago' },
  { id: 2, action: 'Module completed', user: 'John Doe', time: '15 minutes ago' },
  { id: 3, action: 'New lesson published', user: 'Admin', time: '1 hour ago' },
  { id: 4, action: 'User suspended', user: 'Charlie Brown', time: '3 hours ago' },
  { id: 5, action: 'Module updated', user: 'Jane Smith', time: '5 hours ago' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Overview of your Git Mastery Hub platform"
        icon={BarChart3}
      />

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={mockDashboardStats.totalUsers.toLocaleString()}
          change="+12% from last month"
          changeType="positive"
          icon={Users}
          delay={0}
        />
        <StatsCard
          title="Active Users"
          value={mockDashboardStats.activeUsers.toLocaleString()}
          change="+8% from last month"
          changeType="positive"
          icon={Activity}
          delay={0.1}
        />
        <StatsCard
          title="Published Modules"
          value={`${mockDashboardStats.publishedModules}/${mockDashboardStats.totalModules}`}
          change="4 in draft"
          changeType="neutral"
          icon={BookOpen}
          delay={0.2}
        />
        <StatsCard
          title="Completion Rate"
          value={`${mockDashboardStats.completionRate}%`}
          change="+5.2% from last month"
          changeType="positive"
          icon={TrendingUp}
          delay={0.3}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="glass rounded-xl p-6 lg:col-span-2"
        >
          <h3 className="mb-6 text-lg font-semibold text-foreground">User Growth</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(187, 85%, 53%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(187, 85%, 53%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="completionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222, 47%, 10%)',
                    border: '1px solid hsl(222, 30%, 18%)',
                    borderRadius: '8px',
                    color: 'hsl(210, 40%, 98%)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(187, 85%, 53%)"
                  strokeWidth={2}
                  fill="url(#userGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="completions"
                  stroke="hsl(142, 76%, 36%)"
                  strokeWidth={2}
                  fill="url(#completionGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="mb-6 text-lg font-semibold text-foreground">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.6 + index * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Learners */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="glass rounded-xl p-6"
      >
        <h3 className="mb-6 text-lg font-semibold text-foreground">Top Learners</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {mockUsers.slice(0, 5).map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.7 + index * 0.05 }}
              className="flex items-center gap-3 rounded-lg bg-muted/30 p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.completedModules}/{user.totalModules} modules
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}