export default async function postComment(
  commentID: string,
  commentData: Object
) {
  try {
    const postData = {
      commentBody: commentData,
      blogSlug: commentID,
    };
    const res = await fetch(`http://localhost:3000/api/comments/${commentID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!res.ok) {
      throw new Error("Failed to add comment");
    }

    const res_j = await res.json();
    console.log("success!", res_j);
    return res_j;
  } catch (err: unknown) {
    console.error(`error: ${err}`);
    return null;
  }
}
