import styles from "./portfolio.module.css";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Portfolio() {
  return (
    <div className={styles.project}>
      <h1 className={styles.pageTitle}>Portfolio</h1>
      <div className={styles.projectList}>
        <Link href="/">
          <Image
            className={styles.projectImage}
            src="/personal website.PNG"
            alt="screenshot of my personal website"
            width="150"
            height="200"
          />
        </Link>
        <div className={styles.projectDetails}>
          <p className={styles.projectName}>Personal Website</p>
          <p className={styles.projectDescription}>
            This is my personal website where you'll find a brief introduction
            about myself, my portfolio, resume, and contact information!
          </p>
          <Link href="/">LEARN MORE</Link>
        </div>
      </div>
    </div>
  );
}
