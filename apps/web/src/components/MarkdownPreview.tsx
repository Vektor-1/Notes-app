import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

interface MarkdownPreviewProps {
    editor: Editor | null;
}

const MarkdownPreview = ({ editor }: MarkdownPreviewProps) => {
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        if (!editor) return;

        const updateMarkdown = () => {
            const content = editor.storage.markdown.getMarkdown();
            setMarkdown(content);
        };

        editor.on("update", updateMarkdown);
        updateMarkdown();

        return () => {
            editor.off("update", updateMarkdown);
        };
    }, [editor]);

    if (!editor) return null;

    return (
        <div className="prose max-w-none p-4 border-l">
            <div dangerouslySetInnerHTML={{ __html: markdown }} />
        </div>
    );
};

export default MarkdownPreview;