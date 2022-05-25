import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { FlatList } from "react-native";
import PhotoBox from "../components/PhotoBox";
import ScreenLayout from "../components/ScreenLayout";
import { useSeeFeedQuery } from "../generated/graphql";
import ScreenParamList from "../navigators/screenParamList";

type FeedScreenProps = NativeStackScreenProps<ScreenParamList, "Feed">;

const Feed = ({ navigation }: FeedScreenProps) => {
	const { data, loading, refetch, fetchMore } = useSeeFeedQuery({
		variables: {
			offset: 0,
		},
	});
	const [refreshing, setRefreshing] = useState(false);
	const refresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};
	return (
		<ScreenLayout loading={loading}>
			<FlatList
				onEndReached={() =>
					fetchMore({
						variables: {
							offset: data?.seeFeed?.length,
						},
					})
				}
				onEndReachedThreshold={0.5}
				refreshing={refreshing}
				onRefresh={refresh}
				style={{ width: "100%" }}
				data={data?.seeFeed}
				keyExtractor={(_, i) => i + ""}
				renderItem={({ item }) => {
					return <PhotoBox {...item!} />;
				}}
				showsVerticalScrollIndicator={false}
			/>
		</ScreenLayout>
	);
};

export default Feed;
