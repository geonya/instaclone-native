import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity, View } from "react-native";
import { isLoggedInVar } from "../apollo";

const Feed = () => {
	return (
		<View>
			<Text>Hello</Text>
			<TouchableOpacity
				onPress={async () => {
					await AsyncStorage.multiRemove(["token", "loggedIn"]);
					isLoggedInVar(false);
				}}
			>
				<Text>LogOut</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Feed;
