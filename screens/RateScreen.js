import React from "react";
import { Alert } from "react-native";
import { Rating } from "react-native-elements";
import { useTheme } from "@react-navigation/native";

import { Container } from "./../commons";
import { TCustomText, CustomBtn } from "../components";
import { getWidthByPercents } from "./../utils/getWidthByPercents";

export const RateScreen = () => {
  const { colors } = useTheme();
  return (
    <Container>
      <TCustomText style={{ fontSize: 16, paddingVertical: 20 }}>
        rate_it
      </TCustomText>

      <Rating
        type="custom"
        showRating
        startingValue={5}
        ratingCount={5}
        size={20}
        tintColor={colors.background}
        ratingBackgroundColor="#f2f4f8"
        style={{ paddingBottom: 50 }}
      />
      <CustomBtn
        title="submit"
        width={getWidthByPercents(80, 2)}
        onPress={() => Alert.alert(i18n.t("thanks_for_support"))}
      />
    </Container>
  );
};
