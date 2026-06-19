import Image from "next/image";

import { BlogContentRenderer, ContentBlock } from "./BlogContentRenderer";

interface BlogPost {
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  featuredImage?: {
    url: string;
    alt: string;
  };
  content: ContentBlock[];
  tags?: string[];
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold leading-tight">{post.title}</h1>
        <p className="text-gray-500 mt-3">{post.excerpt}</p>

        <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.category}</span>
        </div>

        {post.featuredImage?.url && (
          <Image
            width={800}
            height={400}
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            className="rounded-2xl mt-10"
          />
        )}
      </header>

      <BlogContentRenderer content={post.content} />

      <footer className="mt-16 pt-8 border-t">
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 rounded-full px-3 py-1"
            >
              #{tag}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
