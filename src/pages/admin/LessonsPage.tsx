import { useState } from 'react';
import { GraduationCap, Plus, Search, MoreHorizontal, Video, FileText, HelpCircle, Code, Clock, Edit, Trash2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/admin/PageHeader';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { DataTable } from '@/components/admin/DataTable';
import { mockLessons, mockModules } from '@/data/mockData';
import { Lesson } from '@/types/admin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const typeIcons = {
  video: Video,
  text: FileText,
  quiz: HelpCircle,
  exercise: Code,
};

const typeColors = {
  video: 'text-chart-1',
  text: 'text-chart-2',
  quiz: 'text-chart-3',
  exercise: 'text-chart-4',
};

export default function LessonsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [lessons, setLessons] = useState(mockLessons);

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = selectedModule === 'all' || lesson.moduleId === selectedModule;
    return matchesSearch && matchesModule;
  });

  const getModuleTitle = (moduleId: string) => {
    return mockModules.find((m) => m.id === moduleId)?.title || 'Unknown Module';
  };

  const columns = [
    {
      key: 'order',
      header: '#',
      render: (lesson: Lesson) => (
        <span className="font-mono text-sm text-muted-foreground">{lesson.order}</span>
      ),
    },
    {
      key: 'title',
      header: 'Lesson',
      render: (lesson: Lesson) => {
        const TypeIcon = typeIcons[lesson.type];
        return (
          <div className="flex items-center gap-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-muted ${typeColors[lesson.type]}`}>
              <TypeIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-foreground">{lesson.title}</p>
              <p className="text-sm text-muted-foreground capitalize">{lesson.type}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: 'module',
      header: 'Module',
      render: (lesson: Lesson) => (
        <span className="text-sm text-muted-foreground">{getModuleTitle(lesson.moduleId)}</span>
      ),
    },
    {
      key: 'duration',
      header: 'Duration',
      render: (lesson: Lesson) => (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{lesson.duration}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (lesson: Lesson) => <StatusBadge status={lesson.status} />,
    },
    {
      key: 'updatedAt',
      header: 'Last Updated',
      render: (lesson: Lesson) => (
        <span className="text-sm text-muted-foreground">
          {new Date(lesson.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (lesson: Lesson) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => toast.success(`Viewing ${lesson.title}`)}>
              <Eye className="mr-2 h-4 w-4" />
              Preview Lesson
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.success(`Editing ${lesson.title}`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Lesson
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => {
                setLessons(lessons.filter((l) => l.id !== lesson.id));
                toast.success(`${lesson.title} has been deleted`);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Lesson
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Lessons"
        description="Manage all lessons across your modules"
        icon={GraduationCap}
        action={{
          label: 'Create Lesson',
          onClick: () => toast.success('Create lesson modal would open here'),
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
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedModule} onValueChange={setSelectedModule}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by module" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modules</SelectItem>
              {mockModules.map((module) => (
                <SelectItem key={module.id} value={module.id}>
                  {module.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            All Types
          </Button>
        </div>
      </motion.div>

      {/* Lessons Table */}
      <DataTable data={filteredLessons} columns={columns} />

      {/* Stats Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <p className="text-sm text-muted-foreground">
          Showing {filteredLessons.length} of {lessons.length} lessons
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Video className="h-4 w-4 text-chart-1" />
            {lessons.filter((l) => l.type === 'video').length} videos
          </span>
          <span className="flex items-center gap-1">
            <FileText className="h-4 w-4 text-chart-2" />
            {lessons.filter((l) => l.type === 'text').length} text
          </span>
          <span className="flex items-center gap-1">
            <HelpCircle className="h-4 w-4 text-chart-3" />
            {lessons.filter((l) => l.type === 'quiz').length} quizzes
          </span>
          <span className="flex items-center gap-1">
            <Code className="h-4 w-4 text-chart-4" />
            {lessons.filter((l) => l.type === 'exercise').length} exercises
          </span>
        </div>
      </motion.div>
    </div>
  );
}