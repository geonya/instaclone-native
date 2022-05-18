import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Feed from "../screens/Feed";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";

const Tabs = createBottomTabNavigator();

const LoggedInNav = () => {
	return (
		<Tabs.Navigator
			screenOptions={{
				tabBarActiveTintColor: "white",
				tabBarShowLabel: false,
				tabBarStyle: {
					borderTopColor: "rgba(255,255,255,0.5)",
					backgroundColor: "black",
				},
			}}
		>
			<Tabs.Screen
				name="Feed"
				component={Feed}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon name="home" focused={focused} color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="Search"
				component={Search}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon
							name="search"
							focused={focused}
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="Camera"
				component={View}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon
							name="camera"
							focused={focused}
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="Notifications"
				component={Notifications}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon name="heart" focused={focused} color={color} size={size} />
					),
				}}
			/>

			<Tabs.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon
							name="person"
							focused={focused}
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tabs.Navigator>
	);
};

export default LoggedInNav;
