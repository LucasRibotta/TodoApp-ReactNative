import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

interface Props {
  children: ReactNode;
  onFunction: () => void;
}

function ButtonIcon({ children, onFunction }: Props) {
  return <TouchableOpacity onPress={onFunction}>{children}</TouchableOpacity>;
}

export default ButtonIcon;
