import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../store/actions/userActions'

const EditProfileModal = ({ isOpen, onClose, profile }) => {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.posts)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        profilePicture: ''
    })

    useEffect(() => {
        if (profile) {
            setFormData({
                username: profile.username || '',
                email: profile.email || '',
                profilePicture: profile.profilePicture || ''
            })
        }
    }, [profile])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Create object with only changed fields
        const changedFields = {}
        if (formData.username !== profile.username) {
            changedFields.username = formData.username
        }
        if (formData.email !== profile.email) {
            changedFields.email = formData.email
        }
        if (formData.profilePicture !== profile.profilePicture) {
            changedFields.profilePicture = formData.profilePicture
        }

        // Only dispatch if there are changes
        if (Object.keys(changedFields).length > 0) {
            dispatch(updateUser(changedFields))
            onClose()
        } else {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden">
                <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                    {/* Header */}
                    <div className="px-6 py-4 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">Edit Profile</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Form Fields */}
                    <div className="px-6 py-4 space-y-6">
                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username <span className="text-red-500">{profile?.username ? '*' : ''}</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Image URL (Optional)
                            </label>
                            <input
                                type="url"
                                name="image"
                                id="image"
                                value={formData.profilePicture}
                                onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {formData.profilePicture && (
                                <div className="mt-2">
                                    <img
                                        src={formData.profilePicture}
                                        alt="Preview"
                                        className="h-32 w-auto object-cover rounded-md"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfileModal

EditProfileModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    refreshProfile: PropTypes.func,
    profile: PropTypes.object
}

