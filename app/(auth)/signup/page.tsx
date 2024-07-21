import { Metadata } from "next";
import Image from "next/image";

import signupImg from "../../../public/signup-image.jpg";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Signup",
};

const Page = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card shadow-2xl">
        <div className="md:w-1/2 space-y-10 w-full overflow-y-auto p-10">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Sign up to bugbook</h1>
            <p className="text-muted-foreground">
              A place where <span className="italic">you</span> find real friend
            </p>
          </div>
          <div className="space-y-5">
            <SignUpForm />
            <Link href="/login" className="block text-center hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>
        <Image
          src={signupImg}
          alt="Signup"
          className="w-1/2 hidden md:block object-cover"
        />
      </div>
    </main>
  );
};

export default Page;