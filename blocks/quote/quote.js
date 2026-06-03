export default function decorate(block) {
  // 1. Recuperiamo tutte e 4 le righe generate dal tuo JSON
  const [quoteWrapper, authorWrapper, linkWrapper, titleLinkWrapper] = block.children;

  // 2. Gestiamo la citazione
  const blockquote = document.createElement('blockquote');
  blockquote.textContent = quoteWrapper ? quoteWrapper.textContent.trim() : '';
  quoteWrapper.replaceChildren(blockquote);

  // 3. Recuperiamo i dati dell'autore e del link
  const authorText = authorWrapper?.textContent.trim();
  // Cerchiamo se c'è già un tag <a> generato da AEM, altrimenti prendiamo il testo puro
  const linkUrl = linkWrapper?.querySelector('a')?.href || linkWrapper?.textContent.trim();
  const linkTitle = titleLinkWrapper?.textContent.trim();

  // 4. Se l'autore esiste, aggiungiamo una classe o lo formattiamo
  if (authorText && authorWrapper) {
    authorWrapper.classList.add('quote-author');
  }

  // 5. Uniamo il Titolo al Link
  if (linkUrl && linkTitle && linkWrapper && titleLinkWrapper) {
    // Creiamo il nuovo tag <a> definitivo
    const finalLink = document.createElement('a');
    finalLink.href = linkUrl;
    finalLink.textContent = linkTitle; // <--- Qui stiamo mettendo il titolo al link!
    finalLink.className = 'quote-link';

    // Sostituiamo il contenuto della riga del link con il nuovo link formattato
    linkWrapper.replaceChildren(finalLink);
    linkWrapper.classList.add('quote-link-container');

    // Visto che abbiamo unito tutto nella riga "linkWrapper", 
    // possiamo nascondere o rimuovere la riga "titleLinkWrapper" che non ci serve più visibile da sola
    titleLinkWrapper.remove();
  }
}