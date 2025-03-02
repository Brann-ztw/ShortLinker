const form = document.getElementById('shorten-form');
const urlInput = document.getElementById('url-input');
const resultDiv = document.getElementById('result');
const shortenedUrlLink = document.getElementById('shortened-url');
const errorDiv = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const urlList = document.getElementById('urls');
const submitButton = document.getElementById('submit-button');
const buttonText = document.getElementById('button-text');
const buttonLoader = document.getElementById('button-loader');
const copyButton = document.getElementById('copy-button');

const shortenUrl = async (url) => {
  try {
    const response = await fetch(`/shorten?url=${encodeURIComponent(url)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error('Error al acortar la URL');
    }

    const data = await response.json();
    return data.shortenedUrl;
  } catch (err) {
    throw new Error('Error al acortar la URL. Inténtalo de nuevo.');
  }
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const originalUrl = urlInput.value.trim();

  if (!originalUrl) {
    showError('Por favor, ingresa una URL válida.');
    return;
  }

  submitButton.disabled = true;
  buttonText.classList.add('hidden');
  buttonLoader.classList.remove('hidden');

  try {
    const shortenedUrl = await shortenUrl(originalUrl);
    showResult(shortenedUrl);
    addUrlToList(shortenedUrl);
  } catch (err) {
    showError(err.message);
  } finally {
    submitButton.disabled = false;
    buttonText.classList.remove('hidden');
    buttonLoader.classList.add('hidden');
  }
});

const showResult = (url) => {
  shortenedUrlLink.href = url;
  shortenedUrlLink.textContent = url;
  resultDiv.classList.remove('hidden');
  errorDiv.classList.add('hidden');
};

const showError = (message) => {
  errorMessage.textContent = message;
  errorDiv.classList.remove('hidden');
  resultDiv.classList.add('hidden');
};

const addUrlToList = (url) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = url;
  a.textContent = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  li.appendChild(a);
  urlList.appendChild(li);
};

copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(shortenedUrlLink.href)
    .then(() => {
      alert('URL copiada al portapapeles');
    })
    .catch(() => {
      alert('Error al copiar la URL');
    });
});