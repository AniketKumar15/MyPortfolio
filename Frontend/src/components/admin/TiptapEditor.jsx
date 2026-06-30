import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { Bold, Italic, Strikethrough, Code, Heading1, Heading2, List, ListOrdered, Quote, Undo, Redo, ImageIcon, LinkIcon } from 'lucide-react';
import axios from 'axios';

const lowlight = createLowlight(common);

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token') || '';
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      editor.chain().focus().setImage({ src: res.data.url }).run();
    } catch (error) {
      console.error('Image upload failed', error);
      alert('Failed to upload image.');
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const MenuButton = ({ onClick, isActive, disabled, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-1.5 rounded-md transition-colors ${
        isActive 
          ? 'bg-bg-secondary text-accent border border-border-subtle shadow-sm' 
          : 'text-text-secondary hover:text-accent hover:bg-bg-secondary'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-border-subtle bg-bg-card rounded-t-xl sticky top-0 z-10">
      <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
        <Bold className="w-4 h-4" />
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
        <Italic className="w-4 h-4" />
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}>
        <Strikethrough className="w-4 h-4" />
      </MenuButton>
      
      <div className="w-px h-5 bg-border-subtle mx-1 self-center"></div>
      
      <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}>
        <Heading1 className="w-4 h-4" />
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}>
        <Heading2 className="w-4 h-4" />
      </MenuButton>
      
      <div className="w-px h-5 bg-border-subtle mx-1 self-center"></div>
      
      <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
        <List className="w-4 h-4" />
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
        <ListOrdered className="w-4 h-4" />
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')}>
        <Code className="w-4 h-4" />
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')}>
        <Quote className="w-4 h-4" />
      </MenuButton>
      
      <div className="w-px h-5 bg-border-subtle mx-1 self-center"></div>
      
      <MenuButton onClick={setLink} isActive={editor.isActive('link')}>
        <LinkIcon className="w-4 h-4" />
      </MenuButton>
      
      <label className="p-1.5 rounded-md text-text-secondary hover:text-accent hover:bg-bg-secondary cursor-pointer transition-colors">
        <ImageIcon className="w-4 h-4" />
        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
      </label>
      
      <div className="flex-grow"></div>
      
      <MenuButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
        <Undo className="w-4 h-4" />
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
        <Redo className="w-4 h-4" />
      </MenuButton>
    </div>
  );
};

const TiptapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: content || '<p>Start writing your story...</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] p-6 lg:p-10 text-text-secondary prose-headings:text-accent prose-a:text-accent prose-img:rounded-xl',
      },
    },
  });

  return (
    <div className="border border-border-subtle rounded-xl overflow-hidden bg-[#151515] shadow-sm focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
