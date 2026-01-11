// filters.js
export const createFilter = ({
  query = '',
  category = 'Tous',
  categoryKey,
  searchKeys = [],
}) => {
  const lowerQuery = query.toLowerCase()

  return item => {
    // Vérifie la catégorie
    const matchesCategory =
      category === 'Tous' || item[categoryKey] === category

    // Vérifie le texte dans les champs de recherche
    const matchesQuery = searchKeys.some(key =>
      item[key]?.toLowerCase().includes(lowerQuery)
    )

    return matchesCategory && matchesQuery
  }
}

export default createFilter
