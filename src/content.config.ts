import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const vacantes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/vacantes' }),
  schema: z.object({
    title: z.string(),
    dependencia: z.string(),
    tipo: z.enum(['concurso', 'contratacion-directa']),
    requisitos: z.array(z.string()).min(1),
    responsabilidades: z.array(z.string()).optional(),
    salario: z.string().optional(),
    deadline: z.coerce.date(),
    convocatoria_pdf: z.string(),
    applyUrl: z.string().url().optional(),
    publishedAt: z.coerce.date(),
  }),
});

const cabildos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cabildos' }),
  schema: z.object({
    title: z.string(),
    fecha: z.coerce.date(),
    agenda: z.array(z.string()).min(1),
    acta_pdf: z.string().optional(),
    lugar: z.string().optional(),
  }),
});

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/noticias' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    excerpt: z.string().max(300),
    publishedAt: z.coerce.date(),
    category: z.enum(['comunicado', 'evento', 'obra', 'alerta', 'transparencia']),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { vacantes, cabildos, noticias };
