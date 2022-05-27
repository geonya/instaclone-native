import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenParamList from "../navigators/screenParamList";
import { useSeeRoomQuery } from "../generated/graphql";
type RoomScreenProps = NativeStackScreenProps<ScreenParamList, "Room">;
const Room = ({ route, navigation }: RoomScreenProps) => {
	const { data, loading } = useSeeRoomQuery({
		variables: {
			id: route.params.id,
		},
	});
	console.log(JSON.stringify(data, null, 4));
	useEffect(() => {
		navigation.setOptions({
			title: `${route.params.talkingTo?.username}`,
			headerLeft: ({ tintColor }) => (
				<Ionicons
					color={tintColor}
					name="chevron-back"
					size={28}
					onPress={() => navigation.goBack()}
				/>
			),
		});
	}, []);
	return (
		<View>
			<Text>Messages List</Text>
		</View>
	);
};

export default Room;
