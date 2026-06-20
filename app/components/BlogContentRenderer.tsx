import Image from "next/image";

export interface ContentBlock {
  blockId: string;
  type:
    | "heading"
    | "paragraph"
    | "image"
    | "quote"
    | "code"
    | "divider"
    | "list";
  text?: string;
  level?: number;
  url?: string;
  alt?: string;
  caption?: string;
  code?: string;
  items?: string[];
}

interface BlogContentRendererProps {
  content: ContentBlock[];
}

export function BlogContentRenderer({ content }: BlogContentRendererProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {content.map((block) => {
        switch (block.type) {
          case "heading":
            return block.level === 1 ? (
              <h1 key={block.blockId}>{block.text}</h1>
            ) : (
              <h2 key={block.blockId}>{block.text}</h2>
            );

          case "paragraph":
            return <p key={block.blockId}>{block.text}</p>;

          case "image":
            return (
              <figure key={block.blockId}>
                <Image
                  src={block.url as string}
                  alt={block.alt as string}
                  width={200}
                  height={150}
                />
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            );

          case "quote":
            return <blockquote key={block.blockId}>{block.text}</blockquote>;

          case "code":
            return (
              <pre key={block.blockId}>
                <code>{block.code}</code>
              </pre>
            );

          case "divider":
            return <hr key={block.blockId} />;

          case "list":
            return (
              <ul key={block.blockId}>
                {block?.items?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
