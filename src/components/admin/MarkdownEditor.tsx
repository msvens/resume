'use client';

import { useRef, useState, useCallback } from 'react';
import { Markdown } from '@/components/resume/Markdown';

interface MarkdownEditorProps {
  name: string;
  defaultValue?: string;
  rows?: number;
  label?: string;
}

export function MarkdownEditor({ name, defaultValue = '', rows = 6, label }: MarkdownEditorProps) {
  const [value, setValue] = useState(defaultValue);
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = useCallback((before: string, after: string, placeholder: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    const text = selected || placeholder;
    const newValue = value.substring(0, start) + before + text + after + value.substring(end);

    setValue(newValue);
    requestAnimationFrame(() => {
      textarea.focus();
      const cursorPos = start + before.length + text.length;
      if (selected) {
        textarea.setSelectionRange(start + before.length, cursorPos);
      } else {
        textarea.setSelectionRange(start + before.length, start + before.length + placeholder.length);
      }
    });
  }, [value]);

  const insertBold = () => insertMarkdown('**', '**', 'bold text');
  const insertItalic = () => insertMarkdown('*', '*', 'italic text');
  const insertLink = () => insertMarkdown('[', '](url)', 'link text');

  const insertBullet = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const prefix = value.substring(lineStart, start).match(/^\s*/)?.[0] ?? '';
    const bullet = `${prefix}- `;
    const newValue = value.substring(0, lineStart) + bullet + value.substring(lineStart);

    setValue(newValue);
    requestAnimationFrame(() => {
      textarea.focus();
      const cursorPos = lineStart + bullet.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    });
  }, [value]);

  const inputClass = "w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-b bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm font-mono";

  return (
    <div>
      {label && <label className="text-xs text-neutral-500 mb-1 block">{label}</label>}
      <div className="border border-neutral-300 dark:border-neutral-700 rounded overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-1 px-2 py-1.5 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-300 dark:border-neutral-700">
          <button type="button" onClick={insertBold} className="px-2 py-0.5 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded" title="Bold">
            B
          </button>
          <button type="button" onClick={insertItalic} className="px-2 py-0.5 text-xs italic text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded" title="Italic">
            I
          </button>
          <button type="button" onClick={insertBullet} className="px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded" title="Bullet list">
            &bull; List
          </button>
          <button type="button" onClick={insertLink} className="px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded" title="Link">
            🔗 Link
          </button>
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`px-2 py-0.5 text-xs rounded ${showPreview ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'}`}
          >
            Preview
          </button>
        </div>

        {/* Editor / Preview */}
        {showPreview ? (
          <div className="px-3 py-2 min-h-[150px] text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {value ? <Markdown content={value} /> : <span className="text-neutral-400 italic">Nothing to preview</span>}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={rows}
            className={inputClass}
            style={{ border: 'none', borderRadius: 0 }}
          />
        )}
      </div>

      {showPreview && <input type="hidden" name={name} value={value} />}
    </div>
  );
}
