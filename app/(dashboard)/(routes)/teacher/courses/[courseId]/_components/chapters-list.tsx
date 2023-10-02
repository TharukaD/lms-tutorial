"use client";

import { Chapter } from "@prisma/client";

interface ChaptersListProps {
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string; position: number }[]) => void;
  items: Chapter[];
}

const ChaptersList = ({ onEdit, onReorder, items }: ChaptersListProps) => {
  return <div>ChaptersList</div>;
};

export default ChaptersList;
