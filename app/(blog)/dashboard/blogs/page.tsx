import React from 'react';

import { columns } from '@/components/blog/dataTable/columns';
import { DataTable } from '@/components/blog/dataTable/data-table';
import { Button } from '@/components/ui/button';
import { taskSchema } from '@/components/blog/dataTable/data/schema';
import path from 'path';
import { z } from 'zod';
import { promises as fs } from 'fs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ashfak Hossain | All Blogs',
  description:
    'All blogs in the blog system. Create, edit, delete blogs. Manage blog posts. Manage blog comments. Manage blog tags. Manage blog categories',
};

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'components/blog/dataTable/data/tasks.json')
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

const BlogsPage = async () => {
  const tasks = await getTasks();

  return (
    <div className="min-h-screen rounded-base border-2 border-border bg-white text-text dark:border-darkBorder dark:bg-gray-600 dark:text-darkText">
      <div className="p-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Blogs</h1>
          <Button>New Blog</Button>
        </div>
        <div className="py-10">
          <DataTable columns={columns} data={tasks} />
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
