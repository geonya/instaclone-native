import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Room from "../screens/Room";
import Rooms from "../screens/Rooms";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const MessagesNav = () => {
	const navigation = useNavigation();
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: "black" },
				headerTintColor: "white",
			}}
		>
			<Stack.Screen
				name="Rooms"
				component={Rooms}
				options={{
					headerLeft: ({ tintColor }) => (
						<Ionicons
							color={tintColor}
							name="close"
							size={28}
							onPress={() => navigation.goBack()}
						/>
					),
				}}
			/>
			<Stack.Screen name="Room" component={Room} />
		</Stack.Navigator>
	);
};

export default MessagesNav;
