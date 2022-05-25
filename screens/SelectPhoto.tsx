import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import {
	FlatList,
	Image,
	StatusBar,
	TouchableOpacity,
	useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ScreenParamList from "../navigators/screenParamList";

const Container = styled.View`
	flex: 1;
	background-color: black;
`;
const Top = styled.View`
	flex: 1;
	background-color: black;
`;
const Bottom = styled.View`
	flex: 1;
	background-color: black;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
	position: absolute;
	bottom: 5px;
	right: 0;
`;
const HeaderRightText = styled.Text`
	color: ${colors.blue};
	font-size: 16px;
	font-weight: 600;
	margin-right: 5px;
`;

interface IPhoto {
	id: string;
	uri: string;
}
type SelectPhotoScreenProps = NativeStackScreenProps<ScreenParamList>;
const SelectPhoto = ({ navigation }: SelectPhotoScreenProps) => {
	const [ok, setOk] = useState(false);
	const [photos, setPhotos] = useState<IPhoto[]>([]);
	const [chosenPhoto, setChosenPhoto] = useState("");
	const [photoLocal, setPhotoLocal] = useState("");

	const getPhotos = async () => {
		if (ok) {
			const { assets } = await MediaLibrary.getAssetsAsync();
			setPhotos(assets);
			setChosenPhoto(assets[0]?.uri);
		}
	};
	const getPermissions = async () => {
		const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();
		if (status === "undetermined" && canAskAgain) {
			const { status } = await MediaLibrary.requestPermissionsAsync();
			if (status === "undetermined") {
				setOk(true);
			}
		} else if (status !== "undetermined") {
			setOk(true);
		} else {
			setOk(false);
		}
	};
	const choosePhoto = async (id: string) => {
		const assetInfo = await MediaLibrary.getAssetInfoAsync(id);
		setPhotoLocal(assetInfo.localUri!);
		setChosenPhoto(assetInfo.uri);
	};
	const NUM_COLUMNS = 4;
	const { width: screenWidth } = useWindowDimensions();
	useEffect(() => {
		getPermissions();
		getPhotos();
	}, [ok]);

	const headerRight = () => (
		<TouchableOpacity
			onPress={() => navigation.navigate("UploadForm", { file: photoLocal! })}
		>
			<HeaderRightText>Next</HeaderRightText>
		</TouchableOpacity>
	);

	useEffect(() => {
		navigation.setOptions({
			headerRight,
		});
	}, [chosenPhoto, photoLocal]);
	return (
		<Container>
			<StatusBar />
			<Top>
				{chosenPhoto !== "" && (
					<Image
						source={{ uri: chosenPhoto }}
						style={{ width: screenWidth, height: "100%" }}
					/>
				)}
			</Top>
			<Bottom>
				<FlatList
					data={photos}
					numColumns={NUM_COLUMNS}
					keyExtractor={(_, i) => i + ""}
					renderItem={({ item: photo }) => (
						<ImageContainer onPress={() => choosePhoto(photo.id)}>
							<Image
								style={{ width: screenWidth / NUM_COLUMNS, height: 100 }}
								resizeMode="cover"
								source={{ uri: photo.uri }}
							/>
							<IconContainer>
								<Ionicons
									name="checkmark-circle"
									size={18}
									color={chosenPhoto === photo.uri ? colors.blue : "white"}
								/>
							</IconContainer>
						</ImageContainer>
					)}
				/>
			</Bottom>
		</Container>
	);
};

export default SelectPhoto;
