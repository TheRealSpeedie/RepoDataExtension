document.getElementById('fetchBtn').addEventListener('click', async () => {
    const tab = await getActiveTab();
    const [{ result: repoData }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.repoData
    });
  
    const apiUrl = `https://api.github.com/repos/${repoData.user}/${repoData.repo}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
  
    populateDropdown(data);
    enableDownload(data);
  });
  
  function getActiveTab() {
    return new Promise(resolve => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => resolve(tabs[0]));
    });
  }
  
  function populateDropdown(data) {
    const dropdown = document.getElementById('dropdown');
    dropdown.innerHTML = '';
    
    Object.keys(data).sort().forEach(key => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = key;
      dropdown.appendChild(option);
    });
  
    dropdown.style.display = 'block';
  
    dropdown.onchange = () => {
      const val = data[dropdown.value];
      const display = document.getElementById('valueDisplay');
      display.innerHTML = formatValue(val);
    };
  
    dropdown.dispatchEvent(new Event('change'));
  }
  
  function formatValue(val) {
    if (typeof val === 'object' && val !== null) {
      return Object.entries(val).map(([k, v]) => `<b>${k}:</b> ${formatSingleValue(v)}`).join('<br>');
    } else {
      return formatSingleValue(val);
    }
  }
  
  function formatSingleValue(v) {
    if (typeof v === 'string') {
      if (isValidUrl(v)) {
        return `<a href="${v}" target="_blank">${v}</a>`;
      } else if (isValidDate(v)) {
        return formatDate(v);
      } else {
        return v;
      }
    }
    return JSON.stringify(v);
  }
  
  function isValidUrl(str) {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  }
  
  function isValidDate(str) {
    const d = new Date(str);
    return !isNaN(d.getTime()) && /^\d{4}-\d{2}-\d{2}T/.test(str);
  }
  
  function formatDate(str) {
    const d = new Date(str);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }
  
  
  function enableDownload(data) {
    const btn = document.getElementById('downloadBtn');
    btn.style.display = 'block';
    btn.onclick = () => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'repo_data.json';
      a.click();
      URL.revokeObjectURL(url);
    };
  }
  document.getElementById('copyBtn').onclick = () => {
    const content = document.getElementById('valueDisplay').innerText;
    navigator.clipboard.writeText(content).then(() => {
      const btn = document.getElementById('copyBtn');
      btn.textContent = '✅';
      setTimeout(() => btn.textContent = '📋', 1500);
    });
  };
  
  
  