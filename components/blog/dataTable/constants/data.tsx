import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCheckIcon,
  CircleX,
  FileQuestionIcon,
  ListChecksIcon,
  NotebookPenIcon,
  RotateCcwIcon,
} from 'lucide-react';

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
];

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: RotateCcwIcon,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: ListChecksIcon,
  },
  {
    value: 'writing',
    label: 'Writing',
    icon: NotebookPenIcon,
  },
  {
    value: 'published',
    label: 'Published',
    icon: CheckCheckIcon,
  },
  {
    value: 'draft',
    label: 'Draft',
    icon: FileQuestionIcon,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CircleX,
  },
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
];
