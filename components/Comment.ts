export interface IComments extends Array<IComment | null> {}

export interface IComment {
	id: number;
	user: {
		username: string;
		avatar?: string | null;
	};
	payload: string;
	isMine: boolean;
	createdAt: string;
}
