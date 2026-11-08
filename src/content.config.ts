import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    author: z.string().optional(),
    pdf: z.string().optional(),
    license: z.string().optional(),
    licenseUrl: z.url().optional(),
  }),
});

export const collections = { writing };
