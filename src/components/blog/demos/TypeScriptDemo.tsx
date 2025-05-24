import CodeBlock from '../CodeBlock';

export default function TypeScriptDemo() {
  const code = `interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

class ApiClient {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`);
    const data = await response.json();
    
    return {
      data,
      status: response.status,
      message: response.ok ? 'Success' : 'Error'
    };
  }
}`;

  return (
    <CodeBlock 
      language="typescript" 
      filename="utils/api.ts"
      showLineNumbers={true}
    >
      {code}
    </CodeBlock>
  );
}