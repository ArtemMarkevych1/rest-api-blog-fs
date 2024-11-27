import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { format, parseISO } from 'date-fns'
import { useState } from 'react'

function PostCard({ post, onEdit, onDelete, onToggleLike, fullView }) {
  const { user } = useSelector(state => state.auth)
  const [showTooltip, setShowTooltip] = useState(false)

  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString)
      return format(date, 'MMMM d, yyyy')
    } catch (error) {
      return error.message
    }
  }

  // Check if current user has liked this post
  const hasUserLiked = user && post.likes?.includes(user.data._id)

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
              {post.createdBy?.username || 'Unknown'}
            </div>

            {/* Like Button with dynamic styling based on like state */}
            {fullView && user && (
              <div className="relative">
                <button
                  onClick={() => onToggleLike(post._id)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
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

                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute left-0 mt-2 w-48 p-2 bg-white border border-gray-200 rounded-md shadow-lg">
                    <h4 className="text-sm font-semibold text-gray-700">Liked by:</h4>
                    <ul className="mt-1 text-sm text-gray-600">
                      {post.likesDetails?.map(like => (
                        <li key={like.userId}>
                          {like.username} on {formatDate(like.date)}
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
    likesDetails: PropTypes.arrayOf(PropTypes.shape({
      userId: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    }))
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onToggleLike: PropTypes.func,
  fullView: PropTypes.bool
}

export default PostCard 