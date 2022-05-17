import { Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: black;
	padding: 0px 40px;
`;

const Logo = styled.Image`
	width: 200px;
	height: 150px;
`;

interface IAuthLayoutProps {
	children: React.ReactNode;
}
const AuthLayOut = ({ children }: IAuthLayoutProps) => {
	const dismissKeyboard = () => {
		Keyboard.dismiss();
	};
	return (
		<TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
			<Container>
				<Logo
					resizeMode="contain"
					source={require("../../assets/instagram.png")}
				/>
				{children}
			</Container>
		</TouchableWithoutFeedback>
	);
};

export default AuthLayOut;
