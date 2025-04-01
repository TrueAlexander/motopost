const categoryName = (catSlug) => {
  
  const wordsWithAccents = {
    'noticias': 'notícias',
    'motopedia' : 'motopédia',
    'viagens' : 'viagens',
    'oficina' : 'oficina',
    'estilo' : 'estilo',
    'custom' : 'custom'
    }

  return wordsWithAccents[catSlug.toLowerCase()] || catSlug
}

export default categoryName

