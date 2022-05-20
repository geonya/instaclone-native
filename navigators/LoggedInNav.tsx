import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import StackNavFactory from "./StackNavFactory";

const Tabs = createBottomTabNavigator();

const LoggedInNav = () => {
	return (
		<Tabs.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "white",
				tabBarShowLabel: false,
				tabBarStyle: {
					borderTopColor: "rgba(255,255,255,0.5)",
					backgroundColor: "black",
				},
			}}
		>
			<Tabs.Screen
				name="TabFeed"
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon name="home" focused={focused} color={color} size={size} />
					),
				}}
			>
				{() => <StackNavFactory screenName="Feed" />}
			</Tabs.Screen>
			<Tabs.Screen
				name="TabSearch"
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
			>
				{() => <StackNavFactory screenName="Search" />}
			</Tabs.Screen>
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
				name="TabNotifications"
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon name="heart" focused={focused} color={color} size={size} />
					),
				}}
			>
				{() => <StackNavFactory screenName="Notifications" />}
			</Tabs.Screen>

			<Tabs.Screen
				name="TabMe"
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
			>
				{() => <StackNavFactory screenName="Me" />}
			</Tabs.Screen>
		</Tabs.Navigator>
	);
};

export default LoggedInNav;
