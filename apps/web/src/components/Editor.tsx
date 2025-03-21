import { EditorContent, useEditor } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import { StarterKit } from "@tiptap/starter-kit";
import { MathExtension } from "@/extension/MathExtension";
import { MarkdownExtension } from "@/extension/MarkdownExtension";
import "@/styles/math.css";
import "@/styles/markdown.css";
import EditorToolbar from "./EditorToolbar";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useState, useEffect } from "react";

const KeyboardShortcuts = Extension.create({
    name: "keyboardShortcuts",
    addKeyboardShortcuts() {
        return {
            "Mod-b": () => this.editor.commands.toggleBold(),
            "Mod-i": () => this.editor.commands.toggleItalic(),
            "Mod-Shift-x": () => this.editor.commands.toggleStrike(),
            "Mod-Alt-1": () => this.editor.commands.toggleHeading({ level: 1 }),
            "Mod-Alt-2": () => this.editor.commands.toggleHeading({ level: 2 }),
            "Mod-Shift-b": () => this.editor.commands.toggleBlockquote(),
        };
    },
});

const CustomTableExtension = Table.extend({
    addCommands() {
        return {
            insertTable:
                (options = { cols: 1 }) =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: "table",
                        attrs: options,
                        content: [
                            {
                                type: "tableRow",
                                content: new Array(options.cols).fill({
                                    type: "tableCell",
                                    content: [{ type: "paragraph" }],
                                }),
                            },
                        ],
                    });
                },
        };
    },
});

const MarkdownPreview = ({ editor }: { editor: any }) => {
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        if (!editor) return;
        const updateMarkdown = () => {
            const content = editor.storage.markdown.getMarkdown();
            setMarkdown(content);
        };
        editor.on("update", updateMarkdown);
        updateMarkdown();
        return () => editor.off("update", updateMarkdown);
    }, [editor]);

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Markdown Preview</h2>
            <div className="prose border p-4 bg-gray-50 rounded">
                <div dangerouslySetInnerHTML={{ __html: markdown }} />
            </div>
        </div>
    );
};

const MyEditor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            MathExtension,
            MarkdownExtension,
            KeyboardShortcuts,
            CustomTableExtension.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
            Image,
            Link.configure({ openOnClick: true }),
        ],
        content: "",
    });

    return (
        <div className="border rounded-lg overflow-hidden">
            <EditorToolbar editor={editor} />
            <div className="flex">
                <div className="w-1/2 p-4 border-r">
                    <EditorContent editor={editor} />
                </div>
                <div className="w-1/2">
                    <MarkdownPreview editor={editor} />
                </div>
            </div>
        </div>
    );
};

export default MyEditor;
