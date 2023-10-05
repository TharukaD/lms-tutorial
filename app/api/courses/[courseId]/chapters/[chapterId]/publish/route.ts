import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { courseId, chapterId } = params;
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: { id: chapterId },
    });
    if (!chapter) {
      return new NextResponse("Chapter not found", { status: 404 });
    }

    const muxData = await db.muxData.findUnique({
      where: {
        chapterId,
      },
    });

    if (
      !chapter ||
      !muxData ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const updatedChapter = await db.chapter.update({
      data: {
        isPublished: true,
      },
      where: {
        id: chapterId,
      },
    });
    return NextResponse.json(updatedChapter);
  } catch (error) {
    console.log("CHAPTERS_ID_PUBLISH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
