import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../store/reducers/authReducer'
import { setCurrentCategory, fetchPostsRequest } from '../store/reducers/postReducer'
import { fetchUserProfile } from '../store/actions/userActions'
import { useEffect, useState } from 'react'
import ConfirmationModal from './ConfirmationModal'

const CATEGORIES = [
  { id: 'Technology', label: 'Technology' },
  { id: 'Lifestyle', label: 'Lifestyle' },
  { id: 'Travel', label: 'Travel' },
  { id: 'Food', label: 'Food' },
  { id: 'Health', label: 'Health' },
  { id: 'Fitness', label: 'Fitness' },
  { id: 'Business', label: 'Business' },
  { id: 'Finance', label: 'Finance' },
  { id: 'Education', label: 'Education' },
  { id: 'Entertainment', label: 'Entertainment' },
  { id: 'Gaming', label: 'Gaming' },
  { id: 'Science', label: 'Science' }
]

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { profile, loading } = useSelector(state => state.user)
  const { user } = useSelector(state => state.auth)
  const currentCategory = searchParams.get('category')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (user) {
      dispatch(fetchUserProfile())
    }
  }, [dispatch, user])

  const handleSignOut = () => {
    dispatch(signOut())
    dispatch({ type: 'user/clearProfile' })
    navigate('/signin')
    closeModal()
  }

  const handleCategorySelect = (categoryId) => {
    setSearchParams({
      category: categoryId,
      page: '1',
      size: '10'
    })

    dispatch(setCurrentCategory(categoryId))
    dispatch(fetchPostsRequest({
      category: categoryId,
      page: 1,
      size: 10
    }))
  }

  const handleResetFilters = () => {
    setSearchParams({})

    dispatch(setCurrentCategory(null))

    dispatch(fetchPostsRequest({
      page: 1,
      size: 10
    }))
  }

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) {
      dispatch(setCurrentCategory(categoryFromUrl))
      dispatch(fetchPostsRequest({
        category: categoryFromUrl,
        page: parseInt(searchParams.get('page')) || 1,
        size: parseInt(searchParams.get('size')) || 10
      }))
    }
  }, [dispatch, searchParams])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <svg className="h-8 w-8 text-apple-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                </svg>
                <span className="ml-2 text-xl font-semibold text-gray-900">Blog</span>
              </Link>

              {/* Categories Dropdown */}
              <div className="relative ml-6 group">
                <button className="nav-link flex items-center">
                  Categories
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1" role="menu">
                    {CATEGORIES.map(category => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`block w-full text-left px-4 py-2 text-sm ${currentCategory === category.id
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        role="menuitem"
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reset Filters Button - Only show when category is selected */}
              {currentCategory && (
                <button
                  onClick={handleResetFilters}
                  className="ml-4 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reset Filters
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {loading ? (
                // Loading skeleton
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
                </div>
              ) : user && profile ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className="nav-link flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {profile.username}
                  </Link>
                  <button
                    onClick={openModal}
                    className="nav-link flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/signin"
                    className="nav-link"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleSignOut}
        message="Are you sure you want to sign out?"
      />
    </>

  )
}

export default Navbar 