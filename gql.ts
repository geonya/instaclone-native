import { gql } from "@apollo/client";

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

const COMMENT_FRAGMENT = gql`
	fragment Comment_Fragment on Comment {
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

const USER_FRAGMENT = gql`
	fragment User_Fragment on User {
		id
		username
		avatar
		isFollowing
		isMe
	}
`;

gql`
	query seeMe {
		seeMe {
			id
			...User_Fragment
		}
		${USER_FRAGMENT}
	}
	
	query SeeFeed($offset: Int!) {
		seeFeed(offset:$offset) {
			user {
				...User_Fragment
			}
			comments {
				...Comment_Fragment
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
    ...User_Fragment
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
		...User_Fragment
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
				...User_Fragment
			}
			comments {
				...Comment_Fragment
			}
			...PhotoFragment
			isMine
	}
	${USER_FRAGMENT}
	${PHOTO_FRAGMENT}
	${COMMENT_FRAGMENT}
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
`;
