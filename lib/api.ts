import axios from 'axios';
import type {  Note, NoteFormValues } from '@/types/note.ts';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
const BASE_URL = 'https://notehub-public.goit.study/api/notes';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}` }
    : {},
});


export async function fetchNotes(
  search = '',
  page = 1,
  perPage = 12,
  tag: string
): Promise<FetchNotesResponse> {
  const params: { search: string; page: number; perPage: number; tag?: string } = {
    search,
    page,
    perPage,
    
  };
  if (tag && tag !== 'all') {
    params.tag = tag; 
  } else if (tag === 'all') {
    params.tag = undefined; 
  }
  const res = await axiosInstance.get<FetchNotesResponse>('/', { params });
  return res.data;
}
 

export async function createNote(newNote: NoteFormValues) {
  const res = await axiosInstance.post<Note>('/', newNote);
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await axiosInstance.delete<Note>(`/${id}`);
  return res.data;
}
export async function fetchNoteById(id: string) {
  const res = await axiosInstance.get<Note>(`/${id}`);
  return res.data;
}