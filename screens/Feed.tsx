import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity, View } from "react-native";
import { isLoggedInVar, tokenVar } from "../apollo";
import AuthButton from "../components/auth/AuthButton";

const Feed = () => {
	return (
		<View
			style={{
				backgroundColor: "black",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text style={{ color: "white" }}>Feed</Text>
			<AuthButton
				text="Log Out"
				onPress={async () => {
					await AsyncStorage.multiRemove(["token", "loggedIn"]);
					tokenVar("");
					isLoggedInVar(false);
				}}
			/>
		</View>
	);
};

export default Feed;
