import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, deletePost } from '../store/actions/postActions'
import CreatePost from '../components/CreatePost'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import EditPostModal from '../components/EditPostModal'
import PostCard from '../components/PostCard'

function Home() {
  const dispatch = useDispatch()
  const { items: posts, loading, error } = useSelector(state => state.posts)
  const { user } = useSelector(state => state.auth)

  const [post, setPost] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleDeleteClick = (post) => {
    setPost(post)
    setDeleteModal(true)
  }

  const handleDeleteConfirm = (post) => {
    if (post) {
      dispatch(deletePost(post._id))
      setDeleteModal(false)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal(false)
  }

  const handleEditClick = (post) => {
    setPost(post)
    setEditModal(true)
  }

  const handleEditCancel = () => {
    setEditModal(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-600 mt-2">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DeleteConfirmModal
        isOpen={deleteModal}
        onClose={handleDeleteCancel}
        onConfirm={() => handleDeleteConfirm(post)}
        title={"Are you sure you want to delete this post?"}
      />

      <EditPostModal
        isOpen={editModal}
        onClose={handleEditCancel}
        post={post}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Latest Blog Posts
          </h1>
          {user && (
            <div className="mt-8">
              <CreatePost />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts && posts.length > 0 && posts.map(post => (
            <PostCard
              key={post._id}
              post={post}
              onEdit={() => handleEditClick(post)}
              onDelete={() => handleDeleteClick(post)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home