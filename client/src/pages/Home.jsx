import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../store/actions/postActions'
import CreatePost from '../components/CreatePost'

function Home() {
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector(state => state.posts)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  if (loading) {
    // console.log('Loading state:', loading)
    return <div>Loading...</div>
  }
  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="home">
      {user && <CreatePost />}
      <h1>Latest Blog Posts</h1>
      <div className="posts-grid">
        <pre>{JSON.stringify(posts, null, 2)}</pre>
      </div>
    </div>
  )
}

export default Home 