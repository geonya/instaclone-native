import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
	FlatList,
	Image,
	TouchableOpacity,
	useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import { logUserOut } from "../apollo";
import useMe from "../components/hooks/useMe";
import useMyPhotos from "../components/hooks/useMyPhotos";
import ScreenLayout from "../components/ScreenLayout";
import { goToPhoto } from "../components/sharedFunction";
import { FatText, UserAvatar } from "../components/sharedStyles";
import ScreenParamList from "../navigators/screenParamList";

const Header = styled.View`
	width: 100%;
`;
const Row = styled.View`
	flex-direction: row;
	margin-bottom: 5px;
`;

const AvatarColumn = styled.TouchableOpacity`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const InfoColumns = styled.View`
	flex: 2;
	flex-direction: row;
	justify-content: space-around;
`;
const InfoColumn = styled.View`
	justify-content: center;
	align-items: center;
`;
const Username = styled(FatText)`
	font-size: 14.5px;
`;

const InfoCounts = styled.TouchableOpacity``;
const InfoCountsText = styled(FatText)`
	font-size: 17px;
`;
const InfoText = styled.Text`
	color: white;
	font-weight: 400;
`;

const BioColumn = styled.View`
	padding: 20px 20px;
	flex-direction: row;
`;

const BioText = styled.Text`
	color: white;
	font-size: 15px;
`;

const Tools = styled.View`
	width: 100%;
	align-items: center;
	margin-bottom: 30px;
`;
const ProfileEditBtn = styled.TouchableOpacity`
	padding: 5px 0;
	width: 80%;
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 5px;
	align-items: center;
	margin-bottom: 10px;
`;
const LogOutBtn = styled.TouchableOpacity`
	padding: 5px 0;
	width: 80%;
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 5px;
	align-items: center;
`;

type MeProps = NativeStackScreenProps<ScreenParamList>;
const Me = ({ navigation }: MeProps) => {
	const NUM_COLUMS = 3;
	const { width: screenWidth, height: sreenHeight } = useWindowDimensions();
	const { data: userData, loading: userLoading } = useMe();
	const { data: PhotosData, loading: photosLoading, refetch } = useMyPhotos();
	useEffect(() => {
		navigation.setOptions({
			title: `${userData?.seeMe?.username}`,
		});
	}, [userData]);
	const [refreshing, setRefreshing] = useState(false);
	const refresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};
	const loading = userLoading || photosLoading;
	return (
		<ScreenLayout loading={loading}>
			<Header>
				<Row>
					<AvatarColumn>
						<UserAvatar
							source={{ uri: userData?.seeMe?.avatar! }}
							resizeMode="cover"
							size={80}
						/>
						<Username style={{ marginTop: 5 }}>
							{userData?.seeMe?.username}
						</Username>
					</AvatarColumn>
					<InfoColumns>
						<InfoColumn>
							<InfoCounts>
								<InfoCountsText>{userData?.seeMe?.totalPhotos}</InfoCountsText>
							</InfoCounts>
							<InfoText>게시물</InfoText>
						</InfoColumn>
						<InfoColumn>
							<InfoCounts>
								<InfoCountsText>
									{userData?.seeMe?.totalFollowers}
								</InfoCountsText>
							</InfoCounts>
							<InfoText>팔로워</InfoText>
						</InfoColumn>
						<InfoColumn>
							<InfoCounts>
								<InfoCountsText>
									{userData?.seeMe?.totalFollowing}
								</InfoCountsText>
							</InfoCounts>
							<InfoText>팔로잉</InfoText>
						</InfoColumn>
					</InfoColumns>
				</Row>
				<Row>
					<BioColumn>
						<BioText>{userData?.seeMe?.bio}</BioText>
					</BioColumn>
				</Row>
			</Header>
			<Tools>
				<ProfileEditBtn>
					<FatText>프로필 편집</FatText>
				</ProfileEditBtn>
				<LogOutBtn onPress={logUserOut}>
					<FatText>Log Out</FatText>
				</LogOutBtn>
			</Tools>
			<FlatList
				inverted={true}
				refreshing={refreshing}
				onRefresh={refresh}
				numColumns={NUM_COLUMS}
				data={PhotosData?.seeMe?.photos}
				keyExtractor={(_, i) => i + ""}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => goToPhoto({ navigation, photoId: item?.id! })}
					>
						<Image
							source={{ uri: item?.file }}
							style={{ width: screenWidth / NUM_COLUMS, height: 100 }}
						/>
					</TouchableOpacity>
				)}
			/>
		</ScreenLayout>
	);
};

export default Me;
