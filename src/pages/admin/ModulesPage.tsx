import { useState } from 'react';
import { BookOpen, Plus, Search, MoreHorizontal, Clock, GraduationCap, Edit, Trash2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/admin/PageHeader';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { mockModules } from '@/data/mockData';
import { Module } from '@/types/admin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const difficultyColors = {
  beginner: 'bg-success/10 text-success border-success/20',
  intermediate: 'bg-warning/10 text-warning border-warning/20',
  advanced: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function ModulesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modules, setModules] = useState(mockModules);

  const filteredModules = modules.filter((module) =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Modules"
        description="Manage your course modules and content"
        icon={BookOpen}
        action={{
          label: 'Create Module',
          onClick: () => toast.success('Create module modal would open here'),
          icon: Plus,
        }}
      />

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            All Status
          </Button>
          <Button variant="outline" size="sm">
            All Difficulty
          </Button>
        </div>
      </motion.div>

      {/* Modules Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredModules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group glass rounded-xl p-6 transition-all hover:border-primary/30"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => toast.success(`Viewing ${module.title}`)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Module
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.success(`Editing ${module.title}`)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Module
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => {
                      setModules(modules.filter((m) => m.id !== module.id));
                      toast.success(`${module.title} has been deleted`);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Module
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">#{module.order}</span>
                <StatusBadge status={module.status} />
              </div>

              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {module.title}
              </h3>

              <p className="line-clamp-2 text-sm text-muted-foreground">
                {module.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <Badge
                  variant="outline"
                  className={difficultyColors[module.difficulty]}
                >
                  {module.difficulty}
                </Badge>
              </div>

              <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  <span>{module.lessonsCount} lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{module.duration}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredModules.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16"
        >
          <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">No modules found</h3>
          <p className="text-sm text-muted-foreground">
            {searchQuery ? 'Try adjusting your search' : 'Create your first module to get started'}
          </p>
        </motion.div>
      )}
    </div>
  );
}