import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import useMe from '../components/hooks/useMe';
import TabIcon from '../components/nav/TabIcon';
import { UserAvatar } from '../components/sharedStyles';
import SharedStackNav from './SharedStackNav';

const Tabs = createBottomTabNavigator();

const TabsNav = () => {
	const { data } = useMe();
	return (
		<Tabs.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: 'white',
				tabBarShowLabel: false,
				tabBarStyle: {
					borderTopColor: 'rgba(255,255,255,0.5)',
					backgroundColor: 'black',
				},
			}}
		>
			<Tabs.Screen
				name='TabFeed'
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon name='home' focused={focused} color={color} size={size} />
					),
				}}
			>
				{() => <SharedStackNav screenName='Feed' />}
			</Tabs.Screen>
			<Tabs.Screen
				name='TabSearch'
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon
							name='search'
							focused={focused}
							color={color}
							size={size}
						/>
					),
				}}
			>
				{() => <SharedStackNav screenName='Search' />}
			</Tabs.Screen>
			<Tabs.Screen
				name='Camera'
				component={View}
				listeners={({ navigation }) => {
					return {
						tabPress: (e) => {
							e.preventDefault();
							navigation.navigate('Upload');
						},
					};
				}}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon
							name='camera'
							focused={focused}
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='TabNotifications'
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<TabIcon name='heart' focused={focused} color={color} size={size} />
					),
				}}
			>
				{() => <SharedStackNav screenName='Notifications' />}
			</Tabs.Screen>

			<Tabs.Screen
				name='TabMe'
				options={{
					tabBarIcon: ({ focused, color, size }) =>
						data?.seeMe?.avatar ? (
							<UserAvatar
								size={30}
								resizeMode='cover'
								source={{ uri: data?.seeMe?.avatar }}
								style={{
									...(focused && { borderColor: 'white', borderWidth: 2 }),
								}}
							/>
						) : (
							<TabIcon
								name='person'
								focused={focused}
								color={color}
								size={size}
							/>
						),
				}}
			>
				{() => <SharedStackNav screenName='Me' />}
			</Tabs.Screen>
		</Tabs.Navigator>
	);
};

export default TabsNav;
