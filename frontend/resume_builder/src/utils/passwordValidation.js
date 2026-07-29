export const passwordRequirements = [
  {
    key: "length",
    label: "At least 6 characters",
    test: (password) => password.length >= 6,
  },
  {
    key: "uppercase",
    label: "One uppercase letter",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    key: "lowercase",
    label: "One lowercase letter",
    test: (password) => /[a-z]/.test(password),
  },
  {
    key: "number",
    label: "One letter or number",
    test: (password) => /[A-Za-z0-9]/.test(password),
  },
];

export const getPasswordValidationError = (password) => {
  if (!password || password.length < 6) {
    return "Password must be at least 6 characters.";
  }
  return "";
};
