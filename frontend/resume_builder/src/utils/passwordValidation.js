export const passwordRequirements = [
  {
    key: "length",
    label: "At least 8 characters",
    test: (password) => password.length >= 8,
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
    label: "One number",
    test: (password) => /\d/.test(password),
  },
  {
    key: "special",
    label: "One special character",
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

export const getPasswordValidationError = (password) => {
  const missingRequirement = passwordRequirements.find(
    (requirement) => !requirement.test(password),
  );

  return missingRequirement
    ? `Password must contain ${missingRequirement.label.toLowerCase()}.`
    : "";
};