import axios from 'axios'
import { Categories, isValidCategory } from '../constants/categories'

const API_URL = 'http://localhost:3000/api/v1'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests if it exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

class AuthService {
  async getCurrentUser() {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No token found')
    }
    const response = await axiosInstance.get('/auth/current-user')
    return response.data
  }

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
  async getPosts() {
    return await axiosInstance.get('/post')
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

  async getPostsByCategory(category) {
    if (!isValidCategory(category)) {
      throw new Error('Invalid category')
    }
    const response = await axiosInstance.get(`/posts/category/${Categories[category]}`)
    return response.data
  }

  async updatePost(postId, postData) {
    if (postData.category && !isValidCategory(postData.category)) {
      throw new Error('Invalid category')
    }
    const response = await axiosInstance.put(`/posts/${postId}`, postData)
    return response.data
  }
}

class UserService {
  async getUserProfile() {
    return await axiosInstance.get('/users/profile')
  }

  async getUserPosts(userId) {
    return await axiosInstance.get(`/users/${userId}/posts`)
  }

  async updateUserProfile(userData) {
    return await axiosInstance.put('/users/profile', userData)
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

