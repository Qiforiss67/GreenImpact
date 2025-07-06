export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, '');
};

export const validateActivityData = (activity) => {
  return activity.title && activity.points > 0 && activity.sdg;
};