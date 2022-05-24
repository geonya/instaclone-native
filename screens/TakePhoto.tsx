import { Text } from "react-native";
import styled from "styled-components/native";
const Container = styled.View`
	flex: 1;
	background-color: black;
`;

const TakePhoto = () => {
	return (
		<Container>
			<Text style={{ color: "white" }}>TakePhoto</Text>
		</Container>
	);
};

export default TakePhoto;
