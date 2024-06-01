import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 40,
    backgroundColor: "#F1ECEA30",
    height: "auto",
  },
  containerForm: {
    maxWidth: 500,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#F1ECEA30",
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: "auto",
  },
  containerWeb: {
    maxWidth: 700,
    paddingHorizontal: 50,
    paddingVertical: 50,
    justifyContent: "center",
  },
});

export const text = StyleSheet.create({
  sm: {
    fontSize: 14,
  },
  xs: {
    fontSize: 18,
  },
  base: {
    fontSize: 24,
  },
  lg: {
    fontSize: 28,
  },
  xl: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 35,
    paddingTop: 50,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
