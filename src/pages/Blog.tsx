import { Link } from "wouter";

interface MdxModule {
  meta: {
    id: string;
    title: string;
    desc: string;
  };
  default: React.ComponentType;
}

export default function Blog() {
  const postFiles = import.meta.glob<MdxModule>('../posts/*.mdx', { eager: true });
  const posts = Object.values(postFiles).map(f => f.meta);

  return (
    <>
      <h1 className="text-5xl">Alex's blog</h1>
      <h2 className="text-2xl">My latest blog posts</h2>
      <br />
      {posts.map(post => (
        <div className='w-full h-auto py-2' key={post.id}>
          <Link to={`/blog/${post.id}`} className="text-xl hover:underline">
            {post.title}
          </Link>
          <p className="text-sm text-white/20 text-ellipsis overflow-x-auto">{post.desc}</p>
        </div>
      ))}
    </>
  );
}