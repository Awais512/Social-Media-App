"use client";

import useFollowerInfo from "@/hooks/useFollowerInfo";
import { FollowerInfo } from "@/lib/types";
import React from "react";
import { useToast } from "./ui/use-toast";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import kyInstance from "@/lib/ky";

interface Props {
  userId: string;
  initialState: FollowerInfo;
}

const FollowButton = ({ userId, initialState }: Props) => {
  const { data } = useFollowerInfo(userId, initialState);
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["follower-info", userId];
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByUser
        ? kyInstance.delete(`/api/users/${userId}/followers`)
        : kyInstance.post(`/api/users/${userId}/followers`),
    onMutate: async () => {
      const queryKey: QueryKey = ["follower-info", userId];
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : 1),
        isFollowedByUser: !previousState?.isFollowedByUser,
      }));
      return { previousState };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong...",
      });
    },
  });

  return (
    <Button
      onClick={() => mutate()}
      variant={data.isFollowedByUser ? "secondary" : "default"}
    >
      {data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
