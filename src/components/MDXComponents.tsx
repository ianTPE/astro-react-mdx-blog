import CodeBlock from './blog/CodeBlock';
import AdvancedCodeBlock from './blog/AdvancedCodeBlock';

// MDX 組件映射
export const mdxComponents = {
  // 基本代碼區塊 - 用於標準的 ```language 語法
  pre: ({ children, ...props }: any) => {
    // 檢查是否為代碼區塊
    if (children?.props?.className && typeof children.props.children === 'string') {
      const language = children.props.className.replace('language-', '');
      const code = children.props.children;
      
      return (
        <CodeBlock language={language} showLineNumbers={true}>
          {code}
        </CodeBlock>
      );
    }
    
    // 如果children是字符串，直接使用
    if (typeof children === 'string') {
      return (
        <CodeBlock language="text" showLineNumbers={false}>
          {children}
        </CodeBlock>
      );
    }
    
    // 普通的 pre 標籤
    return <pre {...props}>{children}</pre>;
  },
  
  // 直接使用組件
  CodeBlock,
  AdvancedCodeBlock,
};

// 導出各個組件供直接使用
export { CodeBlock, AdvancedCodeBlock };