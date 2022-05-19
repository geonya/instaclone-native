import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native";
import Feed from "../screens/Feed";
import Me from "../screens/Me";
import Notifications from "../screens/Notifications";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

export type StackNavFactoryParamList = {
	Feed: undefined;
	Search: undefined;
	Notifications: undefined;
	Me: undefined;
	Profile: undefined;
	Photo: undefined;
};

interface IStackNavFactoryProps {
	screenName: string;
}

const Stack = createNativeStackNavigator();

const StackNavFactory = ({ screenName }: IStackNavFactoryProps) => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "black",
				},
				headerTintColor: "white",
				headerBackTitleVisible: false,
			}}
		>
			{screenName === "Feed" ? (
				<Stack.Screen
					name="Feed"
					component={Feed}
					options={{
						headerTitle: () => (
							<Image
								style={{
									width: 150,
									height: 50,
								}}
								resizeMode="cover"
								source={require("../assets/instagram.png")}
							/>
						),
					}}
				/>
			) : null}
			{screenName === "Search" ? (
				<Stack.Screen name="Search" component={Search} />
			) : null}
			{screenName === "Notifications" ? (
				<Stack.Screen name="Notifications" component={Notifications} />
			) : null}
			{screenName === "Me" ? <Stack.Screen name="Me" component={Me} /> : null}
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="Photo" component={Photo} />
		</Stack.Navigator>
	);
};

export default StackNavFactory;
