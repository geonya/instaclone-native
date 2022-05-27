import { gql } from "@apollo/client";

const USER_FRAGMENT = gql`
	fragment UserFragment on User {
		id
		username
		avatar
		isFollowing
		isMe
	}
`;

const PHOTO_FRAGMENT = gql`
	fragment PhotoFragment on Photo {
		id
		file
		likes
		commentsCount
		isLiked
		caption
		createdAt
	}
`;

const FEED_PHOTO = gql`
	fragment FeedPhoto on Photo {
		...PhotoFragment
		user {
			id
			username
			avatar
		}
		caption
		createdAt
		isMine
	}
	${PHOTO_FRAGMENT}
`;

const COMMENT_FRAGMENT = gql`
	fragment CommentFragment on Comment {
		id
		user {
			username
			avatar
		}
		payload
		isMine
		createdAt
	}
`;

const ROOM_FRAGMENT = gql`
	fragment RoomFragment on Room {
		id
		unreadTotal
		users {
			username
			avatar
		}
	}
`;

gql`
	query SeeMe {
		seeMe {
			id
			bio
			totalPhotos
			totalFollowing
			totalFollowers
			...UserFragment
		}
		${USER_FRAGMENT}
	}
	query SeeMyPhotos {
		seeMe {
			photos {
				id
				file
			}
		}
	}
	query SeeFeed($offset: Int!) {
		seeFeed(offset:$offset) {
			user {
				...UserFragment
			}
			comments {
				...CommentFragment
			}
			...PhotoFragment
			isMine
		}
		${USER_FRAGMENT}
		${PHOTO_FRAGMENT}
		${COMMENT_FRAGMENT}
	}
	
	query SeeProfile($username: String!) {
  seeProfile(username: $username) {
    firstName
    lastName
    bio
    ...UserFragment
    totalFollowing
    totalFollowers
    isFollowing
    isMe
    photos {
      ...PhotoFragment
    }
  }
	${USER_FRAGMENT}
	${PHOTO_FRAGMENT}
}
query SeePhotoLikes($id: Int!) {
  seePhotoLikes(id: $id) {
		...UserFragment
  }
	${USER_FRAGMENT}
}
query SearchPhotos($keyword: String!) {
  searchPhotos(keyword: $keyword) {
    id
    file
  }
}
query SeePhoto($id: Int!) {
  seePhoto(id: $id) {
    user {
				...UserFragment
			}
			comments {
				...CommentFragment
			}
			...PhotoFragment
			isMine
	}
	${USER_FRAGMENT}
	${PHOTO_FRAGMENT}
	${COMMENT_FRAGMENT}
}
query SeeRooms {
  seeRooms {
    ...RoomFragment
  }
	${ROOM_FRAGMENT}
}
query SeeRoom($id:Int!) {
	seeRoom(id:$id) {
		messages {
			id
			payload
			user{
				username
				avatar
			}
			read
			isMine
		}
	}
}
`;

// Mutation
gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			ok
			token
			error
		}
	}
	mutation CreateComment($photoId: Int!, $payload: String!) {
		createComment(photoId: $photoId, payload: $payload) {
			ok
			error
			id
		}
	}
	mutation DeleteComment($id: Int!) {
		deleteComment(id: $id) {
			ok
			error
			id
		}
	}
	mutation createAccount(
		$firstName: String!
		$username: String!
		$email: String!
		$password: String!
		$lastName: String
	) {
		createAccount(
			firstName: $firstName
			username: $username
			email: $email
			password: $password
			lastName: $lastName
		) {
			ok
			error
		}
	}
	mutation ToggleLike($id: Int!) {
		toggleLike(id: $id) {
			ok
			error
		}
	}
	mutation FollowUser($username: String!) {
		followUser(username: $username) {
			ok
			error
		}
	}
	mutation UnfollowUser($username: String!) {
		unfollowUser(username: $username) {
			ok
			error
		}
	}
	mutation UploadPhoto($file: Upload!, $caption: String) {
  uploadPhoto(file: $file, caption: $caption) {
    ...FeedPhoto
  }
	${FEED_PHOTO}
}
	mutation SendMessage($payload: String!, $roomId: Int, $userId: Int) {
		sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
			ok
			id
		}
	}
`;

gql`
	subscription FollowUpdates {
		followUpdates {
			targetName
			followerName
			avatar
		}
	}
`;
