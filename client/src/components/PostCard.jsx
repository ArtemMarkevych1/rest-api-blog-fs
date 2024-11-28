import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { format, parseISO } from 'date-fns'
import { useState } from 'react'
import { postService } from '../services/api'

function PostCard({ post, onEdit, onDelete, onToggleLike, fullView }) {
  const { user } = useSelector(state => state.auth)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [commentText, setCommentText] = useState('')
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingCommentText, setEditingCommentText] = useState('')

  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString)
      return format(date, 'MMMM d, yyyy')
    } catch (error) {
      return  error.message
    }
  }

  const handleAddComment = async () => {
    if (!commentText.trim()) return
    try {
      await postService.addComment(post._id, { content: commentText })
      setCommentText('')
      // Refresh post data or update state to include new comment
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  const handleEditComment = async (commentId) => {
    if (!editingCommentText.trim()) return
    try {
      await postService.updateComment(post._id, commentId, { content: editingCommentText })
      setEditingCommentId(null)
      setEditingCommentText('')
      // Refresh post data or update state to reflect edited comment
    } catch (error) {
      console.error('Error editing comment:', error)
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await postService.deleteComment(post._id, commentId)
      // Refresh post data or update state to remove deleted comment
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  // Check if current user has liked this post
  const hasUserLiked = user && post.likes?.includes(user.data._id)

  const handleMouseMove = (e) => {
    setTooltipPosition({ x: e.clientX + 10, y: e.clientY })
  }

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {post.image && (
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
            {post.category}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(post.createdAt)}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {post.title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.content}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {post.createdBy?.username || 'Loading...'}
            </div>

            {/* Like Button with dynamic styling based on like state */}
            {fullView && user && (
              <div className="relative">
                <button
                  onClick={() => onToggleLike(post._id)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onMouseMove={handleMouseMove}
                  className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-200 ${
                    hasUserLiked 
                      ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                      : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <svg 
                    className={`w-5 h-5 transition-all duration-200 ${
                      hasUserLiked ? 'fill-current' : 'stroke-current fill-none'
                    }`} 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                  <span className="font-medium">{post.likesCount || 0}</span>
                </button>

                {showTooltip && (
                  <div 
                    className="absolute p-2 bg-white border border-gray-200 rounded-md shadow-lg"
                    style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
                  >
                    <ul className="mt-1 text-sm text-gray-600">
                      {post.likes?.map(like => (
                        <li key={like}>
                          {like}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {fullView && user && user.data._id === post.createdBy?._id && (
            <div className="flex space-x-2">
              <button
                onClick={() => onDelete(post)}
                className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-300"
              >
                Delete
              </button>
              <button
                onClick={() => onEdit(post)}
                className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-300"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-900">Comments</h4>
          <div className="mt-2">
            {post.comments && post.comments.length > 0 && post.comments.map(comment => (
              <div key={comment._id} className="flex items-start space-x-2 mb-2">
                <div className="flex-1">
                  {editingCommentId === comment._id ? (
                    <input
                      type="text"
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  ) : (
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  )}
                  <p className="text-xs text-gray-500">by {comment.createdBy.username} on {formatDate(comment.createdAt)}</p>
                </div>
                {user && user._id === comment.createdBy._id && (
                  <div className="flex space-x-1">
                    {editingCommentId === comment._id ? (
                      <button
                        onClick={() => handleEditComment(comment._id)}
                        className="text-blue-500 hover:underline"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingCommentId(comment._id)
                          setEditingCommentText(comment.content)
                        }}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <button
              onClick={handleAddComment}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    createdBy: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }),
    likes: PropTypes.arrayOf(PropTypes.string),
    likesCount: PropTypes.number,
    likedUsernames: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdBy: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }),
      createdAt: PropTypes.string.isRequired
    }))
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onToggleLike: PropTypes.func,
  fullView: PropTypes.bool
}

export default PostCard 