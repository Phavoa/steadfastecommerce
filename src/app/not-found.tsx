import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NotFoundProps {
  title?: string;
  message?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function NotFound({
  title = "Page Not Found",
  message = "Sorry, we couldn't find the page you're looking for.",
  buttonText = "Back to Home",
  buttonLink = "/",
}: NotFoundProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          {title}
        </h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">{message}</p>
        <div className="pt-4">
          <Link href={buttonLink}>
            <Button>{buttonText}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
