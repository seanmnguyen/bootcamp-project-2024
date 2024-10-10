import Blog from "@/database/blogSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req?.json();
    const { commentBody } = body;
    const { blogSlug } = body;
    console.log("BODY:", commentBody);
    console.log("SLUG:", blogSlug);

    // validate body
    if (!body || !commentBody || !blogSlug) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const comment = {
      user: commentBody.user,
      comment: commentBody.comment,
      time: new Date(),
    };

    // push comment object to document
    const updatedBlog = await Blog.findOneAndUpdate(
      { blogID: blogSlug },
      { $push: { comments: comment } },
      { new: true }
    ).orFail();

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Comment added successfully",
      blog: updatedBlog,
    });
  } catch (err: unknown) {
    return NextResponse.json({
      message: "Something went wrong",
      error: err,
    });
  }
}
