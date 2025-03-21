import { Editor } from "@tiptap/react";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Code,
    Table,
    Link,
    Image,
    FunctionSquare,
    Strikethrough,
    Heading1,
    Heading2,
    Quote,
    CheckSquare,
} from "lucide-react";

interface EditorToolbarProps {
    editor: Editor | null;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
    if (!editor) return null;

    const insertMath = (inline: boolean) => {
        editor.commands.insertContent({
            type: "math",
            attrs: { text: inline ? "x^2" : "\\sum_{i=1}^n x_i", inline },
        });
    };

    return (
        <div className="flex items-center gap-2 p-2 border-b">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive("bold") ? "bg-gray-200" : ""
                }`}
                title="Bold (Ctrl+B)"
            >
                <Bold size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive("italic") ? "bg-gray-200" : ""
                }`}
                title="Italic (Ctrl+I)"
            >
                <Italic size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive("strike") ? "bg-gray-200" : ""
                }`}
                title="Strikethrough (Ctrl+Shift+X)"
            >
                <Strikethrough size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""
                }`}
                title="Heading 1 (Ctrl+Alt+1)"
            >
                <Heading1 size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
                }`}
                title="Heading 2 (Ctrl+Alt+2)"
            >
                <Heading2 size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive("blockquote") ? "bg-gray-200" : ""
                }`}
                title="Blockquote (Ctrl+Shift+B)"
            >
                <Quote size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive("bulletList") ? "bg-gray-200" : ""
                }`}
            >
                <List size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive("orderedList") ? "bg-gray-200" : ""
                }`}
            >
                <ListOrdered size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive("codeBlock") ? "bg-gray-200" : ""
                }`}
            >
                <Code size={20} />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
                }
                className="p-2 rounded hover:bg-gray-100"
            >
                <Table size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleLink({ href: "" }).run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive("link") ? "bg-gray-200" : ""
                }`}
            >
                <Link size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().setImage({ src: "" }).run()}
                className="p-2 rounded hover:bg-gray-100"
            >
                <Image size={20} />
            </button>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => insertMath(true)}
                    className="p-2 rounded hover:bg-gray-100"
                    title="Insert inline math"
                >
                    <FunctionSquare size={20} />
                </button>
                <button
                    onClick={() => insertMath(false)}
                    className="p-2 rounded hover:bg-gray-100 font-bold"
                    title="Insert block math"
                >
                    ∑
                </button>
            </div>
            <button
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("taskList") ? "bg-gray-200" : ""}`}
                title="Task List"
            >
                <CheckSquare size={20} />
            </button>
        </div>
    );
};

export default EditorToolbar;
