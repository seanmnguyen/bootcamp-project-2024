import Link from "next/link";
import styles from "./blogs.module.css";
import blogs from "@/app/static/blogData";
import BlogPreview from "@/components/blogPreview";

export default function Blogs() {
  return (
    <div className={styles.blogPage}>
      <h1 className={styles.pageTitle}>Blog</h1>
      <h2 className={styles.pageSubtitle}>Posts</h2>
      <div className={styles.blogList} id="blog-list">
        {blogs.map((blog, index) => (
          <BlogPreview
            key={index}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            imageAlt={blog.imageAlt}
            date={blog.date}
            slug={blog.slug}
          />
        ))}
      </div>
    </div>
  );
}
