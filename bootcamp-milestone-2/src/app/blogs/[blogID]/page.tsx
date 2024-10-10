"use client";
import React, { useEffect, useState } from "react";
import style from "./blog.module.css";
import Image from "next/image";
import { IBlog, IComment } from "@/database/blogSchema";
import Comment from "@/components/comment";
import fetchBlog from "@/utils/fetchBlog";
import postComment from "@/utils/postComment";

type Props = {
  params: { blogID: string };
};

export default function Blog({ params: { blogID } }: Props) {
  const [commentData, setCommentData] = useState({
    user: "",
    comment: "",
  });
  const [blog, setBlog] = useState<IBlog>({
    title: "",
    blogID: "",
    date: new Date(),
    description: "",
    content: [],
    image: "",
    imageAlt: "",
    comments: [],
  });
  const [blogDate, setBlogDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const data = await fetchBlog(blogID);
        console.log(data);
        setBlog(data);
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
    setBlogDate(new Date(blog.date));
  }, [blogID]);

  function handleCommentUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    postComment(blogID, commentData);

    try {
      window.location.reload();
      alert("comment posted!");
    } catch (err: unknown) {
      console.error(`Error: ${err}`);
      alert("could not post comment :/");
    }
  }

  function handleCommentChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setCommentData((prevCommentData) => ({
      ...prevCommentData,
      [name]: value,
    }));
  }

  if (blog) {
    return (
      <div>
        <h1 className={style.pageTitle}>{blog?.title}</h1>
        <h2 className={style.pageDate}>
          <em>{blogDate?.toDateString()}</em>
        </h2>

        <div className={style.pageContents}>
          <ul className={style.paragraphList}>
            {blog.content.map((paragraph: string, index: number) => (
              <React.Fragment key={index}>
                <li className={style.paragraph}>{paragraph}</li>
                <br />
              </React.Fragment>
            ))}
          </ul>
          <div className={style.pageComments}>
            <div className={style.pageUploadedComments}>
              <h3 className={style.pageCommentsHeader}>Comments</h3>
              {blog?.comments?.map((comment: IComment, index: number) => (
                <Comment key={index} comment={comment} />
              ))}
            </div>
            <form
              className={style.pageAddComment}
              onSubmit={handleCommentUpload}
            >
              <h3 className="pageAddCommentTitle">Write A Comment!</h3>
              <label htmlFor="user">Your Name</label>
              <input
                type="text"
                id="user"
                name="user"
                value={commentData.user}
                onChange={handleCommentChange}
                placeholder="Name"
                required
              />
              <label htmlFor="comment">Your Thoughts...</label>
              <textarea
                id="comment"
                name="comment"
                value={commentData.comment}
                onChange={handleCommentChange}
                placeholder="Tell me what you think!"
                required
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        <br />
        <div className={style.pageImages}>
          <Image
            src="/cinque_terre_1.jpg"
            alt="view of one of the five towns during our hike"
            className={style.blogPic}
            width="350"
            height="350"
          />
          <Image
            src="/cinque_terre_2.jpg"
            alt="view of one of the five towns during our hike"
            className={style.blogPic}
            width="350"
            height="350"
          />
          <Image
            src="/cinque_terre_3.jpg"
            alt="view of one of the five towns during our hike"
            className={style.blogPic}
            width="350"
            height="350"
          />
          <Image
            src="/cinque_terre_4.jpg"
            alt="view of one of the five towns during our hike"
            className={style.blogPic}
            width="350"
            height="350"
          />
          <Image
            src="/cinque_terre_sunrise.jpg"
            alt="sunrise at the first town, Monterosso"
            className={style.blogPic}
            width="350"
            height="350"
          />
          <Image
            src="/cinque_terre_water.jpg"
            alt="picture of crystal-clear water from the hike"
            className={style.blogPic}
            width="350"
            height="350"
          />
          <Image
            src="/cinque_terre_me.jpg"
            alt="me at Riomaggiore on the second day"
            className={style.blogPic}
            width="350"
            height="350"
          />
        </div>
      </div>
    );
  } else {
    return <div> not found </div>;
  }
}
