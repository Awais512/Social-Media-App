"use client";
import { Button } from "@/components/ui/button";
import { UserData } from "@/lib/types";
import { useState } from "react";
import EditProfileDialog from "./EditProfileDialog";

interface Props {
  user: UserData;
}

const EditProfileButton = ({ user }: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setShowDialog(true)}>
        Edit Profile
      </Button>
      <EditProfileDialog
        user={user}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
};

export default EditProfileButton;
