import axios from "./axios";

export async function signUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}) {
  const response = await axios.post(`/auth/signUp`, {
    email,
    nickname,
    password,
    passwordConfirmation,
  });
  const { user } = response.data;
  return { user };
}

export async function signIn(data) {
  const response = await axios.post(`/auth/signIn`, data);
  const { user } = response.data;
  return { user };
}

export async function getMe() {
  const response = await axios.get(`/users/me`);
  const user = response.data;
  return user;
}
