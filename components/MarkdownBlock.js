import ReactMarkdown from "react-markdown";

export function MarkdownBlock({ markdown = "" }) {
  return (
    <div className="prose-campaign">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
