import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";
import { Seperator } from "../components/sharedStyles";
import UserRow from "../components/UserRow";
import { useSeePhotoLikesQuery } from "../generated/graphql";
import ScreenParamList from "../navigators/screenParamList";

type LikesScreenProps = NativeStackScreenProps<ScreenParamList, "Likes">;

const Likes = ({ navigation, route }: LikesScreenProps) => {
	const [refreshing, setRefreshing] = useState(false);
	const { data, loading, refetch } = useSeePhotoLikesQuery({
		variables: {
			id: route?.params?.photoId,
		},
		skip: !route?.params?.photoId,
	});
	const refresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};
	return (
		<ScreenLayout loading={loading}>
			<FlatList
				refreshing={refreshing}
				onRefresh={refresh}
				ItemSeparatorComponent={() => <Seperator />}
				data={data?.seePhotoLikes}
				keyExtractor={(_, i) => i + ""}
				renderItem={({ item }) => {
					return <UserRow {...item!} navigation={navigation} />;
				}}
			/>
		</ScreenLayout>
	);
};

export default Likes;
