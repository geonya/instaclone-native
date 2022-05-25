import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
	flex: 1;
	background-color: black;
`;

const Actions = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex: 0.3;
`;

const TakePhotoBtn = styled.TouchableOpacity`
	width: 80px;
	height: 80px;
	background-color: rgba(255, 255, 255, 0.5);
	border: 1px solid rgba(255, 255, 255, 0.8);
	border-radius: 40px;
`;

const TakePhoto = () => {
	const [ok, setOk] = useState(false);
	const [cameraType, setCameraType] = useState(CameraType.front);
	const getPermissions = async () => {
		const { granted } = await Camera.requestCameraPermissionsAsync();
		setOk(granted);
	};
	useEffect(() => {
		getPermissions();
	}, []);
	return (
		<Container>
			<Camera type={cameraType} style={{ flex: 1 }} />
			<Actions>
				<TakePhotoBtn />
				<TouchableOpacity></TouchableOpacity>
			</Actions>
		</Container>
	);
};

export default TakePhoto;
