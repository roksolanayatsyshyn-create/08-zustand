import type { Metadata } from 'next';

import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const note = await fetchNoteById(id);

  if (!note) {
    return {
      title: 'Note not found | NoteHub',
      description: 'The requested note does not exist.',
    };
  }

  const title = `${note.title} | NoteHub`;

  const description =
    note.content.length > 70
      ? note.content.slice(0,70 ) + '…'
      : note.content;

  const url = `/notes/${id}`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://cdn-icons-png.flaticon.com/512/9239/9239205.png',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],},};
}

export const dynamic = 'force-dynamic';

export default async function NotePage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const resolvedParams: { id: string } = await params;

  const note: Note = await fetchNoteById(resolvedParams.id);

  return <NoteDetailsClient noteId={note.id} />;
}
