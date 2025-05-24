import { useState } from 'react';

export default function SimpleCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const Button = ({ onClick, className = '', children, ...props }: any) => (
    <button
      onClick={onClick}
      className={`h-12 text-lg font-medium rounded-lg transition-all duration-150 ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
      <h3 className="text-lg font-bold mb-4 text-center">交互式計算器</h3>
      
      {/* 顯示屏 */}
      <div className="bg-gray-900 text-white p-4 rounded-lg mb-4 text-right">
        <div className="text-2xl font-mono overflow-hidden">
          {display}
        </div>
        {operation && (
          <div className="text-sm text-gray-400">
            {previousValue} {operation}
          </div>
        )}
      </div>

      {/* 按鈕網格 */}
      <div className="grid grid-cols-4 gap-2">
        {/* 第一行 */}
        <Button 
          onClick={clear}
          className="bg-red-500 hover:bg-red-600 text-white col-span-2"
        >
          清除
        </Button>
        <Button 
          onClick={() => inputOperation('÷')}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          ÷
        </Button>
        <Button 
          onClick={() => inputOperation('×')}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          ×
        </Button>

        {/* 第二行 */}
        <Button 
          onClick={() => inputNumber('7')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          7
        </Button>
        <Button 
          onClick={() => inputNumber('8')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          8
        </Button>
        <Button 
          onClick={() => inputNumber('9')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          9
        </Button>
        <Button 
          onClick={() => inputOperation('-')}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          -
        </Button>

        {/* 第三行 */}
        <Button 
          onClick={() => inputNumber('4')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          4
        </Button>
        <Button 
          onClick={() => inputNumber('5')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          5
        </Button>
        <Button 
          onClick={() => inputNumber('6')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          6
        </Button>
        <Button 
          onClick={() => inputOperation('+')}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          +
        </Button>

        {/* 第四行 */}
        <Button 
          onClick={() => inputNumber('1')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          1
        </Button>
        <Button 
          onClick={() => inputNumber('2')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          2
        </Button>
        <Button 
          onClick={() => inputNumber('3')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          3
        </Button>
        <Button 
          onClick={performCalculation}
          className="bg-green-500 hover:bg-green-600 text-white row-span-2"
        >
          =
        </Button>

        {/* 第五行 */}
        <Button 
          onClick={() => inputNumber('0')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 col-span-2"
        >
          0
        </Button>
        <Button 
          onClick={() => inputNumber('.')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          .
        </Button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        完全功能的計算器組件！
      </div>
    </div>
  );
}
