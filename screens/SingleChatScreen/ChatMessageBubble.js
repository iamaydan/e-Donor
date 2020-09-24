import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";

import { CustomText } from "../../components";
import { getMessageTime } from "../../utils/getMessageTime";

export const ChatMessageBubble = ({ message, userID }) => {
  const { text, author_id, time } = message;
  const [show, setShow] = useState(false);

  const isMyMsg = userID === author_id;
  const { colors } = useTheme();
  const companionBubble = {
    alignSelf: "flex-start",
    backgroundColor: colors.otherMsg,
    borderBottomEndRadius: 18,
  };
  const myBubble = {
    alignSelf: "flex-end",
    backgroundColor: colors.myMsg,
    borderBottomStartRadius: 18,
  };
  const bubbleStyles = [styles.bubble];
  if (isMyMsg) bubbleStyles.push(myBubble);
  else bubbleStyles.push(companionBubble);

  const showTime = () => setShow((v) => !v);

  return (
    <View style={[styles.container, { opacity: show ? 0.6 : 1 }]}>
      {show && (
        <CustomText
          weight="semi"
          style={{ ...styles.time, ...{ color: colors.time } }}
        >
          {getMessageTime(time)}
        </CustomText>
      )}
      <TouchableWithoutFeedback onLongPress={showTime} onPressOut={showTime}>
        <View style={bubbleStyles}>
          <CustomText
            weight="semi"
            style={{
              ...styles.text,
              ...{ color: !isMyMsg ? colors.text : "#fff" },
            }}
          >
            {text}
          </CustomText>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  bubble: {
    maxWidth: "75%",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderTopEndRadius: 18,
    borderTopStartRadius: 18,
  },
  text: {
    fontSize: 15,
  },
  time: {
    margin: 5,
    fontSize: 10,
    textAlign: "center",
  },
});
