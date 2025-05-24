import AdvancedCodeBlock from '../AdvancedCodeBlock';

export default function JsonDemo() {
  const code = `{
  "name": "astro-react-mdx-blog",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/mdx": "^4.3.0",
    "@astrojs/react": "^4.3.0",
    "prism-react-renderer": "^2.3.1",
    "react": "^19.1.0",
    "tailwindcss": "^4.1.7"
  }
}`;

  return (
    <AdvancedCodeBlock 
      language="json" 
      filename="package.json"
      theme="nightOwl"
      showLineNumbers={true}
    >
      {code}
    </AdvancedCodeBlock>
  );
}