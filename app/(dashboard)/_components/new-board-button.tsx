"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/user-api-mutation";
import { cn } from "@/lib/utils";
// import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  // const create = useMutation(api.board.create);

  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    mutate({
      orgId: orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board Createad");
        // todo redirect to board/id
      })
      .catch((err) => {
        toast.error("Failed to create board");
      });
    // create({
    //   orgId: orgId,
    //   title: "Untitled",
    // });
  };

  return (
    <button
      disabled={disabled || pending}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (pending || disabled) &&
          "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-10 w-10 text-white stroke-1" />
      <p className="text-xs text-white font-light">New Board</p>
    </button>
  );
};
