import { cn } from '@/lib/utils';

type Status = 'active' | 'inactive' | 'suspended' | 'draft' | 'published' | 'archived';

interface StatusBadgeProps {
  status: Status;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  active: {
    label: 'Active',
    className: 'bg-success/10 text-success border-success/20',
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  suspended: {
    label: 'Suspended',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
  draft: {
    label: 'Draft',
    className: 'bg-muted text-muted-foreground border-border',
  },
  published: {
    label: 'Published',
    className: 'bg-success/10 text-success border-success/20',
  },
  archived: {
    label: 'Archived',
    className: 'bg-muted text-muted-foreground border-border',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        config.className
      )}
    >
      <span className={cn('mr-1.5 h-1.5 w-1.5 rounded-full', {
        'bg-success': status === 'active' || status === 'published',
        'bg-warning': status === 'inactive',
        'bg-destructive': status === 'suspended',
        'bg-muted-foreground': status === 'draft' || status === 'archived',
      })} />
      {config.label}
    </span>
  );
}