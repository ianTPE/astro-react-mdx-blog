import AdvancedCodeBlock from '../AdvancedCodeBlock';

export default function BashDemo() {
  const code = `# 安裝依賴
npm install prism-react-renderer

# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build

# 預覽建構結果
npm run preview`;

  return (
    <AdvancedCodeBlock 
      language="bash" 
      title="終端機指令"
      theme="github"
      showLineNumbers={false}
    >
      {code}
    </AdvancedCodeBlock>
  );
}