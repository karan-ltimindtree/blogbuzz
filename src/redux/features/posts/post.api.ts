import { axiosPrivateInstance } from '../../../config/axios.config';

export function createPostApi(title: string, category: string, content: string) {
  return axiosPrivateInstance.post('/post', { title, category, content });
}

export function getRecentPostsApi() {
  return axiosPrivateInstance.get('/post/recent');
}

export function getAllPostsApi() {
  return axiosPrivateInstance.get('/post');
}

export function getMyPostsApi() {
  return axiosPrivateInstance.get('/post/myPosts');
}

export function getSinglePostApi(id: string) {
  return axiosPrivateInstance.get(`/post/${id}`);
}
