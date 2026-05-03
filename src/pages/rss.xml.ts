import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const noticias = await getCollection('noticias');

  const sorted = noticias.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );

  return rss({
    title: 'Noticias | Municipalidad de Bonito Oriental',
    description:
      'Noticias, comunicados, eventos y obras oficiales de la Municipalidad de Bonito Oriental, Honduras.',
    site: context.site ?? 'https://bonitoriental.hn',
    items: sorted.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.publishedAt,
      description: entry.data.excerpt,
      link: `/noticias/${entry.data.slug ?? entry.id}/`,
      categories: [entry.data.category],
    })),
    customData: `<language>es-HN</language>`,
  });
}
