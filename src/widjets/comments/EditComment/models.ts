import { TAnswer } from "@/services/api/answers/answerType";
import { TComment } from "@/services/api/comments/commentType";

import { z } from "zod";

export const editCommentSchema = z.object({
  text: z.string().min(1, 'мало'),
  rate: z.string().min(1, 'мало'),
  personId: z.string().min(1, 'мало'),
  productId: z.string().min(1, 'мало'),
})

export type TEditCommentSchema = z.infer<typeof editCommentSchema>;

export const answerSchema = z.object({
  text: z.string().min(1, 'мало'),
})

export type TAnswerSchema = z.infer<typeof answerSchema>;

export type PersonScheme = {
  text: string,
  rate: string,
  personId: string,
  productId: string,
}

export type AnswerScheme = {
  text: string,
  // personId: string,
  // commentId: string,
}

export type AnswerPost = {
  text: string,
  personId: string,
  commentId: string,
}

export interface EditCommentProps extends TComment {
  answer: TAnswer
}