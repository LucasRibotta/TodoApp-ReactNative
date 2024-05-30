import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import UpdateFormComponent from "./src/components/Form/UpdateForm";
import { RootStackParamList } from "./src/models/Route";
import { AddTodos, HomeScreen, UpdateTodo } from "./src/screens";

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
            component={UpdateTodo}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
