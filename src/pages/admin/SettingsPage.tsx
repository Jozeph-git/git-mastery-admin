import { Settings, Save, Bell, Lock, Palette, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/admin/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function SettingsPage() {
  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Configure your platform settings"
        icon={Settings}
        action={{
          label: 'Save Changes',
          onClick: handleSave,
          icon: Save,
        }}
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Settings */}
        <div className="space-y-8 lg:col-span-2">
          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-xl p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">General Settings</h3>
                <p className="text-sm text-muted-foreground">Basic platform configuration</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Platform Name</Label>
                <Input id="siteName" defaultValue="Git Mastery Hub" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input id="siteUrl" defaultValue="https://gitmastery.dev" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input id="supportEmail" type="email" defaultValue="support@gitmastery.dev" />
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Notifications</h3>
                <p className="text-sm text-muted-foreground">Configure email and push notifications</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>New User Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified when new users register</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Module Completion Alerts</Label>
                  <p className="text-sm text-muted-foreground">Notify when users complete modules</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">Receive weekly platform analytics</p>
                </div>
                <Switch />
              </div>
            </div>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="glass rounded-xl p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Security</h3>
                <p className="text-sm text-muted-foreground">Authentication and access settings</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">Auto logout after 30 minutes of inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Password Requirements</Label>
                  <p className="text-sm text-muted-foreground">Enforce strong password policy</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Theme Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="glass rounded-xl p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <Palette className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Theme</h3>
            </div>

            <div className="space-y-3">
              <button className="flex w-full items-center gap-3 rounded-lg border border-primary bg-primary/10 p-3 text-left transition-colors">
                <div className="h-8 w-8 rounded-lg bg-background" />
                <span className="text-sm font-medium text-foreground">Dark Mode</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:border-primary/50">
                <div className="h-8 w-8 rounded-lg bg-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Light Mode</span>
              </button>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="rounded-xl border border-destructive/30 bg-destructive/5 p-6"
          >
            <h3 className="mb-2 font-semibold text-destructive">Danger Zone</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Irreversible and destructive actions
            </p>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
                onClick={() => toast.error('This action requires confirmation')}
              >
                Reset All Data
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
                onClick={() => toast.error('This action requires confirmation')}
              >
                Delete All Users
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}