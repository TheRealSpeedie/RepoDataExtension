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
    Object.keys(data).forEach(key => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = key;
      dropdown.appendChild(option);
    });
    dropdown.style.display = 'block';
  
    dropdown.onchange = () => {
      const val = data[dropdown.value];
      document.getElementById('valueDisplay').textContent = JSON.stringify(val, null, 2);
    };
  
    dropdown.dispatchEvent(new Event('change'));
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
  