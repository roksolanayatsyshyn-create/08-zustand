export const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;

export type Tag = (typeof TAGS)[number];

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: Tag;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: Tag;
}
