import { Node, mergeAttributes } from "@tiptap/core";
import "katex/dist/katex.min.css";
import katex from "katex";

interface MathOptions {
  inline: boolean;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    math: {
      setMath: (options: { text: string; inline?: boolean }) => ReturnType;
    };
  }
}

export const MathExtension = Node.create<MathOptions>({
    name: "math",
    addOptions() {
      return {
        inline: false,
      };
    },

    group: "block",
    content: "text*",
    marks: "",
    atom: true,
    code: true,

    parseHTML() {
        return [
          { tag: this.options.inline ? "math-inline" : "math-display" },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
          this.options.inline ? "math-inline" : "math-display",
          mergeAttributes(HTMLAttributes),
        ];
    },

    addNodeView() {
        return ({ node }) => {
            const dom = document.createElement(this.options.inline ? "span" : "div");
            dom.classList.add(this.options.inline ? "math-inline" : "math-display");
            dom.innerHTML = katex.renderToString(node.textContent, {
                throwOnError: false,
                displayMode: !this.options.inline,
            });

            return {
                dom,
            };
        };
    },

    addCommands() {
        return {
            setMath:
                (options) =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: { inline: options.inline ?? false },
                        content: [{ type: "text", text: options.text }],
                    });
                },
        };
    },
});
