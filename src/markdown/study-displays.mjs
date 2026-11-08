const elements = (node) => node.children.filter((child) => child.type === 'element');
const textOf = (node) => node.type === 'text' ? node.value : node.children.map(textOf).join('');

export default function studyDisplays() {
  return (tree, file) => {
    if (!file.path?.endsWith('/grant-review-precision.md')) return;
    for (let index = 0; index < tree.children.length; index++) {
      const paragraph = tree.children[index];
      if (paragraph.tagName !== 'p') continue;
      const [link] = elements(paragraph);
      if (link?.tagName !== 'a' || elements(link)[0]?.tagName !== 'img') continue;
      let next = index + 1;
      while (tree.children[next]?.type === 'text' && !tree.children[next].value.trim()) next++;
      const caption = tree.children[next];
      if (caption?.tagName !== 'p' || !/^Figure \d+\./.test(textOf(caption))) continue;
      caption.tagName = 'figcaption';
      tree.children.splice(index, next - index + 1, {
        type: 'element', tagName: 'figure', properties: { className: ['study-figure'] },
        children: [link, caption],
      });
    }
  };
}
