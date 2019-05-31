export const USER_LOGIN = "USER_LOGIN";
export const IS_LOADING = "IS_LOADING";
export const FORM_STATE = "FORM_STATE";

export function setUser (user) {
  return {
    type: USER_LOGIN,
    user
  };
}

export function isLoading (isLoading) {
  return {
    type: IS_LOADING,
    isLoading
  };
}

export function initializeFormState (formData) {
  return {
    type: FORM_STATE,
    formData
  }
}
