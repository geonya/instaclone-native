import { Camera, CameraType, FlashMode } from "expo-camera";
import { useEffect, useState } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { colors } from "../colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { uploadNavParamList } from "../navigators/UploadNav";

const Container = styled.View`
	flex: 1;
	background-color: black;
`;

const ActionsContainer = styled.View`
	flex-direction: row;
`;

const Actions = styled.View`
	flex: 0.3;
	align-items: center;
	justify-content: space-around;
	padding: 0 50px;
`;

const ButtonContainer = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
	width: 80px;
	height: 80px;
	background-color: rgba(255, 255, 255, 0.5);
	border: 1px solid rgba(255, 255, 255, 0.8);
	border-radius: 40px;
`;
const SliderContainer = styled.View``;

const CloseBtn = styled.TouchableOpacity`
	position: absolute;
	top: 20px;
	left: 20px;
`;
type takePhotoScreenProps = NativeStackScreenProps<uploadNavParamList>;
const TakePhoto = ({ navigation }: takePhotoScreenProps) => {
	const [ok, setOk] = useState(false);
	const [flashMode, setFlashMode] = useState(FlashMode.off);
	const [zoom, setZoom] = useState(0);
	const [cameraType, setCameraType] = useState(CameraType.back);
	const getPermissions = async () => {
		const { granted } = await Camera.requestCameraPermissionsAsync();
		setOk(granted);
	};
	useEffect(() => {
		getPermissions();
	}, []);
	const onCameraSwitch = () => {
		if (cameraType === CameraType.front) {
			setCameraType(CameraType.back);
		} else if (cameraType === CameraType.back) {
			setCameraType(CameraType.front);
		}
	};
	const onZoomValueChange = (value: number) => {
		setZoom(value);
	};
	const onFlashChange = () => {
		if (flashMode === "off") {
			setFlashMode(FlashMode.on);
		} else if (flashMode === "on") {
			setFlashMode(FlashMode.auto);
		} else if (flashMode === "auto") {
			setFlashMode(FlashMode.off);
		}
	};
	return (
		<Container>
			<StatusBar hidden={true} />
			<Camera
				type={cameraType}
				style={{ flex: 1 }}
				zoom={zoom}
				flashMode={flashMode}
			>
				<CloseBtn onPress={() => navigation.navigate("Tabs")}>
					<Ionicons name="close" color="white" size={30} />
				</CloseBtn>
			</Camera>
			<Actions>
				<SliderContainer>
					<Slider
						onValueChange={onZoomValueChange}
						style={{ width: 300, height: 40 }}
						minimumValue={0}
						maximumValue={0.1}
						minimumTrackTintColor="#FFFFFF"
						maximumTrackTintColor="rgba(255,255,255,0.5)"
					/>
				</SliderContainer>
				<ButtonContainer>
					<TakePhotoBtn />
					<ActionsContainer>
						<TouchableOpacity
							onPress={onFlashChange}
							style={{ marginRight: 50 }}
						>
							<Ionicons
								size={40}
								color="white"
								name={
									flashMode === FlashMode.on
										? "flash"
										: flashMode === FlashMode.off
										? "flash-off"
										: "eye"
								}
							/>
						</TouchableOpacity>
						<TouchableOpacity onPress={onCameraSwitch}>
							<Ionicons size={40} color="white" name={"camera-reverse"} />
						</TouchableOpacity>
					</ActionsContainer>
				</ButtonContainer>
			</Actions>
		</Container>
	);
};

export default TakePhoto;
