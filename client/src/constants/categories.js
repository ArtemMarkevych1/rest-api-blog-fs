export const Categories = {
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

export const CategoryLabels = Object.values(Categories)

export const CategoryOptions = Object.entries(Categories).map(([key, value]) => ({
  value: key,
  label: value
})) 

export const isValidCategory = (category) => {
  return Object.values(Categories).includes(category)
}

