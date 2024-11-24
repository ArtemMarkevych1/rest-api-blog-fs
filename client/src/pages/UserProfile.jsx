import { useSelector, useDispatch } from 'react-redux'
import { format, parseISO } from 'date-fns'
import PostCard from '../components/PostCard'
import { useEffect } from 'react'
import { fetchUserProfile } from '../store/actions/userActions'

function UserProfile() {
  const dispatch = useDispatch()
  const { profile, loading } = useSelector(state => state.user)
  const { posts, createdAt, profilePicture, username, email, role } = profile || {}

  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString)
      return format(date, 'MMMM d, yyyy')
    } catch (error) {
      console.error('Date parsing error:', error)
      return 'Invalid date'
    }
  }

  const handleEditPost = (post) => {
    // Handle edit post
    console.log('Edit post:', post)
  }

  const handleDeletePost = (post) => {
    // Handle delete post
    console.log('Delete post:', post)
  }

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-600 mt-2">User not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-purple-600 to-indigo-600">
            {/* Profile Picture */}
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt={username}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-sm hover:bg-gray-50">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-8 pt-16 pb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{username}</h1>
                <p className="text-gray-500">{email}</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors duration-300">
                Edit Profile
              </button>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-semibold text-gray-900">{posts?.length}</p>
                <p className="text-sm text-gray-500">Posts</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-semibold text-gray-900">0</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-semibold text-gray-900">0</p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Joined {formatDate(createdAt)}</span>
              </div>
              {role === 1 && (
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>Admin</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User's Posts Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">My Posts</h2>

          {posts?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {posts.map(post => (
                <PostCard 
                  key={post._id} 
                  post={post}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No posts yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile 