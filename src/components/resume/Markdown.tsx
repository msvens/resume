import ReactMarkdown from 'react-markdown';

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        ul: ({ children }) => <ul className="list-disc ml-6 mt-2 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal ml-6 mt-2 space-y-1">{children}</ol>,
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
            {children}
          </a>
        ),
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
