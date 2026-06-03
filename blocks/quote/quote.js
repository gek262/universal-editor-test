export default function decorate(block) {
  // Recuperiamo le 3 righe di contenuto in base all'ordine del JSON
  const [quoteWrapper, linkWrapper, titleLinkWrapper] = block.children;

  // Gestione della citazione
  const blockquote = document.createElement('blockquote');
  blockquote.textContent = quoteWrapper.textContent.trim();
  quoteWrapper.replaceChildren(blockquote);

  // Estraiamo l'URL (cercando il tag <a> generato da AEM o il testo puro)
  const linkUrl = linkWrapper.querySelector('a')?.href || linkWrapper.textContent.trim();
  // Estraiamo il testo inserito nel campo "Title Link"
  const linkTitle = titleLinkWrapper.textContent.trim();
  if (linkUrl && linkTitle) {
    const finalLink = document.createElement('a');
    finalLink.href = linkUrl;
    // Imposta il titolo come testo del link
    finalLink.textContent = linkTitle;
    finalLink.className = 'quote-link';
    // Sostituiamo il vecchio contenuto del link con il nuovo tag <a>
    linkWrapper.replaceChildren(finalLink);
    linkWrapper.classList.add('quote-link-container');
    // Rimuoviamo la riga del titolo per evitare duplicati visivi nella pagina
    titleLinkWrapper.remove();
  }
}
