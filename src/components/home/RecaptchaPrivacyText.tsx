import Link from "next/link";

export const RecaptchaPrivacyText = () => {
  return (
    <div className="text-neutral-500">
      This site is protected by reCAPTCHA and the Google{" "}
      <Link
        className="text-blue-500/55 hover:underline"
        rel="noopener noreferrer"
        target="_blank"
        href="https://policies.google.com/privacy"
      >
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link
        className="text-blue-500/55 hover:underline"
        rel="noopener noreferrer"
        target="_blank"
        href="https://policies.google.com/terms"
      >
        Terms of Service
      </Link>{" "}
      apply.
    </div>
  );
};
