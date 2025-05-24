import AdvancedCodeBlock from '../AdvancedCodeBlock';

export default function ReactHookDemo() {
  const code = `import { useState, useEffect } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);
  
  return {
    count,
    increment,
    decrement,
    reset
  };
}

export default function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div className="flex items-center space-x-4">
      <button onClick={decrement}>-</button>
      <span>Count: {count}</span>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`;

  return (
    <AdvancedCodeBlock 
      language="jsx" 
      title="React Hook 範例"
      theme="dracula"
      showLineNumbers={true}
      highlightLines={[8, 12, 16]}
    >
      {code}
    </AdvancedCodeBlock>
  );
}