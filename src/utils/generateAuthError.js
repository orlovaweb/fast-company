export function generateAuthError(message) {
  switch (message) {
    case "EMAIL_NOT_FOUND":
    case "INVALID_PASSWORD":
      return "Email или пароль введены неверно";
    case "EMAIL_EXISTS":
      return "Пользователь с таким Email уже существует";
    default:
      return "Слишком много попыток входа. Попробуйте позднее.";
  }
}
