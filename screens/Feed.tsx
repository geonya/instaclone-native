import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import PhotoBox from "../components/PhotoBox";
import ScreenLayout from "../components/ScreenLayout";
import { useSeeFeedQuery } from "../generated/graphql";
import ScreenParamList from "../navigators/screenParamList";
import { Ionicons } from "@expo/vector-icons";

type FeedScreenProps = NativeStackScreenProps<ScreenParamList, "Feed">;

const Feed = ({ navigation }: FeedScreenProps) => {
	const { data, loading, refetch, fetchMore } = useSeeFeedQuery({
		variables: {
			offset: 0,
		},
	});
	const [refreshing, setRefreshing] = useState(false);
	const refresh = async () => {
		if (!refreshing) {
			setRefreshing(true);
			await refetch();
			setRefreshing(false);
		}
	};
	const MessagesButton = () => (
		<TouchableOpacity
			style={{ marginRight: 25 }}
			onPress={() => navigation.navigate("Messages")}
		>
			<Ionicons name="paper-plane" color="white" size={20} />
		</TouchableOpacity>
	);
	useEffect(() => {
		navigation.setOptions({
			headerRight: MessagesButton,
		});
	}, []);
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
