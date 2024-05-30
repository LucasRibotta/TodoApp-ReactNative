import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Add: undefined;
  Update: { id: number };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;
export type AddScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Add"
>;
export type UpdateScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Update"
>;
export type UpdateScreenRouteProp = RouteProp<RootStackParamList, "Update">;
