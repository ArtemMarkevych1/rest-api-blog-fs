import axios from 'axios'
import { Categories, isValidCategory } from '../constants/categories'

const API_URL = 'http://localhost:3000/api/v1'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

class AuthService {

  async signIn(credentials) {
    const response = await axiosInstance.post('/auth/signin', credentials)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  }

  async signOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

class PostService {

  async getPosts(params = {}) {
    const {
      page = 1,
      size = 10,
      category
    } = params;
  
    // Build query parameters
    const queryParams = new URLSearchParams();

    if (category) queryParams.append('category', category);
    if (page) queryParams.append('page', page.toString());
    if (size) queryParams.append('size', size.toString());
      const response = await axiosInstance.get(`/post?${queryParams.toString()}`);
  
    return response.data;
  }

  async getPostsByCategory(category) {
    if (!isValidCategory(category)) {
      throw new Error('Invalid category')
    }
    return await axiosInstance.get(`/posts/category/${Categories[category]}`)
  }

  async getPost(postId) {
    return await axiosInstance.get(`/post/${postId}`)
  }

  async createPost(postData) {
    if (!isValidCategory(postData.category)) {
      throw new Error('Invalid category')
    }
    const response = await axiosInstance.post('/post', postData)
    return response.data
  }

  async deletePost(postId) {
    return await axiosInstance.delete(`/post/${postId}`)
  }

  async updatePost(postId, postData) {
    if (postData.category && !isValidCategory(postData.category)) {
      throw new Error('Invalid category')
    }
    const response = await axiosInstance.put(`/post/${postId}`, postData)
    return response.data
  }

  async toggleLike(postId) {
    return await axiosInstance.post(`/post/${postId}/like`)
  }

  async addComment(postId, commentData) {
    return await axiosInstance.post(`/post/${postId}/comment`, commentData)
  }

  async updateComment(postId, commentId, commentData) {
    return await axiosInstance.put(`/post/${postId}/comment/${commentId}`, commentData)
  }

  async deleteComment(postId, commentId) {
    return await axiosInstance.delete(`/post/${postId}/comment/${commentId}`)
  }
}

class UserService {

  async getCurrentUser() {
    const response = await axiosInstance.get('/user/current-user', {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
    return response.data
  }

  async getUserPosts(userId) {
    return await axiosInstance.get(`/users/${userId}/posts`)
  }

  async getUserById(userId) {
    return await axiosInstance.get(`/user/get-user/${userId}`)
  }

  async updateUser(userData) {
    const response = await axiosInstance.put('/user/update-user/', userData);
    return response.data;
  }
}

class CommentService {
  async getPostComments(postId) {
    return await axiosInstance.get(`/posts/${postId}/comments`)
  }

  async createComment(postId, commentData) {
    return await axiosInstance.post(`/posts/${postId}/comments`, commentData)
  }

  async updateComment(postId, commentId, commentData) {
    return await axiosInstance.put(`/posts/${postId}/comments/${commentId}`, commentData)
  }

  async deleteComment(postId, commentId) {
    return await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`)
  }
}

export const authService = new AuthService()
export const postService = new PostService()
export const userService = new UserService()
export const commentService = new CommentService()

// For backward compatibility
export default {
  ...authService,
  ...postService,
  ...userService,
  ...commentService
}

