import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";

const Tabs = createBottomTabNavigator();

const LoggedInNav = () => {
	return (
		<Tabs.Navigator>
			<Tabs.Screen name="Feed" component={Feed} />
		</Tabs.Navigator>
	);
};

export default LoggedInNav;
