import React, { useState } from "react";
// import i18n from "i18n-js";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import * as eva from "@eva-design/eva";
// import * as Localization from "expo-localization";
import { PersistGate } from "redux-persist/integration/react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import { loadFonts } from "./styles/fonts";
import { RootNav } from "./navigation/RootNav";
import store, { persistor } from "./store/index";
import { FeatherIconsPack, IoniconsPack } from "./utils";

// import en from "./translations/en.json";
// import az from "./translations/az.json";
// import ru from "./translations/ru.json";

// i18n.translations = {
//   en,
//   ru,
//   az,
// };

export default function App() {
  // i18n.locale = Localization.locale;
  // i18n.fallbacks = true;

  const [loaded, setLoaded] = useState(false);
  if (!loaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setLoaded(true)}
        onError={() => console.log("loading faileddddd")}
      />
    );
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IconRegistry icons={[FeatherIconsPack, IoniconsPack]} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <RootNav />
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  );
}
