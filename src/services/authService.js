import axiosInstance from "../utils/axiosInstance";

export const registerUser = async (name, email, password) => {
  const apiResult = { success: false, message: "" };

  await axiosInstance
    .post("auth/register", {
      name,
      email,
      password,
    })
    .then((response) => {
      apiResult.success = true;
    })
    .catch((err) => {
      apiResult.message = err?.response?.statusText;
    });

  return apiResult;
};

export const loginUser = async (email, password) => {
  const apiResult = { success: false, message: "" };

  await axiosInstance
    .post("auth/login", {
      email,
      password,
    })
    .then((response) => {
      apiResult.success = true;
    })
    .catch((err) => {
      apiResult.message = err?.response?.statusText;
    });

  return apiResult;
};

export const loginWithGoogle = async () => {
  const apiResult = { success: false, message: "" };

  await axiosInstance
    .get("auth/google")
    .then((response) => {
      apiResult.success = true;
    })
    .catch((err) => {
      apiResult.message = err?.response?.statusText;
    });

  return apiResult;
};

export const logout = async () => {
  const apiResult = { success: false, message: "" };

  await axiosInstance
    .get("auth/logout")
    .then((response) => {
      apiResult.success = true;
    })
    .catch((err) => {
      apiResult.message = err?.response?.statusText;
    });

  return apiResult;
};
