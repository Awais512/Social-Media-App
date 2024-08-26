import { PostData } from "@/lib/types";
import React, { useState } from "react";
import { useSubmitCommentMutation } from "./mutations";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, SendHorizontal } from "lucide-react";

interface CommentInputProps {
  post: PostData;
}

const CommentInput = ({ post }: CommentInputProps) => {
  const [input, setInput] = useState("");
  const mutation = useSubmitCommentMutation(post.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    mutation.mutate(
      {
        post,
        content: input,
      },
      {
        onSuccess: () => setInput(""),
      }
    );
  };
  return (
    <form className="flex w-full items-center gap-2" onSubmit={handleSubmit}>
      <Input
        placeholder="Write a comment"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        disabled={!input.trim() || mutation.isPending}
      >
        {!mutation.isPending ? (
          <SendHorizontal />
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </Button>
    </form>
  );
};

export default CommentInput;
