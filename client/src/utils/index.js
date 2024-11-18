export const CATEGORIES = [
    { id: 'technology', label: 'Technology' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'travel', label: 'Travel' },
    { id: 'food', label: 'Food' },
    { id: 'health', label: 'Health' },
    { id: 'fitness', label: 'Fitness' },
    { id: 'business', label: 'Business' },
    { id: 'finance', label: 'Finance' },
    { id: 'education', label: 'Education' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'science', label: 'Science' }
  ] 

export const isValidCategory = (category) => {
  return Object.values(CATEGORIES).includes(category)
}