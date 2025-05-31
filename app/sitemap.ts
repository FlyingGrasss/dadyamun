// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date(); // Use a single date instance for consistency

  return [
    {
      url: 'https://dadyamun.org',
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://dadyamun.org/secretariat',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://dadyamun.org/letters',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://dadyamun.org/committees',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://dadyamun.org/apply',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // --- Specific Application Pages ---
    {
      url: 'https://dadyamun.org/apply/delegate',
      lastModified: currentDate,
      changeFrequency: 'weekly', // High priority during application period
      priority: 0.8,
    },
    {
      url: 'https://dadyamun.org/apply/press',
      lastModified: currentDate,
      changeFrequency: 'weekly', // High priority during application period
      priority: 0.8,
    },
    {
      url: 'https://dadyamun.org/apply/delegation', // Added 'delegation'
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://dadyamun.org/apply/pr', // Added 'pr'
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://dadyamun.org/apply/admin', // Added 'admin'
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // --- General Success Page ---
    {
      url: 'https://dadyamun.org/success',
      lastModified: currentDate,
      changeFrequency: 'never',
      priority: 0.3,
    },
    // Add any other publicly accessible pages here
  ];
}