// Shiki 代碼塊增強腳本
// 為所有代碼塊添加複製按鈕

function enhanceCodeBlocks() {
  // 尋找所有的 pre 標籤（Shiki 生成的代碼塊）
  const codeBlocks = document.querySelectorAll('pre[data-language]');
  
  codeBlocks.forEach((pre) => {
    // 避免重複添加按鈕
    if (pre.querySelector('.copy-button')) return;
    
    // 創建容器
    const container = document.createElement('div');
    container.className = 'code-block-container';
    container.style.position = 'relative';
    container.style.marginBottom = '1.5rem';
    
    // 包裝原有的 pre 元素
    pre.parentNode.insertBefore(container, pre);
    container.appendChild(pre);
    
    // 創建複製按鈕
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = '複製';
    copyButton.setAttribute('aria-label', '複製代碼');
    
    // 按鈕樣式
    copyButton.style.cssText = `
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: rgba(55, 65, 81, 0.8);
      color: white;
      border: none;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      backdrop-filter: blur(4px);
      z-index: 10;
    `;
    
    // 懸停效果
    copyButton.addEventListener('mouseenter', () => {
      copyButton.style.background = 'rgba(75, 85, 99, 0.9)';
    });
    
    copyButton.addEventListener('mouseleave', () => {
      copyButton.style.background = 'rgba(55, 65, 81, 0.8)';
    });
    
    // 複製功能
    copyButton.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      if (!code) return;
      
      const textToCopy = code.textContent || code.innerText;
      
      try {
        await navigator.clipboard.writeText(textToCopy);
        
        // 成功反饋
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = '已複製!';
        copyButton.style.background = 'rgba(34, 197, 94, 0.8)';
        
        setTimeout(() => {
          copyButton.innerHTML = originalText;
          copyButton.style.background = 'rgba(55, 65, 81, 0.8)';
        }, 2000);
        
      } catch (err) {
        console.error('複製失敗:', err);
        
        // 錯誤反饋
        copyButton.innerHTML = '複製失敗';
        copyButton.style.background = 'rgba(239, 68, 68, 0.8)';
        
        setTimeout(() => {
          copyButton.innerHTML = '複製';
          copyButton.style.background = 'rgba(55, 65, 81, 0.8)';
        }, 2000);
      }
    });
    
    // 添加按鈕到容器
    container.appendChild(copyButton);
    
    // 添加語言標籤（可選）
    const language = pre.getAttribute('data-language');
    if (language) {
      const langLabel = document.createElement('div');
      langLabel.className = 'language-label';
      langLabel.textContent = language;
      langLabel.style.cssText = `
        position: absolute;
        top: 0.5rem;
        left: 0.75rem;
        background: rgba(55, 65, 81, 0.8);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 500;
        backdrop-filter: blur(4px);
        z-index: 10;
      `;
      container.appendChild(langLabel);
    }
  });
}

// 頁面載入後執行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', enhanceCodeBlocks);
} else {
  enhanceCodeBlocks();
}

// 支援動態內容（如果需要）
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      enhanceCodeBlocks();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
