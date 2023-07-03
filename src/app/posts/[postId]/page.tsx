import Link from "next/link";
import getFormattedDate from "../../../../lib/getFormattedDate";
import { getPostData, getSortedPostsData } from "../../../../lib/posts";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const posts = getSortedPostsData(); // deduped

  return posts.map((post) => ({
    postId: post.id,
  }));
}

export function generateMetadata({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData();

  const { postId } = params;

  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: post.title,
  };
}

export default async function Post({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData();

  const { postId } = params;

  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return notFound();
  }

  const { title, date, contentHtml } = await getPostData(postId);
  const pubDate = getFormattedDate(date);

  return (
    <main className="mx-auto px-6 prose prose-xl prose-slate dark:prose-invert">
      <h1 className="text-3xl mt-4 mb-0">{title}</h1>
      <p className="mt-0">{pubDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }}></section>
        <p>
          <Link href="/">⬅Back to home</Link>
        </p>
      </article>
    </main>
  );
}
