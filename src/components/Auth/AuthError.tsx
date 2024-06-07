export default function AuthError({ errorCode }: { errorCode: string }) {
  let errorMessage = "Oops! Something went wrong.";

  switch (errorCode) {
    case "auth/invalid-credential":
      errorMessage =
        "Invalid email or password. Please check your credentials and try again.";
      break;
    case "auth/user-disabled":
      errorMessage =
        "Your account has been disabled. Please contact support for further assistance.";
      break;
    case "auth/too-many-requests":
      errorMessage =
        "Requests are blocked due to unusual activity. Please try again later.";
      break;
    case "auth/network-request-failed":
      errorMessage =
        "A network error has occurred. Please check your internet connection and try again.";
      break;
    case "auth/email-already-in-use":
      errorMessage =
        "This email is already in use. Please sign in with this email or use a different one.";
      break;
    case "auth/weak-password":
      errorMessage =
        "The password provided is too weak. Please choose a stronger password.";
      break;
    case "auth/invalid-email":
      errorMessage =
        "The email provided is invalid. Please check the email address and try again.";
      break;
    case "auth/operation-not-allowed":
      errorMessage =
        "Registration is currently not allowed. Please try again later or contact support.";
      break;
    case "auth/account-exists-with-different-credential":
      errorMessage =
        "It looks like you already have an account with a different sign-in method. Please choose another method to link your existing account.";

    default:
  }

  return (
    <p className="text-red-medium mt-4 text-heading-s-variant font-medium">
      {errorMessage}
    </p>
  );
}
