window.addEventListener("load", () => {
  navigator.serviceWorker.register("../sw.js?v=6-17-2024", {
    scope: "/a/",
  });
});

const form = document.getElementById("fs");
const input = document.getElementById("is");
const searchIconBtn = document.getElementById("search-icon-btn");
const micBtn = document.getElementById("mic-btn");

// Function to perform search
function performSearch() {
  if (window.top.location.pathname === "/rx") {
    processUrl(input.value, "");
  } else {
    processUrl(input.value, "/rx");
  }
}

// Form submit (Enter key)
if (form && input) {
  form.addEventListener("submit", async event => {
    event.preventDefault();
    performSearch();
  });
}

// Search icon button click
if (searchIconBtn) {
  searchIconBtn.addEventListener("click", () => {
    // Add click animation
    searchIconBtn.classList.add('clicked');
    setTimeout(() => {
      searchIconBtn.classList.remove('clicked');
    }, 300);
    
    performSearch();
  });
}

// Voice search functionality
if (micBtn) {
  let recognition = null;
  let isListening = false;
  
  micBtn.addEventListener("click", () => {
    if (isListening) {
      // Stop listening if already active
      if (recognition) {
        recognition.stop();
      }
      return;
    }
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      // Show listening state
      micBtn.style.background = 'rgba(118, 229, 252, 0.2)';
      micBtn.style.transform = 'scale(1.1)';
      micBtn.title = 'Listening... Click to stop';
      isListening = true;
      
      recognition.onstart = () => {
        micBtn.style.background = 'rgba(118, 229, 252, 0.3)';
        micBtn.title = 'Listening... Click to stop';
      };
      
      recognition.onresult = (event) => {
        if (event.results.length > 0) {
          const transcript = event.results[0][0].transcript;
          input.value = transcript;
          performSearch();
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error !== 'aborted') {
          micBtn.style.background = 'rgba(255, 0, 0, 0.1)';
          micBtn.title = 'Voice Search (Error)';
          setTimeout(() => {
            micBtn.style.background = '';
            micBtn.title = 'Voice Search';
          }, 2000);
        }
        isListening = false;
      };
      
      recognition.onend = () => {
        micBtn.style.background = '';
        micBtn.style.transform = '';
        micBtn.title = 'Voice Search';
        isListening = false;
      };
      
      try {
        recognition.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        micBtn.style.background = 'rgba(255, 0, 0, 0.1)';
        micBtn.title = 'Voice Search (Failed)';
        isListening = false;
        setTimeout(() => {
          micBtn.style.background = '';
          micBtn.title = 'Voice Search';
        }, 2000);
      }
    } else {
      // Fallback for browsers without speech recognition
      alert('Voice search is not supported in your browser. Please use the search bar instead.');
    }
  });
}
function processUrl(value, path) {
  let url = value.trim();
  const engine = localStorage.getItem("engine");
  const searchUrl = engine ? engine : "https://www.google.com/search?q=";

  if (!isUrl(url)) {
    url = searchUrl + url;
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    url = `https://${url}`;
  }

  sessionStorage.setItem("GoUrl", __uv$config.encodeUrl(url));
  const dy = localStorage.getItem("dy");

  if (dy === "true") {
    window.location.href = `/a/q/${__uv$config.encodeUrl(url)}`;
  } else if (path) {
    location.href = path;
  } else {
    window.location.href = `/a/${__uv$config.encodeUrl(url)}`;
  }
}

function go(value) {
  processUrl(value, "/rx");
}

function blank(value) {
  processUrl(value);
}

function dy(value) {
  processUrl(value, `/a/q/${__uv$config.encodeUrl(value)}`);
}

function isUrl(val = "") {
  if (
    /^http(s?):\/\//.test(val) ||
    (val.includes(".") && val.substr(0, 1) !== " ")
  ) {
    return true;
  }
  return false;
}