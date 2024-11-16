import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePost } from '../store/actions/postActions'

function EditPost({ post, onClose }) {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.posts)
  const [postData, setPostData] = useState({
    title: post.title,
    content: post.content,
    excerpt: post.excerpt
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updatePost(post._id, postData))
    onClose()
  }

  return (
    <div className="edit-post">
      <h2>Edit Post</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={postData.title}
            onChange={(e) => setPostData({...postData, title: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Excerpt:</label>
          <input
            type="text"
            value={postData.excerpt}
            onChange={(e) => setPostData({...postData, excerpt: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            value={postData.content}
            onChange={(e) => setPostData({...postData, content: e.target.value})}
            required
            rows={5}
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditPost 