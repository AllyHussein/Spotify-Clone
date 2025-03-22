import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

function SignInOAuthButtons() {
  const { signIn, isLoaded } = useSignIn();
  if (!isLoaded) return null;

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  const signInWithFacebook = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_facebook",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <Button
        onClick={signInWithGoogle}
        variant="secondary"
        className="w-full text-white border-zinc-200 h-11 p-0 cursor-pointer flex items-center"
      >
        <div className="flex w-full items-center gap-3 px-4">
          <img src="/google.png" alt="Google" className="size-5" />
          <div className="flex-1 text-center">Login With Google</div>
        </div>
      </Button>
      <Button
        onClick={signInWithFacebook}
        variant="secondary"
        className="w-full text-white border-zinc-200 h-11 p-0 cursor-pointer flex items-center"
      >
        <div className="flex w-full items-center gap-3 px-4">
          <img src="/facebook.png" alt="Facebook" className="size-5" />
          <div className="flex-1 text-center">Login With Facebook</div>
        </div>
      </Button>
    </div>
  );
}

export default SignInOAuthButtons;
