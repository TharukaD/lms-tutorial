import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, Eye, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChapterTitleForm from "./_components/chapter-title-form";
import ChapterDescriptionForm from "./_components/chapter-description-form";
import ChapterAccessForm from "./_components/chapter-access-form";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { courseId, chapterId } = params;

  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) return redirect("/");

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completedText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/teacher/courses/${courseId}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to course setup
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Chapter creation</h1>
              <span className="text-sm text-slate-700">
                Complete all fields {completedText}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your chapter</h2>
          </div>
          <ChapterTitleForm
            courseId={courseId}
            initialData={chapter}
            chapterId={chapterId}
          />
          <ChapterDescriptionForm
            courseId={courseId}
            initialData={chapter}
            chapterId={chapterId}
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Eye} />
            <h2 className="text-xl">Access Settings</h2>
          </div>
          <ChapterAccessForm
            courseId={courseId}
            initialData={chapter}
            chapterId={chapterId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
