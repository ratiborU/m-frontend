import { TAnswer } from "@/services/types/answerType";
import { TComment } from "@/services/types/commentType";

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

export interface EditPersonProps extends TComment {
  answer: TAnswer
}