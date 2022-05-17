import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccount from "../screens/CreateAccount";
import Login from "../screens/Login";
import Welcome from "../screens/Welcome";

export type StackParamList = {
	Welcome: undefined;
	Login: undefined;
	CreateAccount: undefined;
};

const LoggedOutNav = () => {
	const Stack = createNativeStackNavigator<StackParamList>();

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Welcome"
				component={Welcome}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="CreateAccount" component={CreateAccount} />
		</Stack.Navigator>
	);
};

export default LoggedOutNav;
