import { ActivityIndicator, Text, View } from "react-native";
import AuthButton from "./auth/AuthButton";

interface IScreenLayoutProps {
	loading: boolean;
	children: React.ReactNode;
}

const ScreenLayout = ({ loading, children }: IScreenLayoutProps) => {
	return (
		<View
			style={{
				backgroundColor: "black",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{loading ? <ActivityIndicator color="white" /> : children}
		</View>
	);
};

export default ScreenLayout;
