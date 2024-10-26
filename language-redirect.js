const userLang = navigator.language || navigator.userLanguage;
const defaultLang = 'en';
const supportedLanguages = ['ua', 'ru', 'en', 'be', 'es', 'it', 'ja', 'ko', 'sv', 'th', 'zh'];
const redirectFlagKey = 'initialRedirect';

let redirectLang = getSavedLanguage() || userLang.substr(0, 2).toLowerCase();
localStorage.clear();

console.log(redirectLang)

function saveLanguage(lang) {
  localStorage.setItem('selectedLanguage', lang);
}

function getSavedLanguage() {
  return localStorage.getItem('selectedLanguage');
}

function checkFileExists(url) {
    const img = new Image();
    img.src = url;
    return new Promise(resolve => {
        img.onload = img.onerror = () => resolve(img.complete);
    });
}

async function redirect(lang) {
    const url = `lang/${lang}/index.html`;
    if (await checkFileExists(url)) {
        window.location.href = url;
    } else {
        window.location.href = `lang/${defaultLang}/index.html`;
    }
}

if (!localStorage.getItem(redirectFlagKey)) {
  let redirectLang = getSavedLanguage();
  switch (userLang.substr(0, 2).toLowerCase()) {
    case 'uk':
      redirectLang = 'ua';
      break;
    case 'ru':
      redirectLang = 'ru';
      break;
    case 'sv':
      redirectLang = 'sv';
      break;
    case 'ko':
      redirectLang = 'ko';
      break;
    case 'be':
      redirectLang = 'be';
      break;
    case 'ja':
      redirectLang = 'ja';
      break;
    case 'th':
      redirectLang = 'th';
      break;
    case 'it':
      redirectLang = 'it';
      break;
    case 'es':
      redirectLang = 'es';
      break;
    case 'en':
      redirectLang = 'en';
      break;
    default:
      redirectLang = defaultLang;
  }
  saveLanguage(redirectLang);
  localStorage.setItem(redirectFlagKey, 'true'); // Устанавливаем флаг перенаправления
  redirect(redirectLang);
}
