import { useState } from "react";
import { FlatList } from "react-native";
import RoomItem, { IRoomRenderItemProps } from "../components/Rooms/RoomItem";
import ScreenLayout from "../components/ScreenLayout";
import { Seperator } from "../components/sharedStyles";
import { useSeeRoomsQuery } from "../generated/graphql";

const Rooms = () => {
	const [refreshing, setRefreshing] = useState(false);
	const { data, loading, refetch } = useSeeRoomsQuery();
	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};
	const renderItem = (room: IRoomRenderItemProps | null) => {
		if (!room) return null;
		return <RoomItem {...room} />;
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
