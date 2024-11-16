import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { fetchUserPosts, deletePost } from '../store/actions/postActions'
import EditPost from '../components/EditPost'

function UserProfile() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { userPosts, loading, error } = useSelector(state => state.posts)
  const [editingPost, setEditingPost] = useState(null)

  useEffect(() => {
    if (user) {
      dispatch(fetchUserPosts(user._id))
    }
  }, [dispatch, user])

  if (!user) return <Navigate to="/signin" />
  if (loading) return <div>Loading...</div>
  if (error) return <div className="error">{error}</div>

  const handleEditClick = (post) => {
    setEditingPost(post)
  }

  const handleEditClose = () => {
    setEditingPost(null)
  }

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="user-info">
        <h2>{user.username}</h2>
        <p>{user.email}</p>
      </div>
      
      {editingPost && (
        <EditPost post={editingPost} onClose={handleEditClose} />
      )}
      
      <div className="user-posts">
        <h3>Your Posts</h3>
        {userPosts.map(post => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <div className="post-actions">
              <button onClick={() => handleEditClick(post)}>Edit</button>
              <button onClick={() => dispatch(deletePost(post._id))}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserProfile 