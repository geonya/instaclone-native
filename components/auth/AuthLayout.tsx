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
	max-height: 150px;
`;

interface IAuthLayoutProps {
	children: React.ReactNode;
}
const AuthLayOut = ({ children }: IAuthLayoutProps) => {
	return (
		<Container>
			<Logo
				resizeMode="contain"
				source={require("../../assets/instagram.png")}
			/>
			{children}
		</Container>
	);
};

export default AuthLayOut;
