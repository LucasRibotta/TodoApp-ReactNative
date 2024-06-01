import { ReactNode } from "react";
import { TouchableOpacity, StyleSheet, Platform } from "react-native";

interface Props {
  children: ReactNode;
  onFunction: () => void;
}

function ButtonComponent({ children, onFunction }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, Platform.OS === "web" && styles.webButton]}
      onPress={onFunction}
    >
      {children}
    </TouchableOpacity>
  );
}

export default ButtonComponent;

const styles = StyleSheet.create({
  webButton: {
    width: "100%",
  },
  button: {
    marginTop: 30,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    height: 46,
    borderRadius: 11,
  },
});
