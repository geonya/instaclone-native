import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList } from "react-native";
import PhotoList from "../components/PhotoList";
import ScreenLayout from "../components/ScreenLayout";
import { useSeeFeedQuery } from "../generated/graphql";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";

type SearchScreenProps = NativeStackScreenProps<
	StackNavFactoryParamList,
	"Feed"
>;

const Feed = ({ navigation }: SearchScreenProps) => {
	const { data, loading } = useSeeFeedQuery();
	return (
		<ScreenLayout loading={loading}>
			<FlatList
				style={{ width: "100%" }}
				data={data?.seeFeed}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => {
					return <PhotoList {...item!} />;
				}}
				showsVerticalScrollIndicator={false}
			/>
		</ScreenLayout>
	);
};

export default Feed;
