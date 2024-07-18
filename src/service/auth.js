import { apiCall } from "@/utils/supa";

const authPayload = {
    email: 'tatahi2923@sablecc.com',
    password: '!qwertypad123'
}

const login = async () => {
  const resp = await apiCall.auth.signInWithPassword(authPayload);
  return resp;
};

const signUp = async () => {
  const resp = await apiCall.auth.signUp(authPayload);
  return resp;
};

const logout = async () => {
  const resp = await apiCall.auth.signOut();
  return resp;
};

const resetPassword = async (email, redirectTo) => {
  const resp = await apiCall.auth.resetPasswordForEmail(email, { redirectTo });
  return resp;
};

const updatePassword = async (newPassword) => {
  const resp = await apiCall.auth.updateUser({ password: newPassword });
  return resp;
};

const authService = {
  login,
  signUp,
  logout,
  resetPassword,
  updatePassword,
};

export default authService;
