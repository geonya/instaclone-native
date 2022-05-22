import { KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components/native";
import DismissKeyBoard from "../DismissKeyBoard";

const Container = styled.View`
	flex: 1;
	width: 100%;
	align-items: center;
	justify-content: center;
	background-color: black;
	padding: 0px 40px;
`;
const Wrapper = styled.View`
	max-width: 400px;
	width: 100%;
	margin: 0 auto;
`;

const Logo = styled.Image`
	max-width: 100%;
	width: 100%;
	height: 150px;
	margin: 0 auto;
`;

interface IAuthLayoutProps {
	children: React.ReactNode;
}
const AuthLayOut = ({ children }: IAuthLayoutProps) => {
	return (
		<DismissKeyBoard>
			<Container>
				<KeyboardAvoidingView
					style={{
						width: "100%",
					}}
					behavior="padding"
					keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
				>
					<Wrapper>
						<Logo
							resizeMode="contain"
							source={require("../../assets/instagram.png")}
						/>
						{children}
					</Wrapper>
				</KeyboardAvoidingView>
			</Container>
		</DismissKeyBoard>
	);
};

export default AuthLayOut;
