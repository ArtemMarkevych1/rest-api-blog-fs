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
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    postId: null,
    postTitle: ''
  })
  const [editModal, setEditModal] = useState({
    isOpen: false,
    post: null
  })

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleDeleteClick = (post) => {
    setDeleteModal({
      isOpen: true,
      postId: post._id,
      postTitle: post.title
    })
  }

  const handleDeleteConfirm = () => {
    if (deleteModal.postId) {
      dispatch(deletePost(deleteModal.postId))
      setDeleteModal({ isOpen: false, postId: null, postTitle: '' })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, postId: null, postTitle: '' })
  }

  const handleEditClick = (post) => {
    setEditModal({
      isOpen: true,
      post: post
    })
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
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title={deleteModal.postTitle}
      />

      <EditPostModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, post: null })}
        post={editModal.post}
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