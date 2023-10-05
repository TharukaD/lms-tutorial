import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findFirst({
      include: {
        chapters: true,
      },
      where: {
        id: courseId,
        userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    if (
      !courseOwner.title ||
      !courseOwner.description ||
      !courseOwner.imageUrl ||
      !courseOwner.categoryId ||
      !courseOwner.price ||
      !courseOwner.chapters.some((chapter) => chapter.isPublished)
    ) {
      return new NextResponse("Required fields must be filled", {
        status: 400,
      });
    }

    const course = await db.course.update({
      data: {
        isPublished: true,
      },
      where: {
        id: courseId,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("COURSE_ID_PUBLISH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
