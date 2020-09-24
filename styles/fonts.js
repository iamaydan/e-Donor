import * as Font from "expo-font";

import OpenSansRegular from "../assets/fonts/OpenSans-Regular.ttf";
import OpenSansSemiBold from "../assets/fonts/OpenSans-SemiBold.ttf";
import OpenSansBold from "../assets/fonts/OpenSans-Bold.ttf";

export const loadFonts = () => {
  return Font.loadAsync({
    OpenSansRegular,
    OpenSansSemiBold,
    OpenSansBold,
  });
};

export const FONT_FAMILIES = Object.freeze({
  regular: "OpenSansRegular",
  semi: "OpenSansSemiBold",
  bold: "OpenSansBold",
});
