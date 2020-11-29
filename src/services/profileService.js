import axiosInstance from "../utils/axiosInstance";

export const getUserInfo = async (name, email, password) => {
  const apiResult = { success: false, message: "", data: {} };

  await axiosInstance
    .get("data/profile")
    .then((response) => {
      apiResult.success = true;
      apiResult.data = response?.data;
    })
    .catch((err) => {
      apiResult.message = err?.response?.statusText;
    });

  return apiResult;
};
