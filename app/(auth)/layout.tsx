import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return <>{children}</>;
};

export default AuthLayout;