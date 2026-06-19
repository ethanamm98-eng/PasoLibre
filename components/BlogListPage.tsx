import Link from "next/link";
import Image from "next/image";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  featuredImage?: {
    url: string;
    alt: string;
  };
  tags?: string[];
}

interface BlogListPageProps {
  posts: Post[];
}

export function BlogListPage({ posts }: BlogListPageProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-gray-600 mt-2">Insights, updates, and stories</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group cursor-pointer rounded-2xl overflow-hidden border hover:shadow-lg transition">
        {post.featuredImage?.url && (
          <Image
            width={400}
            height={200}
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            className="h-48 w-full object-cover"
          />
        )}

        <div className="p-5 space-y-3">
          <div className="text-xs text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>

          <h2 className="text-xl font-semibold group-hover:text-primary transition">
            {post.title}
          </h2>

          <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
