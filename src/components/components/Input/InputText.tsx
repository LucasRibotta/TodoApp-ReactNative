import { ReactNode } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface Props {
  title: string;
  placeholder: string;
  placeholderColor: string;
  value: string;
  onChangeText: (text: string) => void;
  children?: ReactNode;
}

function InputComponent({
  title,
  placeholder,
  placeholderColor,
  value,
  onChangeText,
  children,
}: Props) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>{title}</Text>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={300}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        onChangeText={onChangeText}
        value={value}
        style={[styles.textInput, { padding: 10 }]}
      />
      {children}
    </View>
  );
}

export default InputComponent;

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: "#00000030",
    borderBottomWidth: 0.5,
    width: "100%",
    height: 50,
  },
  inputTitle: {
    fontSize: 25,
    fontWeight: "600",
  },
  inputContainer: {
    justifyContent: "space-between",
    flexDirection: "column",
    paddingVertical: 20,
    gap: 10,
  },
});
