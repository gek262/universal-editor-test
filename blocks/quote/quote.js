export default function decorate(block) {
  const [quoteWrapper, linkWrapper, titleLinkWrapper] = block.children;

  const blockquote = document.createElement('blockquote');
  blockquote.textContent = quoteWrapper.textContent.trim();
  quoteWrapper.replaceChildren(blockquote);

  const linkUrl = linkWrapper.querySelector('a')?.href || linkWrapper.textContent.trim();
  const linkTitle = titleLinkWrapper.textContent.trim();
  if (linkUrl && linkTitle) {
    const finalLink = document.createElement('a');
    finalLink.href = linkUrl;
    finalLink.textContent = linkTitle;
    finalLink.className = 'quote-link';
    linkWrapper.replaceChildren(finalLink);
    linkWrapper.classList.add('quote-link-container');
  }
}
