import React from "react";
import styles from "./blogPreview.module.css";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/app/static/blogData";

export default function BlogPreview(props: Blog) {
  return (
    <div className={styles.blogPreview}>
      <h3 className={styles.blogPreviewTitle}>
        <Link href="/blog/[slug]" as={`/blog/${props.slug}`}>
          {props.title}
        </Link>{" "}
      </h3>
      <div className={styles.blogPreviewInfo}>
        <Image
          className={styles.blogPreviewPic}
          src={props.image}
          alt={props.imageAlt}
          width="500"
          height="500"
        ></Image>
        <p className={styles.blogPreviewDescription}>{props.description}</p>
        <p className={styles.blogPreviewDate}>
          <strong>Posted on:</strong> {props.date}
        </p>
      </div>
    </div>
  );
}
