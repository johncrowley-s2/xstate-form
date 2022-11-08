export const onSubmit = async ({ values }) => {
  await new Promise((r) => setTimeout(r, 1000));

  const errors = {};

  if (!values.firstName) {
    errors.firstName = "You must enter first name...";
  }

  if (!values.lastName) {
    errors.lastName = "You must enter last name...";
  }

  if (!values.favoriteColor) {
    errors.favoriteColor = "You must enter favorite color...";
  }

  if (Object.keys(errors).length > 0) {
    return Promise.reject(errors);
  }
  return true;
};
