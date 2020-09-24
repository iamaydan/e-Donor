type Theme = {
  dark: boolean;
  colors: {
    background: string;
    card: string;
    border: string;
    tabbarActive: string;
    tabbarBG: string;
    tabbarTint: string;
    inputBG: string;
    inputBorder: string;
    inputText: string;
    divider: string;
    text: string;
    secondaryText: string;
    link: string;
    lastMsg: string;
    btnText: string;
    btnBG: string;
    drawerBG: string;
    chatBG: string;
    myMsg: string;
    otherMsg: string;
    time: string;
    cardBG: string;
    bloodBG: string;
    chatFormBG: string;
  };
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    background: "#000",
    card: "#0b0d17",
    border: "#999999",
    tabbarActive: "#222b45",
    tabbarBG: "#0b0d17",
    tabbarTint: "#ff6767",
    inputBG: "#1a2138",
    inputBorder: "#25324b",
    inputText: "#8f9bb3",
    divider: "#fff",
    text: "#fff",
    secondaryText: "#dadada",
    link: "#007aff",
    lastMsg: "#dadada",
    btnText: "#000",
    btnBG: "grey",
    drawerBG: "#222b45",
    chatBG: "#171717",
    myMsg: "#859bde",
    otherMsg: "#3c3c3e",
    time: "#ffffff80",
    cardBG: "#1a2138",
    bloodBG: "#0b0d17",
    chatFormBG: "#1a2138",
  },
};

export const LightTheme: Theme = {
  dark: false,
  colors: {
    background: "#fff",
    card: "#f2f1f7",
    border: "#999999",
    tabbarActive: "#ff6767",
    tabbarBG: "#f2f1f7",
    tabbarTint: "#fff",
    inputBG: "#f7f9fc",
    inputBorder: "#e4e9f2",
    inputText: "#8f9bb3",
    divider: "#101426",
    text: "#000",
    secondaryText: "#8f9bb3",
    link: "#0070c9",
    lastMsg: "#1c1c1e",
    btnText: "#000",
    btnBG: "#ff6767",
    drawerBG: "#eeeeef",
    chatBG: "#f6f6f6",
    myMsg: "#859bde",
    otherMsg: "#f7f7f7",
    time: "#00000080",
    cardBG: "#ebedf1",
    bloodBG: "#fff",
    chatFormBG: "#fff",
  },
};
