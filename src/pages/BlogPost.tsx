import { useEffect, useState, type ComponentType } from "react";

interface MdxModule {
  default: ComponentType;
  meta: {
    title: string;
    id: string;
  };
}

export default function BlogPost({ id }: { id: string }) {
  const postModules = import.meta.glob<MdxModule>("../posts/*.mdx");
  
  const [PostContent, setPostContent] = useState<ComponentType | null>(null);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const importFunc = postModules[`../posts/${id}.mdx`];
    if (importFunc) {
      importFunc().then((module) => {
        setPostContent(() => module.default);
        setTitle(module.meta.title);
      });
    }
  }, [id, postModules]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      
      {
        PostContent ? (
          <article className="prose lg:prose-xl prose-invert h-auto">
            <PostContent /> 
          </article>
        ) : (
          <p>Loading post...</p>
        )
      }
    </>
  );
}