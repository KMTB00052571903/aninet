export enum ActionTypes {
  SET_USER = "SET_USER",
  LOGOUT = "LOGOUT",
  ADD_POST = "ADD_POST",
}

export interface Action<T = any> {
  type: ActionTypes;
  payload?: T;
}

export interface Post {
  id: string;
  content: string;
  image?: string;
  createdAt: string;
}

export const addPost = (post: Post): Action<Post> => ({
  type: ActionTypes.ADD_POST,
  payload: post,
});
