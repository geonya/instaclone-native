import { Camera, CameraType, FlashMode } from "expo-camera";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { colors } from "../colors";

const Container = styled.View`
	flex: 1;
	background-color: black;
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

const TakePhoto = () => {
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
	return (
		<Container>
			<Camera type={cameraType} style={{ flex: 1 }} zoom={zoom} />
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
					<TouchableOpacity onPress={onCameraSwitch}>
						<Ionicons size={50} color="white" name={"camera-reverse"} />
					</TouchableOpacity>
				</ButtonContainer>
			</Actions>
		</Container>
	);
};

export default TakePhoto;
