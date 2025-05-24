import { useState, useMemo } from 'react';

interface TableData {
  id: number;
  name: string;
  value: number;
  category: string;
  status: 'active' | 'inactive' | 'pending';
}

interface InteractiveTableProps {
  data: TableData[];
  title?: string;
}

export default function InteractiveTable({ 
  data, 
  title = "交互式數據表格" 
}: InteractiveTableProps) {
  const [sortField, setSortField] = useState<keyof TableData>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = useMemo(() => {
    const cats = [...new Set(data.map(item => item.category))];
    return ['all', ...cats];
  }, [data]);
  
  const filteredAndSortedData = useMemo(() => {
    let filtered = data;
    
    // 篩選類別
    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }
    
    // 搜尋
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // 排序
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    return filtered;
  }, [data, sortField, sortDirection, filterCategory, searchTerm]);
  
  const handleSort = (field: keyof TableData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getSortIcon = (field: keyof TableData) => {
    if (field !== sortField) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      
      {/* 控制面板 */}
      <div className="mb-4 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="搜尋名稱..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? '所有類別' : cat}
            </option>
          ))}
        </select>
        
        <div className="text-sm text-gray-600 flex items-center">
          顯示 {filteredAndSortedData.length} 筆 / 共 {data.length} 筆
        </div>
      </div>
      
      {/* 表格 */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                onClick={() => handleSort('name')}
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-100 transition-colors"
              >
                名稱 {getSortIcon('name')}
              </th>
              <th 
                onClick={() => handleSort('value')}
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-100 transition-colors"
              >
                數值 {getSortIcon('value')}
              </th>
              <th 
                onClick={() => handleSort('category')}
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-100 transition-colors"
              >
                類別 {getSortIcon('category')}
              </th>
              <th 
                onClick={() => handleSort('status')}
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-100 transition-colors"
              >
                狀態 {getSortIcon('status')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((item, index) => (
              <tr 
                key={item.id} 
                className={`hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-4 py-2 border-t border-gray-200 font-medium">
                  {item.name}
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {item.value.toLocaleString()}
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
