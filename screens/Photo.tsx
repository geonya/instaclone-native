import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import PhotoBox from '../components/PhotoBox';
import ScreenLayout from '../components/ScreenLayout';
import { useSeePhotoQuery } from '../generated/graphql';

type SearchScreenProps = NativeStackScreenProps<ScreenParamList, 'Photo'>;

const Photo = ({ route }: SearchScreenProps) => {
	const { data, loading, refetch } = useSeePhotoQuery({
		variables: {
			id: route?.params?.photoId,
		},
	});
	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};
	return (
		<ScreenLayout loading={loading}>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				style={{ backgroundColor: 'black' }}
				contentContainerStyle={{
					backgroundColor: 'black',
					flex: 1,
					alignItems: 'center',
				}}
			>
				<PhotoBox {...data?.seePhoto!} fullView />
			</ScrollView>
		</ScreenLayout>
	);
};

export default Photo;
