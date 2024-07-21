import Image from "next/image";
import avatarPlaceholder from "../public/avatar-placeholder.png";
import { cn } from "@/lib/utils";

interface Props {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

const UserAvatar = ({ avatarUrl, size, className }: Props) => {
  return (
    <Image
      src={avatarUrl || avatarPlaceholder}
      alt="User"
      width={size ?? 48}
      height={size ?? 48}
      className={cn(
        "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
        className
      )}
    />
  );
};

export default UserAvatar;
