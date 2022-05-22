import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";

interface IDismissKeyBoardProps {
	children: React.ReactNode;
}

const DismissKeyBoard = ({ children }: IDismissKeyBoardProps) => {
	const dismissKeyboard = () => {
		Keyboard.dismiss();
	};
	return (
		<TouchableWithoutFeedback
			style={{ flex: 1 }}
			onPress={dismissKeyboard}
			disabled={Platform.OS === "web"}
		>
			{children}
		</TouchableWithoutFeedback>
	);
};

export default DismissKeyBoard;
