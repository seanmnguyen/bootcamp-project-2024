import { IBlog } from "@/database/blogSchema";

export default async function fetchBlog(blogID: string): Promise<IBlog> {
  try {
    // This fetches the blog from an api endpoint that would GET the blog
    const res = await fetch(`https://seanmnguyen2024.vercel.app/api/blogs/${blogID}`, {
      cache: "no-store",
    });
    // This checks that the GET request was successful
    if (!res.ok) {
      throw new Error("Failed to fetch blog");
    }
    console.log("found");

    const res_j = await res.json();
    return res_j;
  } catch (err: unknown) {
    console.log(`error: ${err}`);
    return null;
  }
}
