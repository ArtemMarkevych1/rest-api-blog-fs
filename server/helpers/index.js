const Categories = {
    TECHNOLOGY: 'Technology',
    LIFESTYLE: 'Lifestyle',
    TRAVEL: 'Travel',
    FOOD: 'Food',
    HEALTH: 'Health',
    FITNESS: 'Fitness',
    BUSINESS: 'Business',
    FINANCE: 'Finance',
    EDUCATION: 'Education',
    ENTERTAINMENT: 'Entertainment',
    GAMING: 'Gaming',
    SCIENCE: 'Science',
    OTHER: 'Other'
}

const isValidCategory = (category) => {
    return Object.values(Categories).includes(category)
}

module.exports = {
    Categories,
    isValidCategory
}
