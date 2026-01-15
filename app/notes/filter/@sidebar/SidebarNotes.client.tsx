'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { Note, Tag } from '@/types/note';
import css from './SidebarNotes.module.css';

export default function SidebarNotesClient() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['sidebar-notes'],
    queryFn: () => fetchNotes('', 1, 12, "all"),
})
  if (isLoading) return <p>Loading tags...</p>;
  if (isError || !data) return <p>Failed to load tags</p>;

  const notes: Note[] = data.notes ?? [];

  
  const tags: Tag[] = Array.from(new Set(notes.map(note => note.tag)));
  
  
  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
