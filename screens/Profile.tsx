import { Text, View } from "react-native";

const Profile = () => {
	return (
		<View
			style={{
				backgroundColor: "black",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text style={{ color: "white" }}>Someone's Profile</Text>
		</View>
	);
};

export default Profile;
