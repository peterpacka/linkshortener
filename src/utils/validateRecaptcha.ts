export async function validateRecaptha(recaptchaToken: string) {
  const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    return false;
  }

  const json = await response.json();

  if (!json.success) {
    return false;
  }

  if (json.score < 0.7) {
    return false;
  }

  return true;
}
