import { Text, View } from "react-native";

const Likes = () => {
	return (
		<View
			style={{
				backgroundColor: "black",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text style={{ color: "white" }}>Likes</Text>
		</View>
	);
};

export default Likes;
