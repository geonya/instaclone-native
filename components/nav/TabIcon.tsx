import { Ionicons } from "@expo/vector-icons";

interface ITabIconProps {
	name: "home" | "search" | "camera" | "heart" | "person";
	focused: boolean;
	color: string;
	size: number;
}

const TabIcon = ({ name, focused, color, size }: ITabIconProps) => (
	<Ionicons
		name={focused ? name : `${name}-outline`}
		color={color}
		size={size}
	/>
);

export default TabIcon;
