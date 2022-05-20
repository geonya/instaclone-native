import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";
import { useSeePhotoLikesQuery } from "../generated/graphql";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";

type LikesScreenProps = NativeStackScreenProps<
	StackNavFactoryParamList,
	"Likes"
>;
const Likes = ({ route }: LikesScreenProps) => {
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
				data={data?.seePhotoLikes}
				keyExtractor={(_, i) => i + ""}
				renderItem={({ item }) => {
					return <UserRow {...item} />;
				}}
			/>
		</ScreenLayout>
	);
};

export default Likes;
