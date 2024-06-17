import { useAuth } from "@/src/hooks/useAuth";
import Button from "@/src/components/Button/Button";
import GoogleIcon from "@/src/icons/GoogleIcon";
import FacebookIcon from "@/src/icons/FacebookIcon";

export default function SignInOAuthButtons() {
  const { handleLoginWithProvider } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="white"
        size="full"
        icon={<GoogleIcon />}
        onClick={() => handleLoginWithProvider("google")}
      >
        Sign In with Google
      </Button>

      <Button
        variant="facebook"
        size="full"
        icon={<FacebookIcon />}
        onClick={() => handleLoginWithProvider("facebook")}
      >
        Sign In with Facebook
      </Button>

      <div className="flex items-center gap-4">
        <div className="h-px w-full bg-gray-light dark:bg-dark-medium"></div>
        <h2 className="text-body-variant md:text-heading-s-variant my-6 text-center">
          or
        </h2>
        <div className="h-px w-full bg-gray-light dark:bg-dark-medium"></div>
      </div>
    </div>
  );
}
