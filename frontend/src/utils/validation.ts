import { nameRegex, emailRegex } from "../constants";

type SignupValidation = Partial<{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  department: string;
  education: string;
  description: string;
  experience: string;
  lisenceCertificate: string;
}>;

const validateSignUp = (values: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  department: string;
  education: string;
  description: string;
  experience: string;
  lisenceCertificate: File | null;
}) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
    department,
    education,
    description,
    experience,
    lisenceCertificate
  } = values;
  const errors: SignupValidation = {};

  // Name Validation
  if (!name.trim().length) {
    errors.name = "Required";
  } else if (name.length > 20) {
    errors.name = "Must be 20 characters or less.";
  } else if (!nameRegex.test(name)) {
    errors.name = "First letter must be capital and no leading or trailing spaces.";
  }

  // Email Validation
  if (!email.trim().length) {
    errors.email = "Required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format";
  }

  // Password Validation
  if (!password.trim().length) {
    errors.password = "Required*";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    errors.password = "Password must contain uppercase and lowercase letters.";
  } else if (!/\d/.test(password)) {
    errors.password = "Password must contain at least one digit.";
  } else if (!/[@$!%*?&]/.test(password)) {
    errors.password = "Password must contain at least one special character.";
  }

  // Confirm Password Validation
  if (!confirmPassword.trim().length) {
    errors.confirmPassword = "Required*";
  } else if (confirmPassword.length !== password.length || confirmPassword !== password) {
    errors.confirmPassword = "Password is not matching";
  }

  // Phone Number Validation
  if (!phoneNumber.trim().length) {
    errors.phoneNumber = "Required*";
  } else if (!/^\d{10}$/.test(phoneNumber)) {
    errors.phoneNumber = "Phone number must be 10 digits long.";
  }

  // Department Validation
  if (!department.trim().length) {
    errors.department = "Required*";
  } // Add additional validation rules for department if needed

  // Education Validation
  if (!education.trim().length) {
    errors.education = "Required*";
  } else if (/[^a-zA-Z0-9]/.test(education)) {
    errors.education = "Only alphanumeric characters allowed.";
  }

  // Description Validation
  if (!description.trim().length) {
    errors.description = "Required*";
  } // Add additional validation rules for description if needed

  // Experience Validation
  if (!experience.trim().length) {
    errors.experience = "Required*";
  } // Add additional validation rules for experience if needed

  // Lisence Certificate Validation
  if (!lisenceCertificate) {
    errors.lisenceCertificate = "Required*";
  } // Add additional validation rules for lisence certificate if needed

  return errors;
};

function validateLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const errors: { email?: string; password?: string } = {};
  if (!email.trim().length) {
    errors.email = "Required*";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format.";
  }
  if (!password.trim().length) {
    errors.password = "Password is Required*";
  }
  return errors;
}

const validateResetPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => {
  let errors: { password?: string; confirmPassword?: string } = {};

  if (!password.trim().length) {
    errors.password = "Required*";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    errors.password = "Password must contain uppercase and lowercase letters.";
  } else if (!/\d/.test(password)) {
    errors.password = "Password must contain at least one digit.";
  } else if (!/[@$!%*?&]/.test(password)) {
    errors.password = "Password must contain at least one special character.";
  }

  // Confirm Password Validation
  if (!confirmPassword.trim().length) {
    errors.confirmPassword = "Required*";
  } else if (confirmPassword.length !== password.length || confirmPassword !== password) {
    errors.confirmPassword = "Password is not matching";
  }
  return errors;
};

export {
  validateSignUp,
  validateLogin,
  validateResetPassword,
};
