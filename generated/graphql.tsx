import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  isMine: Scalars['Boolean'];
  payload: Scalars['String'];
  photo: Photo;
  updatedAt: Scalars['String'];
  user: User;
};

export type Hashtag = {
  __typename?: 'Hashtag';
  createdAt: Scalars['String'];
  hashtag: Scalars['String'];
  id: Scalars['Int'];
  photos?: Maybe<Array<Maybe<Photo>>>;
  totalPhotos: Scalars['Int'];
  updatedAt: Scalars['String'];
};


export type HashtagPhotosArgs = {
  page: Scalars['Int'];
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  photo: Photo;
  updatedAt: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  payload: Scalars['String'];
  read: Scalars['Boolean'];
  room: Room;
  updatedAt: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount?: Maybe<MutationResponse>;
  createComment?: Maybe<MutationResponse>;
  deleteComment?: Maybe<MutationResponse>;
  deleteMessage?: Maybe<MutationResponse>;
  deletePhoto: MutationResponse;
  editComment?: Maybe<MutationResponse>;
  editPhoto: MutationResponse;
  editProfile: MutationResponse;
  followUser?: Maybe<MutationResponse>;
  login?: Maybe<LoginResult>;
  readMessage: MutationResponse;
  sendMessage?: Maybe<MutationResponse>;
  toggleLike?: Maybe<MutationResponse>;
  unfollowUser?: Maybe<MutationResponse>;
  uploadPhoto?: Maybe<Photo>;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  payload: Scalars['String'];
  photoId: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePhotoArgs = {
  id: Scalars['Int'];
};


export type MutationEditCommentArgs = {
  id: Scalars['Int'];
  payload: Scalars['String'];
};


export type MutationEditPhotoArgs = {
  caption: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationEditProfileArgs = {
  avatar?: InputMaybe<Scalars['Upload']>;
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationFollowUserArgs = {
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationReadMessageArgs = {
  id: Scalars['Int'];
};


export type MutationSendMessageArgs = {
  payload: Scalars['String'];
  roomId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};


export type MutationToggleLikeArgs = {
  id: Scalars['Int'];
};


export type MutationUnfollowUserArgs = {
  username: Scalars['String'];
};


export type MutationUploadPhotoArgs = {
  caption?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  error?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  ok: Scalars['Boolean'];
};

export type Photo = {
  __typename?: 'Photo';
  caption?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  commentsCount: Scalars['Int'];
  createdAt: Scalars['String'];
  file: Scalars['String'];
  hashtags?: Maybe<Array<Maybe<Hashtag>>>;
  id: Scalars['Int'];
  isLiked: Scalars['Boolean'];
  isMine: Scalars['Boolean'];
  likes: Scalars['Int'];
  updatedAt: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  searchPhotos?: Maybe<Array<Maybe<Photo>>>;
  searchUsers?: Maybe<MutationResponse>;
  seeFeed?: Maybe<Array<Maybe<Photo>>>;
  seeFollowers: MutationResponse;
  seeFollowing: MutationResponse;
  seeHashtag?: Maybe<Hashtag>;
  seeMe?: Maybe<User>;
  seePhoto?: Maybe<Photo>;
  seePhotoComments?: Maybe<Array<Maybe<Comment>>>;
  seePhotoLikes?: Maybe<Array<Maybe<User>>>;
  seeProfile?: Maybe<User>;
  seeRoom?: Maybe<Room>;
  seeRooms?: Maybe<Array<Maybe<Room>>>;
};


export type QuerySearchPhotosArgs = {
  keyword: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  keyword: Scalars['String'];
  lastId?: InputMaybe<Scalars['Int']>;
};


export type QuerySeeFeedArgs = {
  offset: Scalars['Int'];
};


export type QuerySeeFollowersArgs = {
  page: Scalars['Int'];
  username: Scalars['String'];
};


export type QuerySeeFollowingArgs = {
  lastId?: InputMaybe<Scalars['Int']>;
  username: Scalars['String'];
};


export type QuerySeeHashtagArgs = {
  hashtag: Scalars['String'];
};


export type QuerySeePhotoArgs = {
  id: Scalars['Int'];
};


export type QuerySeePhotoCommentsArgs = {
  id: Scalars['Int'];
  lastId?: InputMaybe<Scalars['Int']>;
};


export type QuerySeePhotoLikesArgs = {
  id: Scalars['Int'];
};


export type QuerySeeProfileArgs = {
  username: Scalars['String'];
};


export type QuerySeeRoomArgs = {
  id: Scalars['Int'];
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  messages?: Maybe<Array<Maybe<Message>>>;
  unreadTotal: Scalars['Int'];
  updatedAt: Scalars['String'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  followUpdates?: Maybe<FollowUpdatesResult>;
  roomUpdates?: Maybe<Message>;
};


export type SubscriptionRoomUpdatesArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  id: Scalars['Int'];
  isFollowing: Scalars['Boolean'];
  isMe: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Maybe<Photo>>>;
  totalFollowers: Scalars['Int'];
  totalFollowing: Scalars['Int'];
  totalPhotos: Scalars['Int'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type FollowUpdatesResult = {
  __typename?: 'followUpdatesResult';
  avatar?: Maybe<Scalars['String']>;
  followerName: Scalars['String'];
  targetName: Scalars['String'];
};

export type User_FragmentFragment = { __typename?: 'User', id: number, username: string, avatar?: string | null, isFollowing: boolean, isMe: boolean };

export type PhotoFragmentFragment = { __typename?: 'Photo', id: number, file: string, likes: number, commentsCount: number, isLiked: boolean, caption?: string | null, createdAt: string };

export type Comment_FragmentFragment = { __typename?: 'Comment', id: number, payload: string, isMine: boolean, createdAt: string, user: { __typename?: 'User', username: string, avatar?: string | null } };

export type SeeMeQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeMeQuery = { __typename?: 'Query', seeMe?: { __typename?: 'User', id: number, bio?: string | null, totalPhotos: number, totalFollowing: number, totalFollowers: number, username: string, avatar?: string | null, isFollowing: boolean, isMe: boolean } | null };

export type SeeMyPhotosQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeMyPhotosQuery = { __typename?: 'Query', seeMe?: { __typename?: 'User', photos?: Array<{ __typename?: 'Photo', id: number, file: string } | null> | null } | null };

export type SeeFeedQueryVariables = Exact<{
  offset: Scalars['Int'];
}>;


export type SeeFeedQuery = { __typename?: 'Query', seeFeed?: Array<{ __typename?: 'Photo', isMine: boolean, id: number, file: string, likes: number, commentsCount: number, isLiked: boolean, caption?: string | null, createdAt: string, user: { __typename?: 'User', id: number, username: string, avatar?: string | null, isFollowing: boolean, isMe: boolean }, comments?: Array<{ __typename?: 'Comment', id: number, payload: string, isMine: boolean, createdAt: string, user: { __typename?: 'User', username: string, avatar?: string | null } } | null> | null } | null> | null };

export type SeeProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type SeeProfileQuery = { __typename?: 'Query', seeProfile?: { __typename?: 'User', firstName: string, lastName?: string | null, bio?: string | null, totalFollowing: number, totalFollowers: number, isFollowing: boolean, isMe: boolean, id: number, username: string, avatar?: string | null, photos?: Array<{ __typename?: 'Photo', id: number, file: string, likes: number, commentsCount: number, isLiked: boolean, caption?: string | null, createdAt: string } | null> | null } | null };

export type SeePhotoLikesQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SeePhotoLikesQuery = { __typename?: 'Query', seePhotoLikes?: Array<{ __typename?: 'User', id: number, username: string, avatar?: string | null, isFollowing: boolean, isMe: boolean } | null> | null };

export type SearchPhotosQueryVariables = Exact<{
  keyword: Scalars['String'];
}>;


export type SearchPhotosQuery = { __typename?: 'Query', searchPhotos?: Array<{ __typename?: 'Photo', id: number, file: string } | null> | null };

export type SeePhotoQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SeePhotoQuery = { __typename?: 'Query', seePhoto?: { __typename?: 'Photo', isMine: boolean, id: number, file: string, likes: number, commentsCount: number, isLiked: boolean, caption?: string | null, createdAt: string, user: { __typename?: 'User', id: number, username: string, avatar?: string | null, isFollowing: boolean, isMe: boolean }, comments?: Array<{ __typename?: 'Comment', id: number, payload: string, isMine: boolean, createdAt: string, user: { __typename?: 'User', username: string, avatar?: string | null } } | null> | null } | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginResult', ok: boolean, token?: string | null, error?: string | null } | null };

export type CreateCommentMutationVariables = Exact<{
  photoId: Scalars['Int'];
  payload: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null, id?: number | null } | null };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null, id?: number | null } | null };

export type CreateAccountMutationVariables = Exact<{
  firstName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } | null };

export type ToggleLikeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ToggleLikeMutation = { __typename?: 'Mutation', toggleLike?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } | null };

export type FollowUserMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } | null };

export type UnfollowUserMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } | null };

export type FollowUpdatesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type FollowUpdatesSubscription = { __typename?: 'Subscription', followUpdates?: { __typename?: 'followUpdatesResult', targetName: string, followerName: string, avatar?: string | null } | null };

export const User_FragmentFragmentDoc = gql`
    fragment User_Fragment on User {
  id
  username
  avatar
  isFollowing
  isMe
}
    `;
export const PhotoFragmentFragmentDoc = gql`
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
export const Comment_FragmentFragmentDoc = gql`
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
export const SeeMeDocument = gql`
    query SeeMe {
  seeMe {
    id
    bio
    totalPhotos
    totalFollowing
    totalFollowers
    ...User_Fragment
  }
}
    ${User_FragmentFragmentDoc}`;

/**
 * __useSeeMeQuery__
 *
 * To run a query within a React component, call `useSeeMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeMeQuery(baseOptions?: Apollo.QueryHookOptions<SeeMeQuery, SeeMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeMeQuery, SeeMeQueryVariables>(SeeMeDocument, options);
      }
export function useSeeMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeMeQuery, SeeMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeMeQuery, SeeMeQueryVariables>(SeeMeDocument, options);
        }
export type SeeMeQueryHookResult = ReturnType<typeof useSeeMeQuery>;
export type SeeMeLazyQueryHookResult = ReturnType<typeof useSeeMeLazyQuery>;
export type SeeMeQueryResult = Apollo.QueryResult<SeeMeQuery, SeeMeQueryVariables>;
export const SeeMyPhotosDocument = gql`
    query SeeMyPhotos {
  seeMe {
    photos {
      id
      file
    }
  }
}
    `;

/**
 * __useSeeMyPhotosQuery__
 *
 * To run a query within a React component, call `useSeeMyPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeMyPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeMyPhotosQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeMyPhotosQuery(baseOptions?: Apollo.QueryHookOptions<SeeMyPhotosQuery, SeeMyPhotosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeMyPhotosQuery, SeeMyPhotosQueryVariables>(SeeMyPhotosDocument, options);
      }
export function useSeeMyPhotosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeMyPhotosQuery, SeeMyPhotosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeMyPhotosQuery, SeeMyPhotosQueryVariables>(SeeMyPhotosDocument, options);
        }
export type SeeMyPhotosQueryHookResult = ReturnType<typeof useSeeMyPhotosQuery>;
export type SeeMyPhotosLazyQueryHookResult = ReturnType<typeof useSeeMyPhotosLazyQuery>;
export type SeeMyPhotosQueryResult = Apollo.QueryResult<SeeMyPhotosQuery, SeeMyPhotosQueryVariables>;
export const SeeFeedDocument = gql`
    query SeeFeed($offset: Int!) {
  seeFeed(offset: $offset) {
    user {
      ...User_Fragment
    }
    comments {
      ...Comment_Fragment
    }
    ...PhotoFragment
    isMine
  }
}
    ${User_FragmentFragmentDoc}
${Comment_FragmentFragmentDoc}
${PhotoFragmentFragmentDoc}`;

/**
 * __useSeeFeedQuery__
 *
 * To run a query within a React component, call `useSeeFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeFeedQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSeeFeedQuery(baseOptions: Apollo.QueryHookOptions<SeeFeedQuery, SeeFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeFeedQuery, SeeFeedQueryVariables>(SeeFeedDocument, options);
      }
export function useSeeFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeFeedQuery, SeeFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeFeedQuery, SeeFeedQueryVariables>(SeeFeedDocument, options);
        }
export type SeeFeedQueryHookResult = ReturnType<typeof useSeeFeedQuery>;
export type SeeFeedLazyQueryHookResult = ReturnType<typeof useSeeFeedLazyQuery>;
export type SeeFeedQueryResult = Apollo.QueryResult<SeeFeedQuery, SeeFeedQueryVariables>;
export const SeeProfileDocument = gql`
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
}
    ${User_FragmentFragmentDoc}
${PhotoFragmentFragmentDoc}`;

/**
 * __useSeeProfileQuery__
 *
 * To run a query within a React component, call `useSeeProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeProfileQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSeeProfileQuery(baseOptions: Apollo.QueryHookOptions<SeeProfileQuery, SeeProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeProfileQuery, SeeProfileQueryVariables>(SeeProfileDocument, options);
      }
export function useSeeProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeProfileQuery, SeeProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeProfileQuery, SeeProfileQueryVariables>(SeeProfileDocument, options);
        }
export type SeeProfileQueryHookResult = ReturnType<typeof useSeeProfileQuery>;
export type SeeProfileLazyQueryHookResult = ReturnType<typeof useSeeProfileLazyQuery>;
export type SeeProfileQueryResult = Apollo.QueryResult<SeeProfileQuery, SeeProfileQueryVariables>;
export const SeePhotoLikesDocument = gql`
    query SeePhotoLikes($id: Int!) {
  seePhotoLikes(id: $id) {
    ...User_Fragment
  }
}
    ${User_FragmentFragmentDoc}`;

/**
 * __useSeePhotoLikesQuery__
 *
 * To run a query within a React component, call `useSeePhotoLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeePhotoLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeePhotoLikesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSeePhotoLikesQuery(baseOptions: Apollo.QueryHookOptions<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>(SeePhotoLikesDocument, options);
      }
export function useSeePhotoLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>(SeePhotoLikesDocument, options);
        }
export type SeePhotoLikesQueryHookResult = ReturnType<typeof useSeePhotoLikesQuery>;
export type SeePhotoLikesLazyQueryHookResult = ReturnType<typeof useSeePhotoLikesLazyQuery>;
export type SeePhotoLikesQueryResult = Apollo.QueryResult<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>;
export const SearchPhotosDocument = gql`
    query SearchPhotos($keyword: String!) {
  searchPhotos(keyword: $keyword) {
    id
    file
  }
}
    `;

/**
 * __useSearchPhotosQuery__
 *
 * To run a query within a React component, call `useSearchPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPhotosQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useSearchPhotosQuery(baseOptions: Apollo.QueryHookOptions<SearchPhotosQuery, SearchPhotosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPhotosQuery, SearchPhotosQueryVariables>(SearchPhotosDocument, options);
      }
export function useSearchPhotosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPhotosQuery, SearchPhotosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPhotosQuery, SearchPhotosQueryVariables>(SearchPhotosDocument, options);
        }
export type SearchPhotosQueryHookResult = ReturnType<typeof useSearchPhotosQuery>;
export type SearchPhotosLazyQueryHookResult = ReturnType<typeof useSearchPhotosLazyQuery>;
export type SearchPhotosQueryResult = Apollo.QueryResult<SearchPhotosQuery, SearchPhotosQueryVariables>;
export const SeePhotoDocument = gql`
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
}
    ${User_FragmentFragmentDoc}
${Comment_FragmentFragmentDoc}
${PhotoFragmentFragmentDoc}`;

/**
 * __useSeePhotoQuery__
 *
 * To run a query within a React component, call `useSeePhotoQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeePhotoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeePhotoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSeePhotoQuery(baseOptions: Apollo.QueryHookOptions<SeePhotoQuery, SeePhotoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeePhotoQuery, SeePhotoQueryVariables>(SeePhotoDocument, options);
      }
export function useSeePhotoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeePhotoQuery, SeePhotoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeePhotoQuery, SeePhotoQueryVariables>(SeePhotoDocument, options);
        }
export type SeePhotoQueryHookResult = ReturnType<typeof useSeePhotoQuery>;
export type SeePhotoLazyQueryHookResult = ReturnType<typeof useSeePhotoLazyQuery>;
export type SeePhotoQueryResult = Apollo.QueryResult<SeePhotoQuery, SeePhotoQueryVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ok
    token
    error
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($photoId: Int!, $payload: String!) {
  createComment(photoId: $photoId, payload: $payload) {
    ok
    error
    id
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      photoId: // value for 'photoId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: Int!) {
  deleteComment(id: $id) {
    ok
    error
    id
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const CreateAccountDocument = gql`
    mutation createAccount($firstName: String!, $username: String!, $email: String!, $password: String!, $lastName: String) {
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
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const ToggleLikeDocument = gql`
    mutation ToggleLike($id: Int!) {
  toggleLike(id: $id) {
    ok
    error
  }
}
    `;
export type ToggleLikeMutationFn = Apollo.MutationFunction<ToggleLikeMutation, ToggleLikeMutationVariables>;

/**
 * __useToggleLikeMutation__
 *
 * To run a mutation, you first call `useToggleLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikeMutation, { data, loading, error }] = useToggleLikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleLikeMutation(baseOptions?: Apollo.MutationHookOptions<ToggleLikeMutation, ToggleLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleLikeMutation, ToggleLikeMutationVariables>(ToggleLikeDocument, options);
      }
export type ToggleLikeMutationHookResult = ReturnType<typeof useToggleLikeMutation>;
export type ToggleLikeMutationResult = Apollo.MutationResult<ToggleLikeMutation>;
export type ToggleLikeMutationOptions = Apollo.BaseMutationOptions<ToggleLikeMutation, ToggleLikeMutationVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($username: String!) {
  followUser(username: $username) {
    ok
    error
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation UnfollowUser($username: String!) {
  unfollowUser(username: $username) {
    ok
    error
  }
}
    `;
export type UnfollowUserMutationFn = Apollo.MutationFunction<UnfollowUserMutation, UnfollowUserMutationVariables>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUnfollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const FollowUpdatesDocument = gql`
    subscription FollowUpdates {
  followUpdates {
    targetName
    followerName
    avatar
  }
}
    `;

/**
 * __useFollowUpdatesSubscription__
 *
 * To run a query within a React component, call `useFollowUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFollowUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowUpdatesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useFollowUpdatesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<FollowUpdatesSubscription, FollowUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<FollowUpdatesSubscription, FollowUpdatesSubscriptionVariables>(FollowUpdatesDocument, options);
      }
export type FollowUpdatesSubscriptionHookResult = ReturnType<typeof useFollowUpdatesSubscription>;
export type FollowUpdatesSubscriptionResult = Apollo.SubscriptionResult<FollowUpdatesSubscription>;