import React from "react";

const ChapterIdPage = ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { chapterId, courseId } = params;
  return (
    <div>
      {courseId} | {chapterId}
    </div>
  );
};

export default ChapterIdPage;
