type ScreenParamList = {
	Welcome: undefined;
	Login: { username: string; password: string } | undefined;
	CreateAccount: undefined;
	Feed: undefined;
	Search: undefined;
	Notifications: undefined;
	Me: undefined;
	Profile: { username: string; userId: number };
	Photo: { photoId: number };
	Likes: {
		photoId: number;
	};
	Comments: undefined;
	SelectPhoto: undefined;
	TakePhoto: undefined;
	Tabs: undefined;
	Upload: undefined;
	UploadForm: { file: string };
	Messages: undefined;
	Room: {
		id: number;
		talkingTo?: {
			username: string;
			avatar?: string | null | undefined;
		} | null;
	};
	Rooms: undefined;
};
