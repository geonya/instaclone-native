import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Button = styled.TouchableOpacity`
	background-color: ${colors.blue};
	padding: 15px 10px;
	border-radius: 3px;
	margin-bottom: 20px;
	width: 100%;
	opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;
const ButtonText = styled.Text`
	color: white;
	text-align: center;
`;
interface AuthButton {
	onPress(): void;
	disabled: boolean;
	text: string;
	loading: boolean;
}
const AuthButton = ({ onPress, disabled, text, loading }: AuthButton) => {
	return (
		<Button onPress={onPress} disabled={disabled}>
			{loading ? (
				<ActivityIndicator color="white" />
			) : (
				<ButtonText>{text}</ButtonText>
			)}
		</Button>
	);
};

export default AuthButton;
