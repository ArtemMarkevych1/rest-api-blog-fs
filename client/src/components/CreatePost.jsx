import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../store/actions/postActions'

function CreatePost() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.posts)
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    excerpt: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost(postData))
    setPostData({ title: '', content: '', excerpt: '' })
  }

  return (
    <div className="create-post">
      <h2>Create New Post</h2>
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
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  )
}

export default CreatePost 