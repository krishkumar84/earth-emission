import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return(
    <div className="flex h-full mt-24 items-center justify-center">
  <SignIn />
 </div>
)

}