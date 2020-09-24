const SET_THEME = "SET_THEME";
const SET_LANGUAGE = "SET_LANGUAGE";

export const MODULE_NAME = "settings";

export const getTheme = (state) => state[MODULE_NAME].theme;
export const getLanguage = (state) => state[MODULE_NAME].language;

const initialState = { language: "english", theme: "dark" };

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_THEME:
      return {
        ...state,
        theme: payload,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: payload,
      };
    default:
      return state;
  }
}

export const setTheme = (payload) => ({
  type: SET_THEME,
  payload,
});

export const setLanguage = (payload) => ({
  type: SET_LANGUAGE,
  payload,
});
