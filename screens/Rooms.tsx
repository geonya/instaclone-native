import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import useMe from "../components/hooks/useMe";
import ScreenLayout from "../components/ScreenLayout";
import { FatText, Seperator, UserAvatar } from "../components/sharedStyles";
import { useSeeRoomsQuery } from "../generated/graphql";

const RoomContainer = styled.TouchableOpacity`
	padding: 15px 10px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;
const RoomText = styled.Text`
	color: white;
`;
const UsernameText = styled(FatText)`
	font-size: 16px;
`;
const RoomAvatar = styled(UserAvatar)`
	margin-right: 20px;
`;
const Column = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between; ;
`;
const Data = styled.View``;
const UnreadText = styled.Text`
	color: white;
`;
const UnreadDot = styled.View`
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: ${colors.blue};
`;

interface IRoomRenderItemProps {
	__typename?: "Room" | undefined;
	id: number;
	unreadTotal: number;
	users?:
		| ({
				__typename?: "User" | undefined;
				username: string;
				avatar?: string | null | undefined;
		  } | null)[]
		| null
		| undefined;
}

const Rooms = () => {
	const [refreshing, setRefreshing] = useState(false);
	const { data, loading, refetch } = useSeeRoomsQuery();
	const { data: meData } = useMe();
	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};
	const renderItem = (room: IRoomRenderItemProps | null) => {
		if (!room) return null;
		const notMe = room?.users?.find(
			(user) => user?.username !== meData?.seeMe?.username
		);
		return (
			<RoomContainer>
				<Column>
					<RoomAvatar
						size={40}
						source={{
							uri:
								notMe?.avatar ||
								"https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png",
						}}
					/>
					<Data>
						<UsernameText>{notMe?.username}</UsernameText>
						<UnreadText>
							{room?.unreadTotal} unread{" "}
							{room?.unreadTotal === 1 ? "message" : "message"}
						</UnreadText>
					</Data>
				</Column>
				<Column>{room.unreadTotal > 0 ? <UnreadDot /> : null}</Column>
			</RoomContainer>
		);
	};
	return (
		<ScreenLayout loading={loading}>
			<FlatList
				refreshing={refreshing}
				onRefresh={onRefresh}
				style={{ width: "100%" }}
				data={data?.seeRooms}
				ItemSeparatorComponent={() => <Seperator />}
				keyExtractor={(_, i) => i + ""}
				renderItem={({ item }) => renderItem(item)}
			/>
		</ScreenLayout>
	);
};

export default Rooms;
