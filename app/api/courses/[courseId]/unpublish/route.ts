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
      where: {
        id: courseId,
        userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    const course = await db.course.update({
      data: {
        isPublished: false,
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
