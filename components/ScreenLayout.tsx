import { ActivityIndicator, Text, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";

interface IScreenLayoutProps {
	loading: boolean;
	children: React.ReactNode;
}

const Container = styled.View`
	flex: 1;
	background-color: ${colors.black};
	justify-content: center;
	align-items: center;
`;

const ScreenLayout = ({ loading, children }: IScreenLayoutProps) => {
	return (
		<Container>
			{loading ? <ActivityIndicator color="white" size="large" /> : children}
		</Container>
	);
};

export default ScreenLayout;
