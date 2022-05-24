import { Text, View } from "react-native";
import { useFollowUpdatesSubscription } from "../generated/graphql";

const Notifications = () => {
	const { data, loading } = useFollowUpdatesSubscription();
	console.log(loading);
	console.log(data);
	return (
		<View
			style={{
				backgroundColor: "black",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text style={{ color: "white" }}>
				{!loading && data?.followUpdates?.followerName}
			</Text>
		</View>
	);
};

export default Notifications;
