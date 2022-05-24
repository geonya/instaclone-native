import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";

const Stack = createNativeStackNavigator();

export type LoggedInNavParamList = {
	Tabs: undefined;
	Upload: undefined;
};

const LoggedInNav = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				presentation: "modal",
				contentStyle: { backgroundColor: "black" },
			}}
		>
			<Stack.Screen name="Tabs" component={TabsNav} />
			<Stack.Screen name="Upload" component={UploadNav} />
		</Stack.Navigator>
	);
};

export default LoggedInNav;
