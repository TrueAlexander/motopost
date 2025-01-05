const categoryName = (catSlug) => {
  
  const wordsWithAccents = {
    'noticias': 'notícias',
    'viagens' : 'viagens',
    'oficina' : 'oficína',
    'dicas' : 'dicas',
    'estilo' : 'estilo',
    'outro' : 'outro'
    }

  return wordsWithAccents[catSlug.toLowerCase()] || catSlug
}

export default categoryName

