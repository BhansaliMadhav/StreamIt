import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p>We couldn&apos;t find the page you are looking for</p>
      <p>You can go back to the home page or search for something else.</p>
      <Button variant={"secondary"} asChild>
        <Link href={"/"}>Go back home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
