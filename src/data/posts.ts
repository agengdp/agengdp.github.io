// Blog post metadata - single source of truth
// Add new posts here and they will automatically appear on the blog index
export interface PostMeta {
  title: string;
  date: string;
  author: string;
  description: string;
  tag: string;
  image: string;
  slug: string;
  featured?: boolean;
}

export const posts: PostMeta[] = [
  {
    title: "The Future of Web Development in 2026",
    date: "15.03.2026",
    author: "Ageng D. Prastyawan",
    description:
      "Exploring the next frontier of the web: from AI-native frameworks to the rise of edge-local computing.",
    tag: "Future",
    image: "/assets/blog/future-web-dev.png",
    slug: "first-post",
    featured: true,
  },
  {
    title: "Mastering Tailwind CSS v4: The Engine Rewrite",
    date: "28.02.2026",
    author: "Ageng D. Prastyawan",
    description:
      "Deep dive into the zero-config, ultra-fast engine of Tailwind v4 and how it changes the styling workflow.",
    tag: "Design",
    image: "/assets/blog/tailwind-v4.png",
    slug: "mastering-tailwind-v4",
  },
  {
    title: "Building High-Performance APIs with Go and Fiber",
    date: "12.02.2026",
    author: "Ageng D. Prastyawan",
    description:
      "Learn how to squeeze every drop of performance from your backend with Go's Fiber framework.",
    tag: "Backend",
    image: "/assets/blog/go-fiber.png",
    slug: "building-high-performance-apis-with-go-fiber",
  },
];
