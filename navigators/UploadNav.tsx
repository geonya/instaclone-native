import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
	createNativeStackNavigator,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";
import { Ionicons } from "@expo/vector-icons";
import { LoggedInNavParamList } from "./LoggedInNav";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
type upLoadNavScreenProps = NativeStackScreenProps<LoggedInNavParamList>;
export type uploadNavParamList = {
	SelectPhoto: undefined;
};
const UploadNav = ({ navigation }: upLoadNavScreenProps) => {
	return (
		<Tab.Navigator
			tabBarPosition="bottom"
			screenOptions={{
				tabBarStyle: { backgroundColor: "black" },
				tabBarActiveTintColor: "white",
				tabBarIndicatorStyle: { backgroundColor: "gray", top: 0 },
			}}
		>
			<Tab.Screen name="Select">
				{() => (
					<Stack.Navigator
						screenOptions={{
							headerTintColor: "white",
							headerStyle: { backgroundColor: "black" },
						}}
					>
						<Stack.Screen
							name="SelectPhoto"
							component={SelectPhoto}
							options={{
								headerLeft: ({ tintColor }) => (
									<Ionicons
										color={tintColor}
										name="close"
										size={28}
										onPress={() => navigation.navigate("Tabs")}
									/>
								),

								title: "Choose a Photo",
							}}
						/>
					</Stack.Navigator>
				)}
			</Tab.Screen>
			<Tab.Screen name="Take" component={TakePhoto} />
		</Tab.Navigator>
	);
};

export default UploadNav;
