import { useTransition } from 'react';
import { createNote } from '@/lib/api';
import type { Tag } from '@/types/note';
import {useNoteStore} from "@/lib/store/noteStore"
import css from './NoteForm.module.css';


interface NoteFormProps {
  onCancel: () => void;
}

export function NoteForm({ onCancel }: NoteFormProps) {
  const [isPending] = useTransition();
  const { draft, setDraft, clearDraft } = useNoteStore();

  async function formAction() {
  const { title, content, tag } = useNoteStore.getState().draft;

  await createNote({ title, content, tag });
  clearDraft();
}

  return (
    
        <form action={formAction} className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" className={css.input}
            value={draft.title}
            onChange={(event)=>{setDraft(({title:event.target.value}))}}  />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
              value={draft.content}
            onChange={(event)=>{setDraft(({content:event.target.value}))}}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <select id="tag" name="tag" className={css.select}
            value={draft.tag}
            onChange={(event)=>{setDraft(({tag:event.target.value as Tag}))}}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={()=>{
                onCancel(); clearDraft()}}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={ isPending}
            >
              Create note
            </button>
          </div>
        </form>
      )}
  

