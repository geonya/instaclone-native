import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UploadForm from '../screens/UploadForm';
import TabsNav from './TabsNav';
import UploadNav from './UploadNav';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MessagesNav from './MessagesNav';

const Stack = createNativeStackNavigator();

const LoggedInNav = () => {
	const navigation = useNavigation();
	return (
		<Stack.Navigator
			screenOptions={{
				presentation: 'modal',
				contentStyle: { backgroundColor: 'black' },
			}}
		>
			<Stack.Screen
				name='Tabs'
				options={{ headerShown: false }}
				component={TabsNav}
			/>
			<Stack.Screen
				name='Upload'
				options={{ headerShown: false }}
				component={UploadNav}
			/>
			<Stack.Screen
				name='UploadForm'
				options={{
					headerBackTitleVisible: false,
					title: 'Upload Photo',

					headerTintColor: 'white',
					headerStyle: { backgroundColor: 'black' },
					headerLeft: ({ tintColor }) => (
						<Ionicons
							color={tintColor}
							name='close'
							size={28}
							onPress={() => navigation.goBack()}
						/>
					),
				}}
				component={UploadForm}
			/>
			<Stack.Screen
				name='Messages'
				component={MessagesNav}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

export default LoggedInNav;
