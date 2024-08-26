"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getCommentDataInclude, PostData } from "@/lib/types";
import { createCommentSchema } from "@/lib/validation";

export const submitComment = async ({
  post,
  content,
}: {
  post: PostData;
  content: string;
}) => {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  const { content: contentValidator } = createCommentSchema.parse({ content });

  const newComment = await prisma.comment.create({
    data: {
      content: contentValidator,
      postId: post.id,
      userId: user.id,
    },
    include: getCommentDataInclude(user.id),
  });

  return newComment;
};
