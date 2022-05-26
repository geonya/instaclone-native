import { FlatList, Text, View } from "react-native";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";
import { useSeeRoomsQuery } from "../generated/graphql";

const RoomContainer = styled.View``;
const RoomText = styled.Text`
	color: white;
`;
const Rooms = () => {
	const { data, loading } = useSeeRoomsQuery();
	return (
		<ScreenLayout loading={loading}>
			<FlatList
				data={data?.seeRooms}
				keyExtractor={(_, i) => i + ""}
				renderItem={({ item }) => (
					<RoomContainer>
						<RoomText>
							{item?.unreadTotal === 0
								? "Name of the other persone"
								: `${item?.unreadTotal} ${
										item?.unreadTotal === 1 ? "message" : "messages"
								  }`}
						</RoomText>
					</RoomContainer>
				)}
			/>
		</ScreenLayout>
	);
};

export default Rooms;
