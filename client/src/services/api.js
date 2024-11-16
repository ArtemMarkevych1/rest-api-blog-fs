import axiosInstance from './axiosInstance'

class AuthService {
  async signIn(credentials) {
    const data = await axiosInstance.post('/auth/login', credentials)
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
    return data
  }

  async signUp(userData) {
    const data = await axiosInstance.post('/auth/signup', userData)
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
    return data
  }

  signOut() {
    localStorage.removeItem('token')
  }

  async getCurrentUser() {
    const response = await axiosInstance.get('/auth/current-user')
    return response.data
  }
}

class PostService {
  async getPosts() {
    return await axiosInstance.get('/post')
  }

  async getPost(postId) {
    return await axiosInstance.get(`/posts/${postId}`)
  }

  async createPost(postData) {
    return await axiosInstance.post('/posts', postData)
  }

  async updatePost(postId, postData) {
    return await axiosInstance.put(`/posts/${postId}`, postData)
  }

  async deletePost(postId) {
    return await axiosInstance.delete(`/posts/${postId}`)
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