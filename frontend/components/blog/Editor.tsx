'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useCallback } from 'react';

interface EditorProps {
    content: string;
    onChange: (html: string) => void;
}

export default function Editor({ content, onChange }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] border border-border p-4 rounded-b-md bg-background',
            },
        },
    });

    const addImage = useCallback(() => {
        const url = window.prompt('URL');
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-2 p-3 bg-muted border border-border rounded-t-md border-b-0">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-background ${editor.isActive('bold') ? 'bg-background shadow-sm text-primary' : ''}`}
                >
                    Bold
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-background ${editor.isActive('italic') ? 'bg-background shadow-sm text-primary' : ''}`}
                >
                    Italic
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded hover:bg-background ${editor.isActive('heading', { level: 2 }) ? 'bg-background shadow-sm text-primary' : ''}`}
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-background ${editor.isActive('bulletList') ? 'bg-background shadow-sm text-primary' : ''}`}
                >
                    Bullet List
                </button>
                <button
                    type="button"
                    onClick={addImage}
                    className="p-2 rounded hover:bg-background"
                >
                    Image
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    className="p-2 rounded hover:bg-background ml-auto"
                >
                    Undo
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    className="p-2 rounded hover:bg-background"
                >
                    Redo
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
