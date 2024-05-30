import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddTodos, HomeScreen } from "./screens";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import UpdateFormComponent from "./components/Form/UpdateForm";
import { RootStackParamList } from "./models/Route";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ presentation: "modal", headerShown: false }}
            name="Add"
            component={AddTodos}
          />
          <Stack.Screen
            options={{ presentation: "modal", headerShown: false }}
            name="Update"
            component={UpdateFormComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
