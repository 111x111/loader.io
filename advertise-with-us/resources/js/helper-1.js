/// Executes as soon as page is loaded.
function main() {
  // Control floating appbar
  scrollListener();

  // Translate website to another language automatically if link contains #ru/#en/#ua/#pl or #de flag.
  if(window.location.href.includes('#ru')) {
    translateWebsite('Русский');
  } else if (window.location.href.includes('#ua')) {
    translateWebsite('Українська');
  } else if (window.location.href.includes('#en')) {
    translateWebsite('English');
  } else if (window.location.href.includes('#de')) {
    translateWebsite('Deutsch');
  } else if (window.location.href.includes('#pl')) {
    translateWebsite('Polski');
  } else if (window.location.href.includes('#it')) {
    translateWebsite('Italiano');
  } else if (window.location.href.includes('#tr')) {
    translateWebsite('Türk');
  } else if (window.location.href.includes('#es')) {
    translateWebsite('Español');
  } else if (window.location.href.includes('#cn')) {
    translateWebsite('中文');
  }

  // Restore language settings
  if (localStorage['language-suggestion-isAlreadyShown'] == null) {
    try {
      const websiteLanguage = document.getElementById("current-language").textContent;

      function _showLanguageChanger(translation, language, yes, no) {
        // Change translation of the language-suggestion block to the language that is set into the browser
        document.getElementsByClassName('language-suggestion-wrapper')[0].classList.add('visible');
        document.getElementById('language-suggestion').classList.add('shown');
        document.getElementById('SwitchTo').textContent = translation;
        document.getElementById('Yes').textContent = yes;
        document.getElementById('No').textContent = no;

        // Handle button clicks
        document.getElementById('Yes').onclick = () => {
          navigateToTranslatedWebsite(language, true);
          document.getElementById('language-suggestion').classList.remove('shown');
          document.getElementsByClassName('language-suggestion-wrapper')[0].classList.remove('visible');
        }
        document.getElementById('No').onclick = () => {
          document.getElementById('language-suggestion').classList.remove('shown');
          document.getElementsByClassName('language-suggestion-wrapper')[0].classList.remove('visible');
          localStorage['language-suggestion-isAlreadyShown'] = true;
        }
      }

      // Find translation entities for SwitchTo, Yes and No blocks
      const switchToMap = translationElements.find(entry => entry.name === 'SwitchTo').value;
      const yesMap = translationElements.find(entry => entry.name === 'Yes').value;
      const noMap = translationElements.find(entry => entry.name === 'No').value;

      // noinspection JSDeprecatedSymbols, get browser language
      const browserLanguage = (navigator.language || navigator.userLanguage).toLowerCase();

      // Show language changer tip if browser language does not match the website's one
      if (browserLanguage.includes('ru') && websiteLanguage !== 'Русский') {
        _showLanguageChanger(switchToMap[_languages['Русский']], 'Русский', yesMap[_languages['Русский']], noMap[_languages['Русский']]);
      } else if (browserLanguage.includes('ua') && websiteLanguage !== 'Українська') {
        _showLanguageChanger(switchToMap[_languages['Українська']], 'Українська', yesMap[_languages['Українська']], noMap[_languages['Українська']]);
      } else if ((browserLanguage.includes('en') || browserLanguage.includes('uk')) && websiteLanguage !== 'English') {
        _showLanguageChanger(switchToMap[_languages['English']], 'English', yesMap[_languages['English']], noMap[_languages['English']]);
      } else if (browserLanguage.includes('de') && websiteLanguage !== 'Deutsch') {
        _showLanguageChanger(switchToMap[_languages['Deutsch']], 'Deutsch', yesMap[_languages['Deutsch']], noMap[_languages['Deutsch']]);
      } else if (browserLanguage.includes('pl') && websiteLanguage !== 'Polski') {
        _showLanguageChanger(switchToMap[_languages['Polski']], 'Polski', yesMap[_languages['Polski']], noMap[_languages['Polski']]);
      } else if (browserLanguage.includes('it') && websiteLanguage !== 'Italiano') {
        _showLanguageChanger(switchToMap[_languages['Italiano']], 'Italiano', yesMap[_languages['Italiano']], noMap[_languages['Italiano']]);
      } else if (browserLanguage.includes('tr') && websiteLanguage !== 'Türk') {
        _showLanguageChanger(switchToMap[_languages['Türk']], 'Türk', yesMap[_languages['Türk']], noMap[_languages['Türk']]);
      } else if (browserLanguage.includes('es') && websiteLanguage !== 'Español') {
        _showLanguageChanger(switchToMap[_languages['Español']], 'Español', yesMap[_languages['Español']], noMap[_languages['Español']]);
      } else if (browserLanguage.includes('cn') && websiteLanguage !== '中文') {
        _showLanguageChanger(switchToMap[_languages['中文']], '中文', yesMap[_languages['中文']], noMap[_languages['中文']]);
      }
    } catch (_) {
      /* Do nothing */
    }
  }
}

/// Applies zoom style to all elements and calculates it by dividing window width by default 1920 value with precision
/// of two.
function adjustWindowForNewSize () {
  // Add listener on resize event and call rescale method as soon as page is loaded because no resizing is done on
  // initial page loading
  window.addEventListener('resize', function() {
    try {
       const highlightedItems = document.querySelectorAll('html');
       highlightedItems.forEach((highlightedItem) => {
         highlightedItem.style.zoom = (window.innerWidth / 1920).toPrecision(2);
         // Not working as expected
         // highlightedItem.style.MozTransform = `scale(${(window.innerWidth / 1920).toPrecision(2)})`;
       });
    } catch (_) {
      /* Do nothing */
    }
  }, true);
  try {
    const highlightedItems = document.querySelectorAll('html');
    highlightedItems.forEach((highlightedItem) => {
      highlightedItem.style.zoom = (window.innerWidth / 1920).toPrecision(2);
      // Not working as expected
      // highlightedItem.style.MozTransform = `scale(${(window.innerWidth / 1920).toPrecision(2)})`;
    });
  } catch (_) {
    /* Do nothing */
  }
}

/// Opens appropriate socials link depending on the website actual page.
function navigateToSocials(isSupportLink = false) {
  if(window.location.href.includes('ru.exloader.net') ||
    window.location.href.includes('ua.exloader.net') ||
    window.location.href.includes('#ru') ||
    window.location.href.includes('#ua')) {
    window.open(isSupportLink ? 'https://t.me/exloader' : 'https://t.me/swiftsoft_support');
  } else {
    window.open('https://discord.com/invite/jqQyAZdbPz');
  }
}

/// Opens google form for modifications adding requests.
function addToLibrary() {
  try {
    const websiteLanguage = document.getElementById("current-language").textContent;
    if(websiteLanguage === 'Русский' || websiteLanguage === 'Українська') {
      window.open('https://forms.gle/eoTGm11tzx5DW9Wq5');
    } else {
      window.open('https://forms.gle/MvsGdGc3eKVeuLPC7');
    }
  } catch (_) {
    /* Do nothing */
  }
}

/// Changes header style depending on current scroll position
function scrollListener() {
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 0 && !header.classList.contains('mods-header')) {
      header.classList.add("not-pinned");
    } else if(!header.classList.contains('mods-header')) {
      header.classList.remove("not-pinned");
    }
  });
}

/// Stores number of downloadInstaller attempts
var downloadAttempts = 0;

/// Opens appropriate installer downloading link depending on [is-partner] variable.
function downloadInstaller(isPartner = false) {
  // Save data for gtag manager
  let browserLanguage = 'un';
  let isEuropean = false;

  if(isPartner) {
    window.open('https://data.exloader.net/partner/ExLoader_Installer.exe');
  } else if (downloadAttempts >= 2) {
    // Save data to gtag and skip offer if user tries to press downloading button too ofter
    // (probably there is some issue with offer).
    try {
      browserLanguage = (navigator.language || navigator.userLanguage).toLowerCase();
      isEuropean = window.location.href.includes(".exloader.net") || !browserLanguage.includes("ru");
    } catch (_) {
     /* Do nothing */
    }
    window.open('https://data.exloader.net/ExLoader_Installer.exe');
  } else {
    try {
      browserLanguage = (navigator.language || navigator.userLanguage).toLowerCase();
      if(window.location.href.includes(".exloader.net") || !browserLanguage.includes("ru")) {
        window.open('https://rdce.me/i4Fx/');
        isEuropean = true;
      } else {
        window.open('https://data.exloader.net/ExLoader_Installer.exe');
      }
    } catch (_) {
      if(window.location.href.includes(".exloader.net")) {
        window.open('https://rdce.me/i4Fx/');
        isEuropean = true;
      } else {
        window.open('https://data.exloader.net/ExLoader_Installer.exe');
      }
    }
  }

  // Report data to google analytics
  try {
    gtag('event', 'download_installer', {
      'browserLanguage': browserLanguage,
      'isEuropean': isEuropean,
      'downloadAttempts': downloadAttempts,
    });
  } catch (_) {
    /* Do nothing */
  }
  downloadAttempts++;
}

/// Opens provided website page but keeps #en, #ua, etc. tags
function navigateToPageWithKeepingArguments(location) {
  if(window.location.href.includes('#en')) {
    window.location.href = location + '#en';
  } else if(window.location.href.includes('#ua')) {
    window.location.href = location + '#ua';
  } else if(window.location.href.includes('#de')) {
    window.location.href = location + '#de';
  } else if(window.location.href.includes('#pl')) {
    window.location.href = location + '#pl';
  } else if(window.location.href.includes('#ru')) {
    window.location.href = location + '#ru';
  } else {
    window.location.href = location;
  }
}

/// Define all languages to use variable shortcut later.
const _languages = {
   // Like "English language"
  'English': 'languageEn',
  'Українська': 'languageUa',
  'Polski': 'languagePl',
  'Deutsch': 'languageDe',
  'Русский': 'languageRu',
  'Italiano': 'languageIt',
  'Türk': 'languageTr',
  'Español': 'languageEs',
  '中文': 'languageCn',
}


/// Translation entities.
const translationElements = [
  {
    name: 'GamesTranslation', value: {
      languageEn: 'Games',
      languageRu: 'Игры',
      languageUa: 'Ігри',
      languagePl: 'Gry',
      languageDe: 'Spiele',
      languageIt: 'Giochi',
      languageTr: 'Oyunlar',
      languageEs: 'Juegos',
      languageCn: '游戏',
    },
  },
  {
   // Like "English language"
    name: 'LanguageTitle', value: {
      languageEn: 'English',
      languageRu: 'Русский',
      languageUa: 'Українська',
      languagePl: 'Polski',
      languageDe: 'Deutsch',
      languageIt: 'Italiano',
      languageTr: 'Türk',
      languageEs: 'Español',
      languageCn: '中文',
    },
  },
  {
    name: 'ContactsTranslation', value: {
      languageEn: "Contacts",
      languageRu: 'Контакты',
      languageUa: 'Контакти',
      languagePl: 'Kontakt',
      languageDe: 'Kontakte',
      languageIt: 'Contatti',
      languageTr: 'İletişim',
      languageEs: 'Contactos',
      languageCn: '联系方式',
    },
  },
  {
    // Like license agreement
    name: 'Agreement', value: {
      languageEn: 'Agreement',
      languageRu: 'Соглашение',
      languageUa: 'Угода',
      languagePl: 'Zgoda',
      languageDe: 'Lizenzvertrag',
      languageIt: 'Accordo',
      languageTr: 'Sözleşmesi',
      languageEs: 'Acuerdo',
      languageCn: '协议',
    },
  },
  {
    name: 'Download', value: {
      languageEn: 'Download',
      languageRu: 'Скачать',
      languageUa: 'Завантажити',
      languagePl: 'Pobierz',
      languageDe: 'Hochladen',
      languageIt: 'Scaricare',
      languageTr: 'İndir',
      languageEs: 'Descargar',
      languageCn: '下载',
    },
  },
  {
    name: 'ArticlesTranslation', value: {
      languageEn: 'Articles',
      languageRu: 'Статьи',
      languageUa: 'Статті',
      languagePl: 'Artykuły',
      languageDe: 'Artikel',
      languageIt: 'Articoli',
      languageTr: 'Makaleler',
      languageEs: 'Artículos',
      languageCn: '文章',
    },
  },
  {
    // Like "available more than 100 modifications"
    name: 'AvailableFirst', value: {
      languageEn: 'More',
      languageRu: 'Доступно',
      languageUa: 'Доступно',
      languagePl: 'Dostępnych',
      languageDe: 'Mehr',
      languageIt: 'Di più',
      languageTr: 'Mevcut',
      languageEs: 'Hay disponibles',
      languageCn: '可用',
    },
  },
  {
    // Like "available more than 100 modifications"
    name: 'AvailableSecond', value: {
      languageEn: 'than',
      languageRu: 'более',
      languageUa: 'понад',
      languagePl: 'ponad',
      languageDe: 'als',
      languageIt: 'Anche',
      languageTr: 'den fazla',
      languageEs: 'más de',
      languageCn: '更多',
    },
  },
  {
    // Like "available more than 100 modifications"
    name: 'AvailableThird', value: {
      languageEn: 'modifications',
      languageRu: 'модификаций',
      languageUa: 'модифікацій',
      languagePl: 'modyfikacji',
      languageDe: 'Spielmodifikationen',
      languageIt: 'Modifiche',
      languageTr: 'modifikasyon',
      languageEs: 'modificaciones',
      languageCn: '修改',
    },
  },
  {
    name: 'WeHaveCollectedAllFirst', value: {
      languageEn: 'We have collected',
      languageRu: 'Мы собрали все',
      languageUa: 'Ми зібрали всі',
      languagePl: 'Zebraliśmy wasze',
      languageDe: 'Wir haben Ihre',
      languageIt: 'Abbiamo raccolto',
      languageTr: 'Hepsini derledik',
      languageEs: 'Hemos recopilado todos',
      languageCn: '我们汇编了所有',
    },
  },
  {
    name: 'WeHaveCollectedAllSecond', value: {
      languageEn: 'your favourite modifications',
      languageRu: 'твои любимые модификации',
      languageUa: 'ваші улюблені модифікації',
      languagePl: 'ulubione modyfikacje w',
      languageDe: 'beliebtesten Mods in',
      languageIt: 'le tue modifiche preferite',
      languageTr: 'favori modifikasyonlarınız',
      languageEs: 'tus modificaciones favoritas',
      languageCn: '您最喜欢的修改',
    },
  },
  {
    name: 'WeHaveCollectedAllThird', value: {
      languageEn: 'in a single library',
      languageRu: 'в одном месте',
      languageUa: 'в одній бібліотеці',
      languagePl: 'jednej bibliotece',
      languageDe: 'einer einzigen Bibliothek',
      languageIt: 'in una singola libreria',
      languageTr: 'tek bir yerde',
      languageEs: 'en un solo lugar',
      languageCn: '一处',
    },
  },
  {
    name: 'UnifiedLibrary', value: {
      languageEn: 'ExLoader - unified library of game modifications',
      languageRu: 'ExLoader - единая библиотека игровых модификаций',
      languageUa: 'ExLoader - єдина бібліотека ігрових модифікацій',
      languagePl: 'ExLoader - Zjednoczona biblioteka modyfikacji gier',
      languageDe: "ExLoader - die einzige Bibliothek mit Spielmodifikationen",
      languageIt: 'ExLoader - libreria unificata delle modifiche del gioco',
      languageTr: 'ExLoader - birleşik oyun modifikasyonları kütüphanesi',
      languageEs: 'ExLoader: biblioteca unificada de modificaciones del juego',
      languageCn: 'ExLoader - 统一的游戏修改库',
    },
  },
  {
    name: 'WantedToDownloadFirst', value: {
      languageEn: 'Wanted to download free cheats or hacks for',
      languageRu: 'Хотел скачать бесплатные читы на',
      languageUa: 'Хотів завантажити безкоштовні чити для',
      languagePl: 'Chcesz pobrać darmowe cheaty lub hacki do',
      languageDe: "Wollten Sie kostenlose Cheats oder hacks für",
      languageIt: 'Volevo scaricare cheats o hacks gratuiti per',
      languageTr: 'Için ücretsiz hileler veya hackler indirmek istedim',
      languageEs: '¿Desea descargar trampas o hacks gratis para',
      languageCn: '想要免费下载 外挂 | 辅助 吗？',
    },
  },
  {
    name: 'WantedToDownloadSecond', value: {
      languageEn: "virus-free? All cheats and hacks are updated to the latest game version and have features such as wh, aim, skinchager, etc.",
      languageRu: 'без вирусов? Тебе в ExLoader! Все читы обновлены под ласт версию игры и включают в себя вх, аим, скинчейджер и т.д',
      languageUa: 'без вірусів? Тобі в ExLoader! Усі чити оновлені під ласт версію гри і включають в себе вх, аім, скінчейджер  і т.д.',
      languagePl: 'wolny od wirusów? Wszystkie cheaty lub hacki są aktualizowane w wersji gry na flippera i obejmują vh, aim, skinchager itp.',
      languageDe: "herunterladen virenfrei? Alle Cheats oder hacks werden unter der Flipper-Version des Spiels aktualisiert und beinhalten wh, aim, skinchager, etc.",
      languageIt: 'virus-gratis? Tutti i cheats o hacks sono aggiornati all\'ultima versione del gioco e hanno funzionalità come wh, aim, skinchager, ecc.',
      languageTr: "virüsler olmadan? ExLoader'dasınız! Tüm hileler oyunun en son sürümü için güncellenmiştir ve vh, aim, skinler vb. içerir.",
      languageEs: 'sin virus? ¡Estás en ExLoader! Todas las trampas o hacks están actualizados para la última versión del juego e incluyen wh, aim, skins, etc.',
      languageCn: '免费作弊器. 您的 ExLoader！所有 外挂 | 辅助 均更新至最新游戏版本，并具有wh、aim、皮肤修改器 | skinchanger 等功能。',
    },
  },
  {
    name: 'LangTag', value: {
      languageEn: 'en',
      languageRu: 'ru',
      languageUa: 'ua',
      languagePl: 'pl',
      languageDe: "de",
      languageIt: 'it',
      languageTr: 'tr',
      languageEs: 'es',
      languageCn: 'cn',
    },
  },
  {
    name: 'LangTagForAbsoluteLinks', value: {
      languageEn: 'en.',
      // Only this one must be empty!
      languageRu: '',
      languageUa: 'ua.',
      languagePl: 'pl.',
      languageDe: "de.",
      languageIt: 'it.',
      languageTr: 'tr.',
      languageEs: 'es.',
      languageCn: 'cn.',
    },
  },
  {
    name: 'MainPageTitle', value: {
      languageEn: 'ExLoader | Best free cheats and hacks for CS2 and other games',
      languageRu: 'ExLoader | Читы на КС2 и другие игры',
      languageUa: 'ExLoader | Чити на КС2 та інші ігри',
      languagePl: 'ExLoader | Najlepsze darmowe cheaty lub hacki do CS2 i innych gier',
      languageDe: "ExLoader | Beste kostenlose Cheats oder hacks für CS2 und andere Spiele",
      languageIt: 'ExLoader | I migliori cheats o hacks gratuiti per CS2 e altri giochi',
      languageTr: 'ExLoader | CS2 ve diğer oyunlar için hileler',
      languageEs: 'ExLoader | Trampas o hacks para CS2 y otros juegos',
      languageCn: 'ExLoader | CS2 和其他游戏的最佳免费 外挂 | 辅助',
    },
  },
  {
    name: 'MainPageDescription', value: {
      languageEn: 'This app will help you download mods, neuronets, bots and cheats and hacks for games including wh, trigger, skinchanger and aim!',
      languageRu: 'Это приложение поможет тебе скачать моды, нейросети, ботов и читы для CS2 и других игр, включая вх, trigger, аим, скинчейджер и aim!',
      languageUa: 'Ця програма допоможе тобі завантажити моди, нейромережі, ботів і чити для CS2 та інших ігор, включно з вх, trigger, аім, скінчейджер і aim!',
      languagePl: 'Ta aplikacja pomoże ci pobrać mody, neuronety, boty i cheaty lub hacki do CS2 i innych gier, w tym wh, trigger, skinchanger i aim!',
      languageDe: "Diese App wird dir helfen, Mods, Neuronetze, Bots und Cheats oder hacks für Spiele herunterzuladen, wh, trigger, skinchanger und aim!",
      languageIt: 'Questa app ti aiuterà a scaricare mods, neuronets, bot y cheats o hacks per giochi tra cui wh, trigger, skinchanger e aim!',
      languageTr: 'Bu uygulama CS2 modları, nöronetleri, botları ve wh, trigger, skinchanger ve aim dahil diğer oyunlar için hileleri indirmenize yardımcı olacak!',
      languageEs: 'Esta aplicación te ayudará a descargar mods, neuronets, bots y trampas o hacks para CS2 y otros juegos, unos ejemplos seria como wallhack, trigger, skinchanger, aim y etc...',
      languageCn: '此应用程序将帮助您下载 外挂 | 辅助 游戏，包括 wh、trigger、皮肤修改器 | skinchanger 和 aim！',
    },
  },
  {
    name: 'KeywordsTranslation', value: {
      languageEn: 'ExLoader, modifications, cs2, cs2 hacks, cs2 cheats, download, free, xloader, exlaoder, wh, aim, skin changer, bunnyhop, no ban, no viruses',
      languageRu: 'ExLoader, модификации, кс2, cs2, читы, cs2 hacks, cs2 cheats, скачать, бесплатный, экслоадер, еикслоадер, хлоадер, exlaoder, вх, аим, кс:го, скин чейнджер, skin changer, хак, банихоп, bunnyhop, без бана, без вирусов',
      languageUa: 'ExLoader, модифікації, cs2, cs2 хаки, cs2 чити, завантажити, безкоштовно, xloader, exlaoder, wh, aim, skin changer, bunnyhop, без бану, без вірусів',
      languagePl: 'ExLoader, modyfikacje, cs2, cs2 hacks, cs2 cheats, download, free, xloader, exlaoder, wh, aim, skin changer, bunnyhop, no ban, no viruses',
      languageDe: "ExLoader, Modifikationen, cs2, cs2 hacks, cs2 cheats, download, kostenlos, xloader, exlaoder, wh, aim, skin changer, bunnyhop, no ban, no viruses",
      languageIt: 'ExLoader, modifiche, cs2, hack cs2, cs2 cheats, download, gratuito, xloader, exlaoder, wh, aim, skin changer, bunnyhop, nessun ban, nessun virus',
      languageTr: 'ExLoader, modifikasyonlar, cs2, cs2 hackleri, cs2 hileleri, indir, ücretsiz, xloader, exlaoder, wh, aim, skin changer, bunnyhop, yasak yok, virüs yok',
      languageEs: 'ExLoader, modificaciones, cs2, cs2 hacks, cs2 trampas, cs2 cheats, descargar, gratis, xloader, exlaoder, wh, aim, skin changer, bunnyhop, no ban, no virus',
      languageCn: 'ExLoader, modifications, cs2 cs2 外挂 | 辅助, download, free, xloader, exlaoder, wh, aim, 皮肤修改器 | skin changer, bunnyhop, no ban, no viruses',
    },
  },
  {
    name: 'UnifiedLibraryDescription', value: {
      languageEn: 'Our application will help you to download mods, neuronets, bots and cheats and hacks for CS2 and other games, including wh, trigger, aim, skinchanger and all this for free, without any viruses.',
      languageRu: 'Наше приложение поможет тебе скачать моды, нейросети, ботов и читы для CS2 и других игр, включая вх, trigger, аим, wh, скинчейджер, aim, skinchanger и всё это совершенно бесплатно, без каких-либо вирусов.',
      languageUa: 'Наш застосунок допоможе тобі завантажити моди, нейромережі, ботів і чити для CS2 та інших ігор, включно з вх, trigger, аім, wh, скінчейджер, aim, skinchanger і все це абсолютно безплатно, без будь-яких вірусів.',
      languagePl: 'Nasza aplikacja pomoże ci pobrać mody, neuronety, boty i cheaty lub hacki do CS2 i innych gier, w tym wh, trigger, aim, skinchanger i wszystko to za darmo, bez żadnych wirusów.',
      languageDe: "Unsere App hilft dir, Mods, Neuronetze, Bots und Cheats oder hacks für CS2 und andere Spiele herunterzuladen, einschließlich inh, trigger, aim, wh, skinchanger und all das kostenlos und ohne Viren.",
      languageIt: 'La nostra applicazione ti aiuterà a scaricare mods, neuronets, bot e cheats o hacks per CS2 e altri giochi, inclusi wh, trigger, aim, skinchanger e tutto questo gratuitamente, senza virus.',
      languageTr: 'Uygulamamız, CS2 ve modları, nöronetleri, botları, diğer oyunlar için wh, trigger, aim, skinchanger ve tüm bunlar dahil olmak üzere hileleri herhangi bir virüs olmadan ücretsiz olarak indirmenize yardımcı olacaktır.',
      languageEs: 'Nuestra aplicación te ayudará a descargar mods, neuronets, bots y trampas o hacks para CS2 y otros juegos, incluyendo wh, trigger, aim, skinchanger y todo esto es gratis, sin virus y seguro.',
      languageCn: '我们的应用程序将帮助您下载 外挂 | 辅助 for CS2 和其他游戏，包括 wh、trigger、aim、皮肤修改器 | skinchanger 等，而且不含任何病毒。',
    },
  },
  {
    name: 'UnifiedLibraryDescriptionEnd', value: {
      languageEn: 'Wanted to find cheats and hacks for cs2 or some other game? Consider yourself lucky!',
      languageRu: 'Искал читы на кс2 или же какую-то другую игру? Считай, что тебе повезло!',
      languageUa: 'Шукав чити на кс2 або ж якусь іншу гру? Вважай, що тобі пощастило!',
      languagePl: 'Szukasz cheatów lub hacków do kcgo lub jakiejś innej gry? Uznaj się za szczęściarza!',
      languageDe: "Suchst du nach Cheats oder hacks für CS2 oder ein anderes Spiel? Betrachten Sie sich glücklich!",
      languageIt: 'Volevi trovare cheats o hacks per CS2 o qualche altro gioco? Considerati fortunato!',
      languageTr: 'CS2 veya başka bir oyun için hileler mi arıyordunuz? Kendinizi şanslı sayın!',
      languageEs: '¿Estabas buscando trampas o hacks para CS2 o algún otro juego? ¡Considérate afortunado!',
      languageCn: '想找到 CS2 或其他游戏的 外挂 | 辅助？ 请认为自己很幸运！',
    },
  },
  {
    name: 'ItsFree', value: {
      languageEn:
        "It's free. We support x64-bit Windows 10, Windows 11 and higher. ExLoader is also available for x64-bit Windows 7 and Windows 8.1, but without official support!",
      languageRu:
        'Это бесплатно. Мы поддерживаем x64-разрядную Windows 10, Windows 11 и выше. ExLoader так-же доступен на x64-разрядных Windows 7 и Windows 8.1, но без официальной поддержки!',
      languageUa:
        'Це безкоштовно. Ми підтримуємо x64-розрядну Windows 10, Windows 11 і вище. ExLoader також доступний на x64-розрядних Windows 7 і Windows 8.1, але без офіційної підтримки!',
      languagePl:
        'Jest za darmo. Wspieramy x64-bitowego Windows 10, Windows 11 i wyżej. ExLoader jest także dostępny dla x64-bitowej wersji Windows 7 i Windows 8.1, ale bez oficjalnego wsparcia!',
      languageDe:
        'Es ist kostenlos. Wir unterstützen x64-Bit-Windows 10, Windows 11 und höher. ExLoader ist auch auf x64-basierten Windows 7 und Windows 8.1-Systemen verfügbar, jedoch ohne offizielle Unterstützung!',
      languageIt:
        'È gratis. Supportiamo Windows 10 x64 bit, Windows 11 e versioni successive. ExLoader è disponibile anche per Windows 7 e Windows 8.1 x64 bit, ma senza supporto ufficiale!',
      languageTr: "Ücretsizdir. X64-bit Windows 10, Windows 11 ve üstünü destekliyoruz. ExLoader x64-bit Windows 7 ve Windows 8.1'de de kullanılabilir, ancak resmi destek yoktur!",
      languageEs: 'Es gratis. Soportamos x64-bit Windows 10, Windows 11 y superiores. ExLoader también está disponible en Windows 7 y Windows 8.1 de x64 bits, ¡pero sin soporte oficial!',
      languageCn: '它是免费的。我们支持 x64 位 Windows 10、Windows 11 及更高版本。ExLoader 也可用于 x64 位 Windows 7 和 Windows 8.1，但没有官方支持',
    },
  },
  {
    name: 'SupportedGames', value: {
      languageEn: 'Supported games',
      languageRu: 'Поддерживаемые игры',
      languageUa: 'Підтримувані ігри',
      languagePl: 'Obsługiwane gry',
      languageDe: "Unterstützte Spiele",
      languageIt: 'Giochi supportati',
      languageTr: 'Desteklenen oyunlar',
      languageEs: 'Juegos compatibles',
      languageCn: '支持的游戏',
    },
  },
  {
    name: 'Company', value: {
      languageEn: 'Company',
      languageRu: 'Компания',
      languageUa: 'Компанія',
      languagePl: 'Firma',
      languageDe: "Das Unternehmen",
      languageIt: 'Azienda',
      languageTr: 'Şirket',
      languageEs: 'Empresa',
      languageCn: '公司名称',
    },
  },
  {
    name: 'CopyrightTranslation', value: {
      languageEn:
        "2018-2024 © ExLoader. All rights reserved. Designed and developed by ",
      languageRu:
        '2018-2024 © ExLoader. Все права защищены. Спроектировано и разработано студией ',
      languageUa:
        '2018-2024 © ExLoader. Всі права захищені. Спроектовано та розроблено студією ',
      languagePl:
        '2018-2024 © ExLoader. Wszystkie prawa zastrzeżone. Zaprojektowane i opracowane przez ',
      languageDe:
        '2018-2024 © ExLoader. Alle Rechte vorbehalten. Entworfen und vom Studio entwickelt ',
      languageIt:
        '2018-2024 © ExLoader. Tutti i diritti riservati. Progettato e sviluppato da ',
      languageTr: '2018-2024 © ExLoader. Tüm hakları saklıdır. Stüdyo tarafından tasarlanmış ve geliştirilmiştir ',
      languageEs: '2018-2024 © ExLoader. Todos los derechos reservados. Diseñado y desarrollado por el estudio ',
      languageCn: '2018-2024 © ExLoader。保留所有权利。由工作室设计和开发 ',
    },
  },
  {
    name: "Mods", value: {
      languageEn: 'Mods:',
      languageRu: 'Модов:',
      languageUa: 'Модів:',
      languagePl: 'Mods:',
      languageDe: "Mods:",
      languageIt: 'Mods',
      languageTr: 'Mods:',
      languageEs: 'Mods:',
      languageCn: 'Mods:',
    },
  },
  {
    name: 'Yes', value: {
      languageEn: 'Yes',
      languageRu: 'Да',
      languageUa: 'Так',
      languagePl: 'Tak',
      languageDe: "Ja",
      languageIt: 'Si',
      languageTr: 'Evet',
      languageEs: 'Sí',
      languageCn: '是',
    },

  },
  {
    name: 'No', value: {
      languageEn: 'No',
      languageRu: 'Нет',
      languageUa: 'Ні',
      languagePl: 'Nie',
      languageDe: "Nein",
      languageIt: 'No',
      languageTr: 'Hayır',
      languageEs: 'No',
      languageCn: '没有',
    },
  },
  {
    name: 'SwitchTo', value: {
      languageEn: 'Switch to English language?',
      languageRu: 'Переключиться на русский язык?',
      languageUa: 'Переключитися на Українську мову?',
      languagePl: 'Przejść na polski?',
      languageDe: "Zu Deutsch wechseln?",
      languageIt: 'Passa alla lingua italiana?',
      languageTr: "Türkçe'ye geçmek mi?",
      languageEs: '¿Pasarse al Español?',
      languageCn: '改用土耳其语?',
    },
  },
  {
    name: 'TelegramSupport', value: {
      languageEn: 'Telegram support',
      languageRu: 'Поддержка Telegram',
      languageUa: 'Підтримка Telegram',
      languagePl: 'Wsparcie dla Telegramu',
      languageDe: "Telegramm-Unterstützung",
      languageIt: 'Supporto Telegram',
      languageTr: 'Telegram desteği',
      languageEs: 'Soporte En Telegram',
      languageCn: 'Telegram 支持',
    },
  },
  {
    name: 'DiscordSupport', value: {
      languageEn: 'Discord support',
      languageRu: 'Поддержка Discord',
      languageUa: 'Підтримка Discord',
      languagePl: 'Wsparcie na Discordzie',
      languageDe: "Discord-Unterstützung",
      languageIt: 'Supporto Discord',
      languageTr: 'Discord desteği',
      languageEs: 'Soporte En Discord',
      languageCn: '支持 Discord',
    },
  },
  {
    name: 'TelegramChannel', value: {
      languageEn: 'Our Telegram channel',
      languageRu: 'Наш Telegram канал',
      languageUa: 'Наш Telegram канал',
      languagePl: 'Nasz kanał Telegram',
      languageDe: "Unser Telegramm-Kanal",
      languageIt: 'Il nostro canale Telegram',
      languageTr: 'Telegram kanalımız',
      languageEs: 'Nuestro canal de Telegram',
      languageCn: '我们的 Telegram 频道',
    },
  },
  {
    name: 'DiscordChannel', value: {
      languageEn: 'Our Discord channel',
      languageRu: 'Наш Discord канал',
      languageUa: 'Наш Discord канал',
      languagePl: 'Nasz kanał Discord',
      languageDe: "Unser Discord-Kanal",
      languageIt: 'Il nostro canale Discord',
      languageTr: 'Discord kanalımız',
      languageEs: 'Nuestro canal de Discord',
      languageCn: '我们的 Discord 频道',
    },
  },
  {
    name: 'ForDevelopersTranslation', value: {
      languageEn: 'Developers',
      languageRu: 'Разработчикам',
      languageUa: 'Розробникам',
      languagePl: 'Deweloperów',
      languageDe: "Entwickler",
      languageIt: 'Sviluppatori',
      languageTr: 'Geliştiriciler',
      languageEs: 'Desarrolladores',
      languageCn: '开发人员',
    },
  },
  {
    name: 'AddToLibrary', value: {
      languageEn: "Adding your modification to our library",
      languageRu: 'Добавление вашей модификации в нашу библиотеку',
      languageUa: 'Додавання вашої модифікації до нашої бібліотеки',
      languagePl: 'Dodaj swoją modyfikacje do naszej biblioteki',
      languageDe: 'Hinzufügen Ihrer Änderung zu unserer Bibliothek',
      languageIt: 'Aggiunta della tua modifica nella nostra libreria',
      languageTr: 'Değişikliğinizi kütüphanemize ekleme',
      languageEs: 'Añada su modificación a nuestra biblioteca',
      languageCn: '将您的修改添加到我们的资料库',
    },
  },
  {
    name: 'CheatsFor', value: {
      languageEn: "Cheats and hacks for",
      languageRu: 'Читы для',
      languageUa: 'Чити для',
      languagePl: 'Cheaty lub hacki dla',
      languageDe: 'Cheats oder hacks für',
      languageIt: 'Cheats o hacks per',
      languageTr: 'Için hileler ve hackler',
      languageEs: 'Trampas o hacks para',
      languageCn: '外挂 | 辅助 对于',
    },
  },
  {
    name: 'For', value: {
      languageEn: "for",
      languageRu: 'для',
      languageUa: 'для',
      languagePl: 'dla',
      languageDe: 'für',
      languageIt: 'per',
      languageTr: 'için',
      languageEs: 'para',
      languageCn: '对于',
    },
  },
  {
    name: 'For2', value: {
      languageEn: "for",
      languageRu: 'на',
      languageUa: 'на',
      languagePl: 'dla',
      languageDe: 'für',
      languageIt: 'per',
      languageTr: 'için',
      languageEs: 'para',
      languageCn: '对于',
    },
  },
  {
    name: 'Cheat', value: {
      languageEn: "Cheat | Hack",
      languageRu: 'Чит',
      languageUa: 'Чит',
      languagePl: 'Cheat | Hack',
      languageDe: 'Cheat | Hack',
      languageIt: 'Cheat | Hack',
      languageTr: 'Hile',
      languageEs: 'Trampa | Hack',
      languageCn: '外挂 | 辅助',
    },
  },
  {
    name: 'SkinChangerTitle', value: {
      languageEn: "SkinChanger",
      languageRu: 'Скинченджер | SkinChanger',
      languageUa: 'Скінченджер | SkinChanger',
      languagePl: 'SkinChanger',
      languageDe: 'SkinChanger',
      languageIt: 'SkinChanger',
      languageTr: 'SkinChanger',
      languageEs: 'SkinChanger',
      languageCn: '皮肤修改器 | SkinChanger',
    },
  },
  {
    name: 'Wallhack', value: {
      languageEn: "WH | Wallhack",
      languageRu: 'ВХ | WH | Волхак',
      languageUa: 'ВХ | WH | Волхак',
      languagePl: 'WH | Wallhack',
      languageDe: 'WH | Wallhack',
      languageIt: 'WH | Wallhack',
      languageTr: 'WH | Wallhack',
      languageEs: 'WH | Wallhack',
      languageCn: 'WH | Wallhack',
    },
  },
  {
    name: 'Legit', value: {
      languageEn: "Legit cheat | hack",
      languageRu: 'Легит | Legit чит',
      languageUa: 'Легіт | Legit чит',
      languagePl: 'Legit cheat | hack',
      languageDe: 'Legit cheat | hack',
      languageIt: 'Legit cheat | hack',
      languageTr: 'Legit Hile',
      languageEs: 'Legit Trampa | hack',
      languageCn: 'Legit 外挂 | 辅助',
    },
  },
  {
    name: 'Rage', value: {
      languageEn: "Rage cheat | hack",
      languageRu: 'Рейдж | Rage чит',
      languageUa: 'Рейдж | Rage чит',
      languagePl: 'Rage cheat | hack',
      languageDe: 'Rage cheat | hack',
      languageIt: 'Rage cheat | hack',
      languageTr: 'Rage Hile',
      languageEs: 'Rage Trampa | hack',
      languageCn: 'Rage 外挂 | 辅助',
    },
  },
  {
    name: 'Movement', value: {
      languageEn: "Movement cheat | hack",
      languageRu: 'Мувмент | Movement чит',
      languageUa: 'Мувмент | Movement чит',
      languagePl: 'Movement cheat | hack',
      languageDe: 'Movement cheat | hack',
      languageIt: 'Movement cheat | hack',
      languageTr: 'Movement Hile',
      languageEs: 'Movement Trampa | hack',
      languageCn: 'Movement 外挂 | 辅助',
    },
  },
  {
    name: 'Aim', value: {
      languageEn: "Aim | Trigger",
      languageRu: 'Аим | Aim | Триггер | Trigger',
      languageUa: 'Аім | Aim | Тріггер | Trigger',
      languagePl: 'Aim | Trigger',
      languageDe: 'Aim | Trigger',
      languageIt: 'Aim | Trigger',
      languageTr: 'Aim | Trigger',
      languageEs: 'Aim | Trigger',
      languageCn: 'Aim | Trigger',
    },
  },
  {
    name: 'ModMenu', value: {
      languageEn: "ModMenu",
      languageRu: 'Модменю | ModMenu',
      languageUa: 'Модменю | ModMenu',
      languagePl: 'ModMenu',
      languageDe: 'ModMenu',
      languageIt: 'ModMenu',
      languageTr: 'ModMenu',
      languageEs: 'ModMenu',
      languageCn: 'ModMenu',
    },
  },
  {
    name: 'Neuronet', value: {
      languageEn: "Cheat-Hack-Neuronet | Bot",
      languageRu: 'Чит-Нейросеть | Бот',
      languageUa: 'Чіт-Нейромережа | Бот',
      languagePl: 'Cheat-Hack-Neuronet | Bot',
      languageDe: 'Cheat-Hack-Neuronales Netzwerk | Bot',
      languageIt: 'Cheat-Hack-Neuronet | Bot',
      languageTr: 'Hile-Neuronet | Bot',
      languageEs: 'Trampa-Hack-Neuronet | Bot',
      languageCn: '外挂-辅助-Neuronet | Bot',
    },
  },
  {
    name: 'FarmBot', value: {
      languageEn: "Cheat-Hack farm-bot | Bot",
      languageRu: 'Чит фарм-бот | Бот',
      languageUa: 'Чіт фарм-бот | Бот',
      languagePl: 'Cheat-Hack farm-bot | Bot',
      languageDe: 'Cheat-Hack farm-bot | Bot',
      languageIt: 'Cheat-Hack farm-bot | Bot',
      languageTr: 'Hile farm-bot | Bot',
      languageEs: 'Trampa-Hack farm-bot | Bot',
      languageCn: '外挂-辅助-场机器人 | 机器人',
    },
  },
  {
    name: 'BunnyHop', value: {
      languageEn: "Bunnyhop | Bhop",
      languageRu: 'Баннихоп | Бхоп | Bunnyhop',
      languageUa: 'Банніхоп | Бхоп | Bunnyhop',
      languagePl: 'Bunnyhop | Bhop',
      languageDe: 'Bunnyhop | Bhop',
      languageIt: 'Bunnyhop | Bhop',
      languageTr: 'Bunnyhop | Bhop',
      languageEs: 'Bunnyhop | Bhop',
      languageCn: 'Bunnyhop | Bhop',
    },
  },
  {
    name: 'HvH', value: {
      languageEn: "HvH cheat | hack",
      languageRu: 'Хвх | hvh чит',
      languageUa: 'Хвх | hvh чіт',
      languagePl: 'HvH cheat | hack',
      languageDe: 'HvH cheat | hack',
      languageIt: 'HvH cheat | hack',
      languageTr: 'HvH hile',
      languageEs: 'HvH trampa | hack',
      languageCn: 'HvH 外挂 | 辅助',
    },
  },
  {
    name: 'Crack', value: {
      languageEn: "Crack cheat | hack",
      languageRu: 'Кряк | crack чит',
      languageUa: 'Кряк | crack чіт',
      languagePl: 'Crack cheat | hack',
      languageDe: 'Crack cheat | hack',
      languageIt: 'Crack cheat | hack',
      languageTr: 'Crack hile',
      languageEs: 'Crack trampa | hack',
      languageCn: 'Crack 外挂 | 辅助',
    },
  },
  {
    name: 'InvChanger', value: {
      languageEn: "InventoryChanger",
      languageRu: 'Интвентори чейнджер | InventoryChanger',
      languageUa: 'Інтвентарі чейнджер | InventoryChanger',
      languagePl: 'InventoryChanger',
      languageDe: 'InventoryChanger',
      languageIt: 'InventoryChanger',
      languageTr: 'InventoryChanger',
      languageEs: 'InventoryChanger',
      languageCn: '库存修改器 | InventoryChanger',
    },
  },
  {
    name: 'CanIGetBanned', value: {
      languageEn: "Can i be banned?",
      languageRu: 'Могу ли я получить бан?',
      languageUa: 'Чи можу я отримати бан?',
      languagePl: 'Czy mogę dostać bana?',
      languageDe: 'Kann ich ein Verbot erhalten?',
      languageIt: 'Posso essere bannato?',
      languageTr: 'Yasaklanabilir miyim?',
      languageEs: '¿Puedo obtener un baneo?',
      languageCn: '我能被禁言吗?',
    },
  },
  {
    name: 'CanIGetBannedDescription', value: {
      languageEn: "If the game for which you want to download cheats and hacks uses VAC anti-cheat system, then bans statistics for using each specific modifications for this game is available on the modification's card. If the game uses other anti-cheats (like ESEA, EAC, FaceIT, BattleEye, Vanguard, MRAC, etc.) our app will automatically inform you about all possible risks before launching a free cheat or hack!",
      languageRu: 'Если игра, для которой ты хочешь скачать читы имеет систему античита VAC, то статистика по банам за использование каждой конкретной модификации к этой игре доступна на карточке самой модификации. В случае использования игрой других античитов (наподобие ESEA, EAC, FaceIT, BattleEye, Vanguard, MRAC и т.д.) наше приложение автоматически уведомит тебя о всех возможных рисках перед запуском бесплатного чита!',
      languageUa: 'Якщо гра, для якої ти хочеш завантажити чити, має систему античита VAC, то статистика щодо банів за використання кожної конкретної модифікації до цієї гри доступна на картці самої модифікації. У разі використання грою інших античитів (на кшталт ESEA, EAC, FaceIT, BattleEye, Vanguard, MRAC тощо) наш застосунок автоматично повідомить тебе про всі можливі ризики перед запуском безкоштовного чіта!',
      languagePl: 'Jeżeli gra, dla której chcesz pobrać cheaty lub hacki posiada system anti-cheat VAC, statystyki dotyczące banów dla poszczególnych modyfikacji dla tej gry dostępne są na karcie danej modyfikacji. Jeżeli gra wykorzystuje inne antycheaty (takie jak ESEA, EAC, FaceIT, BattleEye, Vanguard, MRAC itp.) nasza aplikacja automatycznie powiadomi Cię o wszystkich możliwych zagrożeniach przed uruchomieniem darmowego cheata lub hacka!',
      languageDe: 'Wenn das Spiel, für das Sie Cheats oder hacks herunterladen möchten, über ein Anti-Cheat-System VAC verfügt, ist die Statistik der Verbote für die Verwendung jeder spezifischen Modifikation für dieses Spiel auf der Karte der Modifikation verfügbar. Wenn das Spiel andere Anti-Cheats (wie ESEA, EAC, FaceIT, BattleEye, Vanguard, MRAC, etc.) verwendet, wird unsere Anwendung Sie automatisch über alle möglichen Risiken informieren, bevor Sie einen kostenlosen Cheat oder hack ausführen!',
      languageIt: 'Se il gioco per il quale desideri scaricare i cheats o hacks utilizza il sistema anti-cheat VAC, le statistiche sui ban per l\'utilizzo di ciascuna modifica per questo gioco sono disponibili sulla scheda delle modifice. Se il gioco utilizza altri anti-cheat (come ESEA, EAC, FaceIT, BattleEye, Vanguard, MRAC, ecc.) la nostra app ti informerà automaticamente su tutti i possibili rischi prima di lanciare un cheat o hack gratuito!',
      languageTr: 'Hilelerini indirmek istediğiniz oyun bir VAC sistemine sahipse, bu oyun için her bir özel modifikasyonun kullanımının yasaklanmasına ilişkin istatistikler modifikasyonun kendi kartında mevcuttur. Oyun diğer anti-okuyucuları kullanıyorsa (ESEA, EAC, FaceIT, BattleEye, Vanguard, MRAC, vb. gibi), uygulamamız ücretsiz hileyi çalıştırmadan önce sizi tüm olası riskler hakkında otomatik olarak bilgilendirecektir!',
      languageEs: 'Si el juego para el que quieres descargar trampas o hacks tiene un sistema VAC, las estadísticas sobre el ban de uso de cada modificación específica para este juego están disponibles en la ficha de la propia modificación. Si el juego utiliza otros antilectores (como ESEA, EAC, FaceIT, BattleEye, Vanguard, MRAC, etc.), ¡nuestra aplicación te avisará automáticamente de todos los posibles riesgos antes de ejecutar el trampa o hack gratuito!',
      languageCn: '如果您要下载的游戏 外挂 | 辅助 采用VAC反作弊系统，那么在该游戏中使用每个特定修改的禁用统计信息可在修改本身的卡片上找到。如果游戏使用其他反读取器（如 ESEA、EAC、FaceIT、BattleEye、Vanguard、MRAC 等），在运行免费作弊器之前，我们的应用程序会自动通知您所有可能的风险！',
    },
  },
  {
    name: 'CanIInstallConfigs', value: {
      languageEn: "Can i install configs and LUAs and where do i put them?",
      languageRu: 'Как и куда установить конфиги с луа скриптами?',
      languageUa: 'Як і куди встановити конфіги з луа скриптами?',
      languagePl: 'Jak i gdzie zainstalować konfiguracje skryptu lua?',
      languageDe: 'Wie und wo installiere ich die Lua-Skriptkonfigurationen?',
      languageIt: 'Posso installare configurazioni e LUA e dove li metto?',
      languageTr: 'Lua betikleri ile konfigürasyonlar nasıl ve nereye kurulur?',
      languageEs: '¿Cómo y dónde instalar configs con scripts lua?',
      languageCn: '如何以及在何处使用 lua 脚本安装配置?',
    },
  },
  {
    name: 'CanIInstallConfigsDescription', value: {
      languageEn: "To install pre-made configs and lua scripts for modification, you can click on the gear button, which it is located near the modification's launch button. You can open the cheat or hack files folder with the same way! Both legit cfg and rage cfg are available in our library. If you want to play so that the Overwatch/Admin from spectators doesn't ban you (in those games where such system is present), use the legit config, and if you are fighting with another cheater, you can try using rage cfg, however remember that the tougher the config, the higher the chances of getting banned by the Overwatch system/Admin from spectator (in those games where such system is present).",
      languageRu: 'Для установки готовых конфигов и луа-скриптов к модификации, ты можешь нажать на кнопку-шестерёнку которая находится рядом с кнопкой запуска модификации. Открыть папку файлов чита можно тем-же способом! В нашей библиотеке доступны как legit cfg, так и rage cfg. Если ты хочешь играть так, чтобы тебя не забанил патруль/админ из наблюдателей (в тех играх, где он есть) - используй легит конфиг, а в случае хвх борьбы с другим читером, ты можешь попробовать загрузить rage кфг, однако помни, что чем жестче конфиг, тем выше шансы получить бан от системы Overwatch/Админа из наблюдателей (в тех играх, где он есть).',
      languageUa: 'Для встановлення готових конфігів і луа-скриптів до модифікації ти можеш натиснути на кнопку-шестірню, що розміщена поруч із кнопкою запуску модифікації. Відкрити папку файлів чита можна тим-же способом! У нашій бібліотеці доступні як legit cfg, так і rage cfg. Якщо ти хочеш грати так, щоб тебе не забанив патруль/адмін зі спостерігачів (у тих іграх, де він є) - використовуй легіт конфіг, а в разі хвх боротьби з іншим читером, ти можеш спробувати завантажити rage кфг, однак пам\'ятай, що чим жорсткіший конфіг, тим вищі шанси отримати бан від системи Overwatch/Адміна зі спостерігачів (у тих іграх, де він є).',
      languagePl: 'Aby zainstalować configi i skrypty lua dla danej modyfikacji, możesz kliknąć na przycisk koła zębatego obok przycisku modyfikacji. W ten sam sposób możesz otworzyć folder z plikami! Zarówno legit cfg jak i rage cfg są dostępne w naszej bibliotece. Jeśli chcesz grać bez otrzymania bana przez patrol/admin z Obserwatora (w grach, które ją posiadają). - użyj legit configu, a w przypadku walki xvh z innym cheaterem możesz spróbować załadować rage cfg, ale pamiętaj, że im bardziej restrykcyjny config, tym większe szanse na zbanowanie przez system Overwatch/Admin z Obserwatora (w grach, które ją posiadają).',
      languageDe: 'Um Configs und Lua-Skripte für die Modifikation zu installieren, können Sie auf den Zahnrad-Button neben dem Modifikations-Button klicken. Sie können den Dateiordner auf die gleiche Weise öffnen! Sowohl legit cfg als auch rage cfg sind in unserer Bibliothek verfügbar. Wenn du spielen willst, ohne von der Patrouille/admin vom Beobachter gebannt zu werden (in den Spielen, die es haben). - benutze die legit config, und im Falle eines xvh-Kampfes mit einem anderen Cheater kannst du versuchen, die rage cfg herunterzuladen, aber bedenke, dass die Chancen, vom Overwatch-System/Admin vom Beobachter (in den Spielen, die es haben) gebannt zu werden, umso höher sind, je strenger die config ist.',
      languageIt: "Per installare configurazioni predefinite e script lua per la modifica, è possibile fare clic sul pulsante dell'ingranaggio, che si trova vicino al pulsante di avvio della modifica. Allo stesso modo è possibile aprire la cartella dei file cheat o hack! Sia il legit cfg che il rage cfg sono disponibili nella nostra libreria. Se volete giocare in modo che Overwatch/Admin from spectators non vi banni (in quelle partite in cui è presente tale sistema), usate la configurazione legit, mentre se state combattendo con un altro cheater, potete provare a usare la rage cfg, ma ricordate che più dura è la configurazione, più alte sono le possibilità di essere bannati dal sistema di Overwatch/Admin from spectator (in quelle partite in cui è presente tale sistema).",
      languageTr: "Modifikasyon için önceden hazırlanmış yapılandırmaları ve lua komut dosyalarını yüklemek için, modifikasyonun başlat düğmesinin yanında bulunan dişli düğmesine tıklayabilirsiniz. Hile dosyaları klasörünü de aynı şekilde açabilirsiniz! Hem legit cfg hem de rage cfg kütüphanemizde mevcuttur. Overwatch/Seyircilerden gelen yöneticinin sizi yasaklamaması için oynamak istiyorsanız (böyle bir sistemin mevcut olduğu oyunlarda), yasal yapılandırmayı kullanın ve başka bir hileci ile savaşıyorsanız, öfke cfg'yi kullanmayı deneyebilirsiniz, ancak yapılandırma ne kadar zor olursa, Overwatch sistemi/Seyircilerden gelen yönetici tarafından yasaklanma şansının o kadar yüksek olduğunu unutmayın (böyle bir sistemin mevcut olduğu oyunlarda).",
      languageEs: 'Para instalar configuraciones pre-hechas y scripts lua para la modificación, puedes hacer click en el botón de la tuerca, que se encuentra cerca del botón de lanzamiento de la modificación. Puedes abrir la carpeta de archivos de trampas de la misma manera. Tanto legit cfg como rage cfg están disponibles en nuestra biblioteca. Si quieres jugar de manera que el Overwatch/Admin del espectador no te banee (en aquellos juegos donde tal sistema esté presente), usa el legit config, y si estás luchando con otro tramposo, puedes intentar usar el rage cfg, sin embargo recuerda que cuando menos disimulado sea la configuración, mayores serán las posibilidades de ser baneado por el sistema Overwatch/Admin del espectador (en aquellos juegos donde tal sistema esté presente).',
      languageCn: '要为修改安装预制配置和 lua 脚本，可以点击齿轮按钮，它位于修改的启动按钮附近。您也可以用同样的方法打开 mod 文件夹！合法 cfg 和愤怒 cfg 都可以在我们的资料库中找到。如果您想在游戏中不被守望先锋系统/管理员禁止（在存在此类系统的游戏中），请使用合法配置；如果您要与其他 MOD 玩家对战，可以尝试使用愤怒 cfg，但请记住，配置越强硬，被守望先锋系统/管理员禁止的几率就越高（在存在此类系统的游戏中）。',
    },
  },
  {
    name: 'HowToInstallExLoader', value: {
      languageEn: "How to install and use ExLoader?",
      languageRu: 'Как установить и использовать ExLoader?',
      languageUa: 'Як встановити і використовувати ExLoader?',
      languagePl: 'Jak zainstalować i używać ExLoader?',
      languageDe: 'Wie kann ich ExLoader installieren und verwenden?',
      languageIt: 'Come installare e utilizzare ExLoader?',
      languageTr: 'ExLoader nasıl kurulur ve kullanılır?',
      languageEs: '¿Cómo instalar y utilizar ExLoader?',
      languageCn: '如何安装和使用 ExLoader？',
    },
  },
  {
    name: 'HowToInstallExLoaderDescription', value: {
      languageEn: "To get started, download our official installer using the big button at the top of this page. Open the downloaded file, choose the path where ExLoader will be installed and click continue. After that, the installation process will begin, which usually takes from 10 to 20 seconds, depending on the speed of your internet connection. Upon completion of this process, you will be prompted to open the ExLoader, in which you need to log in using mail or your Google account, no passwords need to be entered! Once you do that, you can choose a game to which you want to launch a modification, and you'll be navigated into the cheats or hacks library for this game. Then you can choose which mod you like the most and click the launch button!",
      languageRu: 'Для начала скачай наш официальный установщик с помощью большой кнопки с верхней части данной страницы. Открой скачанный файл, выбери путь, по которому будет установлен ExLoader и нажми продолжить. После этого начнётся процесс установки, который обычно занимает от 10 до 20 секунд, в зависимости от скорости твоего интернета. По завершению данного процесса тебе будет предложено открыть ExLoader, в котором необходимо авторизоваться с помощью почты или же своего Google аккаунта, никаких паролей вводить не нужно! Как только ты это сделаешь, ты сможешь выбрать игру, к которой хочешь запустить модификацию, и попадёшь в библиотеку читов к данной игре. Дальше дело за малым - выбирай то, что понравится больше всего и жми на кнопку Запустить!',
      languageUa: 'Для початку скачай наш офіційний інсталятор за допомогою великої кнопки з верхньої частини цієї сторінки. Відкрий скачаний файл, вибери шлях, за яким буде встановлено ExLoader і натисни продовжити. Після цього почнеться процес встановлення, який зазвичай займає від 10 до 20 секунд, залежно від швидкості твого інтернету. По завершенню цього процесу тобі буде запропоновано відкрити ExLoader, в якому необхідно авторизуватися за допомогою пошти або ж свого Google-аккаунта, ніяких паролів вводити не потрібно! Щойно ти це зробиш, ти зможеш вибрати гру, до якої хочеш запустити модифікацію, і потрапиш у бібліотеку читів до цієї гри. Далі справа за малим - вибирай те, що сподобається найбільше і тисни на кнопку Запустити!',
      languagePl: 'Zacznij od pobrania naszego oficjalnego instalatora za pomocą dużego przycisku na górze tej strony. Otwórz pobrany plik, wybierz ścieżkę, gdzie ExLoader zostanie zainstalowany i kliknij kontynuuj. Rozpocznie się proces instalacji, który zazwyczaj trwa od 10 do 20 sekund w zależności od prędkości twojego internetu. Po zakończeniu procesu, zostaniesz zaprezentowany w ExLoader, gdzie będziesz musiał zalogować się za pomocą swojego e-maila lub konta Google, żadne hasła nie są wymagane! Gdy już to zrobisz, możesz wybrać grę, w której chcesz uruchomić mod i dostać się do biblioteki cheatów lub hacków dla tej gry. To tylko kwestia wybrania swoich ulubionych cheatów lub hacków i naciśnięcia przycisku Uruchom!',
      languageDe: 'Beginnen Sie mit dem Download unseres offiziellen Installationsprogramms, indem Sie die große Schaltfläche oben auf dieser Seite verwenden. Öffnen Sie die heruntergeladene Datei, wählen Sie den Pfad, in dem ExLoader installiert werden soll, und klicken Sie auf "Weiter". Dadurch wird der Installationsprozess gestartet, der normalerweise 10 bis 20 Sekunden dauert, je nach Ihrer Internetgeschwindigkeit. Wenn der Vorgang abgeschlossen ist, wird ExLoader angezeigt, bei dem Sie sich mit Ihrer E-Mail oder einem Google-Konto anmelden müssen (keine Passwörter erforderlich!). Wenn du das getan hast, kannst du das Spiel auswählen, in dem du die Mod ausführen möchtest, und auf die Bibliothek mit den Cheats oder hacks für dieses Spiel zugreifen. Es ist nur eine Frage der Auswahl Ihrer Lieblings-Cheats und drücken Sie die Schaltfläche Ausführen!',
      languageIt: 'Per iniziare, scarica il nostro programma ufficiale utilizzando il pulsante grande nella parte superiore di questa pagina. Apri il file scaricato, scegli il percorso in cui verrà installato ExLoader e fai clic su Continua. Successivamente inizierà il processo di installazione, che solitamente richiede dai 10 ai 20 secondi, a seconda della velocità della tua connessione Internet. Al termine di questo processo, ti verrà richiesto di aprire ExLoader, a cui dovrai accedere utilizzando la E-Mail o il tuo account Google, non è necessario inserire password! Una volta fatto ciò, puoi scegliere un gioco a cui desideri avviare una modifica e verrai indirizzato nella libreria dei cheat o hack per questo gioco. Quindi puoi scegliere quale mod ti piace di più e fare clic sul pulsante di avvio!',
      languageTr: "İlk olarak, bu sayfanın üst kısmındaki büyük düğmeyi kullanarak resmi yükleyicimizi indirin. İndirilen dosyayı açın, ExLoader'ın kurulacağı yolu seçin ve devam et'e tıklayın. Bu, internet hızınıza bağlı olarak genellikle 10 ila 20 saniye arasında süren yükleme işlemini başlatacaktır. Bu işlem tamamlandıktan sonra, ExLoader'ı açmanız istenecektir, burada e-postanızı veya Google hesabınızı kullanarak yetkilendirmeniz gerekecektir, şifre gerekmez! Bunu yaptıktan sonra, modifikasyonu çalıştırmak istediğiniz oyunu seçebilir ve bu oyun için hile kütüphanesine girebilirsiniz. Sonrasında tek yapmanız gereken en çok beğendiğinizi seçmek ve Çalıştır düğmesine tıklamak!",
      languageEs: 'En primer lugar, descargue nuestro instalador oficial utilizando el botón grande situado en la parte superior de esta página. Abre el archivo descargado, selecciona la ubicacion donde se instalará ExLoader y haz clic en continuar. Esto iniciará el proceso de instalación, que suele tardar entre 10 y 20 segundos, dependiendo de tu velocidad de Internet. Una vez finalizado este proceso, se te pedirá que abras ExLoader, donde tendrás que autorizarte utilizando tu correo electrónico o tu cuenta de Google, ¡no se necesitan contraseñas! Una vez hecho esto, puedes seleccionar el juego en el que deseas ejecutar la modificación, y entrar en la biblioteca de trampas o hacks para este juego. Después, sólo tienes que elegir el que más te guste y hacer click en el botón Ejecutar.',
      languageCn: '要开始安装，请使用本页顶部的大按钮下载我们的官方安装程序。打开下载的文件，选择安装 ExLoader 的路径，然后点击继续。之后，安装过程将开始，通常需要 10 到 20 秒，具体时间取决于你的网络连接速度。完成此过程后，系统会提示你打开 ExLoader，这时你需要使用邮件或谷歌账户登录，无需输入密码！登录后，你可以选择一款游戏来启动修改程序，然后就会进入这款游戏的修改程序库。然后你就可以选择你最喜欢的 MOD，点击启动按钮！',
    },
  },
  {
    name: 'AreThereViruses', value: {
      languageEn: "Are there any viruses in hacks/cheats from your loader?",
      languageRu: 'Есть ли вирусы в читах из вашего лоадера?',
      languageUa: 'Чи є віруси в читах із вашого лоадера?',
      languagePl: 'Czy w Hackah/Cheatach z twojego bochenka są jakieś wirusy?',
      languageDe: 'Sind in den Hacks/Cheats aus Ihrem Loafer irgendwelche Viren enthalten?',
      languageIt: 'Ci sono virus nei Cheats/Hacks del tuo loader?',
      languageTr: 'Yükleyicinizdeki hilelerde herhangi bir virüs var mı?',
      languageEs: '¿Hay algún virus en las Trampas/Hacks de su menu?',
      languageCn: '装载程序 外挂 | 辅助 中是否存在病毒？',
    },
  },
  {
    name: 'AreThereVirusesDescription', value: {
      languageEn: "On the page of each modification from our application, you can find information about whether it was checked for the virus threats absence by an independent representative. In addition, we try evaluating all modifications carefully before their adding to our library! So if you are looking for a virus-free cheat/hack, then you definitely can choose ExLoader.",
      languageRu: 'На странице каждой модификации из нашего приложения ты можешь найти информацию о том, проверялась ли она на отсутствие вирусных угроз независимым представителем. Кроме того, мы стараемся тщательно оценивать все модификации перед их добавлением в нашу библиотеку! Так что если ты ищешь чит без вирусов, то тебе однозначно к нам.',
      languageUa: 'На сторінці кожної модифікації з нашого додатка ти можеш знайти інформацію про те, чи перевірялася вона на відсутність вірусних загроз незалежним представником. Крім того, ми намагаємося ретельно оцінювати всі модифікації перед їх додаванням до нашої бібліотеки! Тож якщо ти шукаєш чит без вірусів, то тобі однозначно до нас.',
      languagePl: 'Na stronie każdej modyfikacji w naszej aplikacji można znaleźć informację, czy została ona sprawdzona pod kątem zagrożeń wirusowych przez niezależnego przedstawiciela. Dokładamy również wszelkich starań, aby dokładnie ocenić wszystkie modyfikacje przed dodaniem ich do naszej biblioteki! Jeśli więc szukasz cheatu/hacku wolnego od wirusów, to zdecydowanie trafiłeś do nas.',
      languageDe: 'Auf jeder Modifikationsseite in unserer App finden Sie Informationen darüber, ob sie von einem unabhängigen Vertreter auf virale Bedrohungen geprüft wurde. Wir tun außerdem unser Bestes, um alle Modifikationen gründlich zu bewerten, bevor wir sie in unsere Bibliothek aufnehmen! Wenn du also nach einem virenfreien Cheat/Hack suchst, bist du bei uns genau richtig.',
      languageIt: 'Nella pagina di ciascuna modifica della nostra applicazione è possibile trovare informazioni sull\'eventuale verifica dell\'assenza di minacce virus da parte di un rappresentante indipendente. Inoltre, proviamo a valutare attentamente tutte le modifiche prima di aggiungerle alla nostra libreria! Quindi, se stai cercando un cheat/hack privo di virus, puoi sicuramente scegliere ExLoader.',
      languageTr: 'Uygulamamızdaki her değişikliğin sayfasında, bağımsız bir temsilci tarafından virüs tehditlerine karşı kontrol edilip edilmediği hakkında bilgi bulabilirsiniz. Buna ek olarak, tüm değişiklikleri kütüphanemize eklemeden önce kapsamlı bir şekilde değerlendirmeye çalışıyoruz! Dolayısıyla, virüssüz bir hile arıyorsanız, kesinlikle bize gelebilirsiniz.',
      languageEs: 'En la página de cada modificación de nuestra aplicación puede encontrar información sobre si ha sido comprobada por un representante independiente en busca de amenazas de virus. Además, ¡intentamos evaluar a fondo todas las modificaciones antes de añadirlas a nuestra biblioteca! Por lo tanto, si está buscando una modificacion libre de virus, definitivamente eres bienvenido a elegir Exloader.',
      languageCn: '在我们应用程序的每个修改页面上，您都可以找到关于是否由独立代表检查过是否存在病毒威胁的信息。此外，在将所有修改添加到我们的程序库之前，我们会对其进行仔细评估！因此，如果你正在寻找一款无病毒的修改程序，那么你绝对可以选择 ExLoader。',
    },
  },
  {
    name: 'WhatIsExLoader', value: {
      languageEn: "What is ExLoader?",
      languageRu: 'Что такое ExLoader?',
      languageUa: 'Що таке ExLoader?',
      languagePl: 'Co to jest ExLoader?',
      languageDe: 'Was ist ExLoader?',
      languageIt: 'Cosa è ExLoader?',
      languageTr: 'ExLoader nedir?',
      languageEs: '¿Qué es ExLoader?',
      languageCn: '什么是 ExLoader？',
    },
  },
  {
    name: 'WhatIsExLoaderDescription', value: {
      languageEn: "It's an app with a huge collection of automatically updated modifications that you can launch for free, and without any risks of catching a virus or getting banned!",
      languageRu: 'Это приложение, представляющее собой совокупность огромного количества постоянно-обновляемых модификаций, которые ты можешь запустить совершенно бесплатно, а также без рисков подхватить вирус или же получить бан!',
      languageUa: 'Це програма, що являє собою сукупність величезної кількості постійно-оновлюваних модифікацій, які ти можеш запустити абсолютно безкоштовно, а також без ризиків підхопити вірус або ж отримати бан!',
      languagePl: 'To aplikacja będąca zbiorem ogromnej liczby stale aktualizowanych modyfikacji, które możesz uruchomić zupełnie za darmo i bez ryzyka złapania wirusa czy otrzymania bana!',
      languageDe: 'Diese Anwendung ist eine Sammlung von zahlreichen, ständig aktualisierten Modifikationen, die Sie völlig kostenlos und ohne das Risiko, sich einen Virus einzufangen oder gesperrt zu werden, ausführen können!',
      languageIt: 'È un\'app con un\'enorme raccolta di modifiche aggiornate automaticamente che puoi avviare gratuitamente e senza il rischio di contrarre virus o di essere bannato!',
      languageTr: 'Tamamen ücretsiz olarak ve virüs kapma veya yasaklanma riski olmadan çalıştırabileceğiniz, sürekli güncellenen çok sayıda değişikliğin bir toplamı olan bir uygulamadır!',
      languageEs: 'Se trata de una aplicación que reúne un gran número de modificaciones actualizadas constantemente y que puedes ejecutar de forma totalmente gratuita, ¡sin riesgos de tener virus o tener un baneo!',
      languageCn: '它是一个应用程序，汇集了大量不断更新的修改，您可以完全免费运行，而且没有感染病毒或被禁用的风险！',
    },
  },
  {
    name: 'WhichCheatsExist', value: {
      languageEn: "Which types of cheats or hacks exist for",
      languageRu: 'Какие бывают читы на',
      languageUa: 'Які бувають чіти на',
      languagePl: 'Jakie cheaty lub hacki są dostępne dla',
      languageDe: 'Welche Cheats oder hacks gibt es für',
      languageIt: 'Quali tipi di cheat o hack esistono',
      languageTr: 'Farklı hileler ne içindir',
      languageEs: '¿Para qué sirven las distintas trampas o hacks?',
      languageCn: '外挂 | 辅助 存在哪些类型',
    },
  },
  {
    name: 'WhichCheatsExistDescription', value: {
      languageEn: "Generally, there are three types of cheats and hacks for each game: \"External\", \"Internal\" and neural networks. No injector is required to launch an External cheat/hack, they are opened as a separate process and read game's memory to draw the so-called WH (ESP). Sometimes such mods can simulate keyboard buttons or mouse buttons pressing to handle such functions as aimbot, trigger, bunnyhop, grenades helper or movement recorder. In rare cases, external cheats and hacks can change process' memory, for example, to replace skins (the so-called skinchanger). Internal modifications are special DLL libraries that are injected into the game. Such cheats and hacks are characterized by smoother operation, the presence of extensive features, as well as the increased risk of getting banned if mod's developer did not protect his cheat/hack from the basic anti-cheat system. Neural networks are something else, they do not interact with the memory of the game, but only analyze the image from the monitor, in order to recognize opponents for aim or automatic shooting purposes, as well as, in rare cases, for an automatic movement on the map. Such applications require a non-weak PC, however, are incredibly safe to use. In the ExLoader library you can find a huge amount of both Internal and External modifications with all features like WH, Aimbot, SkinChanger, movement recorder, grenades helper, etc.",
      languageRu: 'Всего в мире игр существует три вида читов: "External", "Internal", а также нейросети. Для запуска External чита не требуется инжектор, они открываются отдельным от игры процессом и читают её память для отрисовки так называемого вх(есп). Иногда такие моды могут имитировать нажатие кнопок клавиатуры или же мышки для воссоздания функций аимбота, триггера, баннихопа, раскидки гранат или же повторения движений(мувмент). В редких случаях внешние читы могут изменять память процесса, например, для подмены скинов(так называемый скинчейнджер). Internal модификации внедряются в игру с помощью специальных DLL библиотек. Такие читы отличаются более плавной работой, наличием обширного функционала, а так-же повышенным риском на получение бана, если разработчик мода не позаботился о базовой защите от античита игры. А вот нейросети это уже кое-что другое, они никак не взаимодействуют с памятью игры, а всего-лишь анализирует картинку с монитора, дабы распознать противников для наводки или же автоматической стрельбы, а так-же, в редких случаях, для автоматического передвижения по карте. Такие приложения требует наличия неслабого пк, однако, невероятно безопасны для использования. В библиотеке ExLoader ты сможешь найти огромное количество как Internal, так и External модификаций с функционалом WH, Aimbot, SkinChanger, movement, grenade helper и т.д.',
      languageUa: 'Загалом у світі ігор існує три види читів: "External", "Internal", а також нейромережі. Для запуску External чіта не потрібен інжектор, вони відкриваються окремим від гри процесом і читають її пам\'ять для відтворення так званого вх (есп). Іноді такі моди можуть імітувати натискання кнопок клавіатури або ж мишки для відтворення функцій аімбота, тригера, банніхопа, розкидання гранат або ж повторення рухів (мувмент). У рідкісних випадках зовнішні чити можуть змінювати пам\'ять процесу, наприклад, для підміни скінів (так званий скінчейнджер). Internal модифікації впроваджуються в гру за допомогою спеціальних DLL бібліотек. Такі чити вирізняються більш плавною роботою, наявністю великого функціоналу, а також підвищеним ризиком на отримання бана, якщо розробник мода не подбав про базовий захист від античита гри. А ось нейромережі це вже дещо інше, вони ніяк не взаємодіють з пам\'яттю гри, а всього-лише аналізують картинку з монітора, щоб розпізнати супротивників для наведення або ж автоматичної стрільби, а також, у рідкісних випадках, для автоматичного пересування по карті. Такі додатки вимагають наявності неслабкого комп\'ютера, однак, неймовірно безпечні для використання. У бібліотеці ExLoader ти зможеш знайти величезну кількість як Internal, так і External модифікацій із функціоналом WH, Aimbot, SkinChanger, movement, grenade helper тощо.',
      languagePl: 'W świecie gry istnieją trzy rodzaje cheatów i hacków: "zewnętrzne", "wewnętrzne" oraz sieci neuronowe. Zewnętrzne cheaty nie wymagają injectora do uruchomienia; są otwierane przez oddzielny proces od gry i czytają pamięć gry w celu wyrenderowania tzw. wejścia (esp). W niektórych przypadkach, zewnętrzne mody mogą symulować naciskanie przycisków klawiatury lub myszy, aby odtworzyć funkcje ambot, spustu, bannychopu, zrzutu granatu lub powtarzania ruchu (muvement). W rzadkich przypadkach zewnętrzne cheaty mogą modyfikować pamięć procesu, np. dla zmieniacza skór. Wewnętrzne modyfikacje są implementowane w grze za pomocą specjalnych bibliotek DLL. Cheaty lub hacki te charakteryzują się płynniejszym działaniem, obecnością rozbudowanej funkcjonalności, a także większym ryzykiem zbanowania, jeśli deweloper nie zadbał o podstawową ochronę moddingu przed grą antycheat. Ale sieci neuronowe to coś innego, nie wchodzą w interakcję z grą pamięci, a jedynie analizuje obraz z monitora, aby rozpoznać wrogów do skupienia lub automatycznego strzelania, jak również, w rzadkich przypadkach, dla automatycznego ruchu na mapie. Aplikacje te wymagają bardzo kruchego PC, ale są niesamowicie bezpieczne w użyciu. W bibliotece ExLoader można znaleźć ogromną ilość modyfikacji zarówno Internal jak i External o funkcjonalności WH, Aimbot, SkinChanger, movement, grenade helper itp.',
      languageDe: 'Es gibt drei Arten von Cheats oder hacks in der Spielwelt: "Externe", "Interne" und neuronale Netze. Externe Cheats benötigen keinen Injektor, um ausgeführt zu werden; sie werden von einem vom Spiel getrennten Prozess geöffnet und lesen den Spielspeicher, um die so genannte Eingabe (esp) zu rendern. In einigen Fällen können externe Mods das Drücken von Tastatur- oder Maustasten simulieren, um die Funktionen eines Hinterhalts, eines Auslösers, eines Bannychops, einer Granatenentladung oder einer Bewegungswiederholung (Muvement) nachzubilden. In seltenen Fällen können externe Cheats oder hacks den Prozessspeicher modifizieren, z. B. für einen Skin-Wechsler. Interne Modifikationen werden im Spiel mit Hilfe spezieller DLL-Bibliotheken implementiert. Diese Cheats oder hacks zeichnen sich durch einen reibungsloseren Betrieb, das Vorhandensein umfangreicher Funktionen sowie ein größeres Risiko aus, gesperrt zu werden, wenn der Entwickler nicht für den grundlegenden Schutz des Moddings vor dem Anti-Cheat-Spiel gesorgt hat. Aber neuronale Netze ist etwas anderes, sie nicht mit dem Speicher Spiel zu interagieren, und analysiert nur das Bild aus dem Monitor zu erkennen, die Feinde zu konzentrieren oder automatische Schießen, sowie in seltenen Fällen, für die automatische Bewegung auf der Karte. Diese Anwendungen erfordern einen sehr empfindlichen PC, sind aber unglaublich sicher in der Anwendung. In der ExLoader-Bibliothek finden Sie eine riesige Anzahl von internen und externen Modifikationen mit WH-Funktionalität, Aimbot, SkinChanger, Bewegung, Granatenhilfe, etc.',
      languageIt: 'In generale, ci sono tre tipi di trucchi per ogni gioco: "Esterni", "Interni" e reti neurali. Non è necessario alcun injector per avviare cheat esterni, vengono aperti come processo separato e leggono la memoria del gioco per disegnare il cosiddetto WH (ESP). A volte tali mod possono simulare la pressione dei pulsanti della tastiera o del mouse per gestire funzioni come aimbot, trigger, bunnyhop, aiutante di granate o registratore di movimento. In rari casi, cheat esterni possono modificare la memoria del processo, ad esempio, per sostituire le skin (il cosiddetto skinchanger). Le modifiche interne sono librerie DLL speciali che vengono inserite nel gioco. Tali cheat o hack sono caratterizzati da un funzionamento più fluido, dalla presenza di funzionalità estese e da un maggiore rischio di essere bannati se lo sviluppatore della mod non ha protetto il suo cheat oder hack dal sistema anti-cheat di base. Un\'altra cosa sono le reti neurali, che non interagiscono con la memoria del gioco, ma si limitano ad analizzare l\'immagine proveniente dal monitor, per riconoscere gli avversari ai fini della mira o del colpo automatico, nonché, in rari casi, per un movimento automatico. sulla mappa. Tali applicazioni richiedono un PC non debole, tuttavia sono incredibilmente sicure da usare. Nella libreria ExLoader puoi trovare un\'enorme quantità di modifiche sia interne che esterne con tutte le funzionalità come WH, Aimbot, SkinChanger, registratore di movimento, aiutante con granate, ecc.',
      languageTr: 'Oyun dünyasında üç tür hile vardır: "Harici", "Dahili" ve sinir ağları. Harici hileleri çalıştırmak için bir enjektör gerekmez, oyundan ayrı bir işlemle açılırlar ve sözde girişi (esp) çizmek için belleğini okurlar. Bazen bu modlar, aimbot, tetik, bannihop, el bombası yayma veya hareketlerin tekrarı (muvement) işlevlerini yeniden oluşturmak için klavye veya fare düğmelerine basmayı simüle edebilir. Nadir durumlarda, harici hileler işlemin hafızasını değiştirebilir, örneğin derileri değiştirmek için (skinchanger olarak adlandırılır). Dahili modifikasyonlar, özel DLL kütüphaneleri yardımıyla oyunda uygulanır. Bu tür hileler, mod geliştiricisi anti-chit oyunundan temel korumaya dikkat etmediyse, daha düzgün çalışma, kapsamlı işlevselliğin varlığı ve ayrıca yasaklanma riskinin artması bakımından farklılık gösterir. Ancak sinir ağları başka bir şeydir, oyunun hafızasıyla etkileşime girmezler ve sadece hedefleme veya otomatik ateşleme için rakipleri belirlemek ve nadir durumlarda haritada otomatik hareket için monitördeki resmi analiz ederler. Bu tür uygulamalar güçlü bir bilgisayar gerektirir, ancak kullanımı son derece güvenlidir. ExLoader kütüphanesinde WH, Aimbot, SkinChanger, hareket, el bombası yardımcısı vb. ile çok sayıda Dahili ve Harici modifikasyon bulabilirsiniz.',
      languageEs: 'Existen tres tipos de trampas en el mundo de los juegos: "Externos", "Internos" y redes neuronales. Para ejecutar trampas externos no requieren un inyector, que se abren por un proceso separado del juego y leer su memoria para dibujar algo llamado WH (esp). En ocasiones, estos mods pueden simular la pulsación de los botones del teclado o del ratón para recrear las funciones de aimbot, trigger, bunnyhop, esparcimiento de granadas o repetición de movimientos (movement). En raras ocasiones, los cheats externos pueden modificar la memoria del proceso, por ejemplo, para intercambiar skins (lo que vendria siendo skinchanger). Las modificaciones internas se implementan en el juego con la ayuda de librerías DLL especiales. Tales trampas difieren funcionamiento más suave, la presencia de una amplia funcionalidad, así como un mayor riesgo de obtener un ban, si el desarrollador mod no se hizo cargo de la protección básica de juego anti-chit. Pero las redes neuronales son otra cosa, que no interactúan con la memoria del juego, y sólo analiza la imagen del monitor para identificar a los oponentes para apuntar o disparo automático, así como, en casos raros, para el movimiento automático en el mapa. Estas aplicaciones requieren un PC potente, pero su uso es increíblemente seguro. En la librería de ExLoader puedes encontrar un gran número de modificaciones tanto Internas como Externas con WH, Aimbot, SkinChanger, movimiento, ayudante de granadas, etc.',
      languageCn: '一般来说，每个游戏都有三种 外挂 | 辅助： 外部作弊器、内部作弊器和神经网络。启动外部 外挂 | 辅助 不需要注入器，它们作为一个单独的进程打开，并读取游戏内存来绘制所谓的WH（ESP）。有时，这类修改器可以模拟键盘按键或鼠标按键，以处理诸如瞄准器、触发器、兔子跳、手榴弹助手或移动记录器等功能。在极少数情况下，外部 外挂 | 辅助 可以更改进程内存，例如更换皮肤（所谓的换肤器）。内部修改是注入游戏的特殊 DLL 库。这类{3}的特点是运行更流畅、功能更丰富，而且如果MOD开发者没有保护自己的 外挂 | 辅助 不受基本反作弊系统的影响，被封禁的风险也会增加。神经网络则另当别论，它们不与游戏内存互动，只分析显示器上的图像，以便识别对手进行瞄准或自动射击，在极少数情况下还能在地图上自动移动。此类程序要求电脑性能不弱，但使用却非常安全。在 ExLoader 库中，您可以找到大量内部和外部修改程序，这些程序具有 WH、Aimbot、皮肤修改器 | SkinChanger、移动记录器、手榴弹助手等所有功能。',
    },
  },
  {
    name: 'AndWhyTheyWereCreatedFor', value: {
      languageEn: "and what is their purpose",
      languageRu: 'и для чего они нужны',
      languageUa: 'і для чого вони потрібні',
      languagePl: 'i do czego służą',
      languageDe: 'und wofür sie gedacht sind',
      languageIt: 'e qual è il loro scopo',
      languageTr: 've ne için olduklarını',
      languageEs: 'y para qué sirven',
      languageCn: '以及它们的用途',
    },
  },
  {
    name: 'AndWhyTheyWereCreatedForDescriptionFirst', value: {
      languageEn: "Not all people are willing to spend dozens of hours of their lives to train the skill of playing a game. Except moreover, games like ",
      languageRu: 'Не все люди готовы тратить десятки часов своей жизни, чтобы натренировать навык игры в какую-то игру. Кроме того, игры наподобие ',
      languageUa: 'Не всі люди готові витрачати десятки годин свого життя, щоб натренувати навик гри в якусь гру. Крім того, ігри на зразок ',
      languagePl: 'Nie wszyscy ludzie są skłonni poświęcić dziesiątki godzin swojego życia, aby nauczyć się grać w jakąś grę. Poza tym w grach takich jak ',
      languageDe: 'Nicht alle Menschen sind bereit, Dutzende von Stunden ihres Lebens damit zu verbringen, zu lernen, wie man ein Spiel spielt. Außerdem wimmelt es bei Spielen wie ',
      languageIt: 'Non tutte le persone sono disposte a dedicare decine di ore della propria vita ad allenare l\'abilità di giocare. Tranne inoltre, giochi come ',
      languageTr: 'Tüm insanlar bir oyun oynama becerisini geliştirmek için hayatlarının onlarca saatini harcamaya istekli değildir. Ayrıca, aşağıdaki gibi oyunlar ',
      languageEs: 'No todas las personas están dispuestas a dedicar decenas de horas de su vida a entrenar la habilidad de jugar a algún juego. Además, juegos como ',
      languageCn: '并不是所有的人都愿意花上几十个小时来训练玩游戏的技能。此外，像',
    },
  },
  {
    name: 'AndWhyTheyWereCreatedForDescriptionSecond', value: {
      languageEn: " are simply crowded with a huge number of cheaters. Somebody wants to enjoy an ordinary evening game with a pack of crisps with Coca-Cola, somebody wants to increase his rank. In no case do we encourage anyone to download cheats, this is the choice of each of you. If you're tired and if you want to try something new, we can only provide you with a convenient tool for getting such an experience. Everything else is up to you!",
      languageRu: ' просто кишат огромным количеством читеров. Кто-то хочет насладиться обыкновенной вечерней каткой под пачку чипсов с кока-колой, кто-то хочет апнуть ранг. Мы ни в коем случае не призываем никого к тому, чтобы скачивать читы, это выбор каждого из вас. Если ты устал и хочешь разнообразия - мы лишь можем предоставить удобный инструмент для получения такого опыта. Всё остальное за тобой!',
      languageUa: ' просто кишать величезною кількістю читерів. Хтось хоче насолодитися звичайною вечірньою каткою під пачку чіпсів з кока-колою, хтось хоче апнути ранг. Ми в жодному разі не закликаємо нікого до того, щоб завантажувати чіти, це вибір кожного з вас. Якщо ти втомився і хочеш різноманітності - ми лише можемо надати зручний інструмент для отримання такого досвіду. Все інше за тобою!',
      languagePl: ' roi się od ogromnej liczby cheaterów. Ktoś chce umilić sobie zwykły wieczór jeżdżąc na łyżwach za paczkę chipsów z colą, ktoś chce podnieść swoją rangę. My w żaden sposób nie zachęcamy nikogo do pobierania cheatów lub hacków, to zależy od każdego z Was. Jeśli jesteście zmęczeni i chcecie urozmaicenia - możemy jedynie dostarczyć poręczne narzędzie do zdobycia tego doświadczenia. Reszta zależy od Was!',
      languageDe: ' von einer großen Anzahl von Betrügern. Jemand will einen gewöhnlichen Abend beim Schlittschuhlaufen für eine Packung Chips und eine Cola genießen, jemand will seinen Rang verbessern. Wir ermutigen niemanden dazu, Cheats herunterzuladen, das bleibt jedem selbst überlassen. Wenn du müde bist und etwas Abwechslung willst - wir können dir nur ein praktisches Werkzeug zur Verfügung stellen, um diese Erfahrung zu machen. Der Rest liegt bei dir!',
      languageIt: ' sono semplicemente affollati da un numero enorme di cheater. Qualcuno vuole godersi una normale partita serale con un pacchetto di patatine con Coca-Cola, qualcuno vuole salire di grado. In nessun caso incoraggiamo nessuno a scaricare cheat, questa è la scelta di ognuno di voi. Se sei stanco e vuoi provare qualcosa di nuovo, possiamo solo fornirti uno strumento conveniente per vivere un\'esperienza del genere. Tutto il resto dipende da te!',
      languageTr: ' hilekarlarla kaynıyor. Birisi bir paket cips ve koka-kola ile sıradan bir akşam pateninin tadını çıkarmak istiyor, birisi rütbesini yükseltmek istiyor. Hiçbir şekilde kimseyi hile indirmeye teşvik etmiyoruz, bu her birinizin seçimidir. Yorulduysanız ve çeşitlilik istiyorsanız - böyle bir deneyim elde etmek için yalnızca uygun bir araç sağlayabiliriz. Geri kalan her şey size kalmış!',
      languageEs: ' está plagado de tramposos. Alguien quiere disfrutar de una tarde de partida normal con un paquete de patatas fritas y coca-cola, alguien quiere subir de rango. De ninguna manera insistimos a alguien a descargar trampas, es la elección de cada uno de ustedes. Si usted está cansado y quiere variedad - sólo podemos proporcionar una herramienta conveniente para obtener tal experiencia. Todo lo demás depende de ti.',
      languageCn: ' 游戏中充斥着大量的骗子。有人想用一包薯片和可口可乐享受一个普通的晚间游戏，有人想提高自己的排名。我们绝不鼓励任何人下载 外挂 | 辅助，这是你们每个人的选择。如果你累了，如果你想尝试新事物，我们只能为你提供获得这种体验的便捷工具。其他一切都取决于您！',
    },
  },
  {
    name: 'IWantToDownloadCheats', value: {
      languageEn: "I want to download cheats or hacks, what do you have in your library?",
      languageRu: 'Я хочу скачать читы, что есть в вашей библиотеке?',
      languageUa: 'Я хочу завантажити чити, що у вас є в бібліотеці?',
      languagePl: 'Chcę ściągnąć cheaty lub hacki, co macie w swojej bibliotece?',
      languageDe: 'Ich möchte Cheats oder hacks herunterladen, was haben Sie in Ihrer Bibliothek?',
      languageIt: 'Voglio scaricare cheats o hacks, cosa hai nella tua libreria?',
      languageTr: 'Hileleri indirmek istiyorum, kütüphanenizde neler mevcut?',
      languageEs: 'Quiero descargar trampas o hacks, ¿qué hay disponible en su biblioteca?',
      languageCn: '我想下载 外挂 | 辅助，您的库中有什么？',
    },
  },
  {
    name: 'IWantToDownloadCheatsDescriptionFirst', value: {
      languageEn: "It all depends on the game and the cheat/hack developers! From time to time, such cheats and hacks appear in our library as",
      languageRu: 'Всё зависит от игры и разработчиков читов! Время от времени в нашей библиотеке появляются такие читы как',
      languageUa: 'Усе залежить від гри і розробників читів! Час від часу в нашій бібліотеці з\'являються такі чити як',
      languagePl: 'Wszystko zależy od gry i twórców cheatów lub hacków! Od czasu do czasu w naszej bibliotece pojawiają się cheaty/hacki typu',
      languageDe: 'Das hängt ganz vom Spiel und den Entwicklern der Cheats oder hacks ab! Von Zeit zu Zeit erscheinen Cheats/Hacks wie',
      languageIt: 'Tutto dipende dal gioco e dagli sviluppatori di cheat o hack! Di tanto in tanto, nella nostra libreria compaiono cheat/hack come',
      languageTr: 'Her şey oyuna ve hile geliştiricilerine bağlı! Kütüphanemiz zaman zaman aşağıdaki gibi hileler içerir',
      languageEs: 'Todo depende del juego y de los desarrolladores de las trampas. De vez en cuando nuestra biblioteca contiene trampas como',
      languageCn: '这完全取决于游戏和 外挂 | 辅助 开发者！ 有时，这样的 外挂 | 辅助 会出现在我们的库中：',
    },
  },
  {
    name: 'IWantToDownloadCheatsDescriptionSecond', value: {
      languageEn: ", etc. If the cheat or hack supports the latest version of the game, you can download it for free and there are no viruses in it - it will appear in our library!",
      languageRu: ', и т.д. Если чит поддерживает самое последнее обновление игры, его можно скачать бесплатно и в нём нет вирусов - он появится в нашей библиотеке!',
      languageUa: ', і т.д. Якщо чит підтримує найостанніше оновлення гри, його можна завантажити безкоштовно і в ньому немає вірусів - він з\'явиться в нашій бібліотеці!',
      languagePl: ' itp. Jeżeli cheat lub hack wspiera najnowszą aktualizację gry, można go pobrać za darmo i jest wolny od wirusów - pojawi się w naszej bibliotece!',
      languageDe: ', etc. in unserer Bibliothek. Wenn ein Cheat oder Hack das neueste Spiel-Update unterstützt, kostenlos heruntergeladen werden kann und virenfrei ist - wird er in unserer Bibliothek erscheinen!',
      languageIt: ', ecc. Se il cheat o hack supporta l\'ultima versione del gioco, puoi scaricarlo gratuitamente e non contiene virus: apparirà nella nostra libreria!',
      languageTr: ', vb. Hile en son oyun güncellemesini destekliyorsa, ücretsiz olarak indirilebilir ve virüs içermez - kütüphanemizde görünecektir!',
      languageEs: ', etc. Si la trampa o hack es compatible con la última actualización del juego, se puede descargar de forma gratuita y está libre de virus - ¡aparecerá en nuestra biblioteca!',
      languageCn: ', 等等。如果 外挂 | 辅助 支持最新版本的游戏，您就可以免费下载，而且不会有任何病毒--它会出现在我们的资料库中！',
    },
  },
  {
    name: 'OutdatedTranslation', value: {
      languageEn: "Modification is outdated",
      languageRu: 'Модификация устарела',
      languageUa: 'Модифікація застаріла',
      languagePl: 'Modyfikacja jest przestarzała',
      languageDe: 'Die Modifikation ist veraltet',
      languageIt: 'La modifica è obsoleta',
      languageTr: 'Değişiklik geçerliliğini yitirmiştir',
      languageEs: 'La modificación es obsoleta',
      languageCn: '修改已过时',
    },
  },
  {
    name: 'WhatToDoIfModIsNotLaunched', value: {
      languageEn: 'What do i do if cheat or hack does not launch of crashes?',
      languageRu: 'Что делать если чит не запускается?',
      languageUa: 'Що робити якщо чит не запускається?',
      languagePl: 'Co mam zrobić, jeśli cheat lub hack nie chce odpalić?',
      languageDe: 'Was soll ich tun, wenn der Cheat oder hack nicht anspringt?',
      languageIt: 'Cosa devo fare se il cheat o hack non si avvia o si blocca?',
      languageTr: 'Hile çalışmazsa ne yapmalı?',
      languageEs: '¿Qué hacer si la trampa o hack no se activa o no funciona?',
      languageCn: '如果 外挂 | 辅助 无法启动或崩溃，我该怎么办？',
    },
  },
  {
    name: 'WhatToDoIfModIsNotLaunchedDescription', value: {
      languageEn: 'ExLoader has a built-in utility that analyzes your system and shows various troubleshooting tips that are related to modification\'s launch process or crashes. You can open this utility using the gear button that is located near the cheat\'s launch button.',
      languageRu: 'В ExLoader имеется встроенная утилита, анализирующая твою систему и показывающая различные советы по устранению проблем, связанных с запуском или вылетами модификации. Открыть эту утилиту можно с помощью кнопки-шестерёнки, находящейся рядом с кнопкой запуска чита.',
      languageUa: 'У ExLoader є вбудована утиліта, яка аналізує твою систему і показує різні поради щодо усунення проблем, пов\'язаних із запуском або вильотами модифікації. Відкрити цю утиліту можна за допомогою кнопки-шестірньої шестірні, що знаходиться поруч з кнопкою запуску чита.',
      languagePl: 'ExLoader posiada wbudowane narzędzie, które analizuje twój system i wyświetla różne wskazówki dotyczące naprawy problemów związanych z modyfikacją uruchamiania lub awariami. Narzędzie to można otworzyć za pomocą przycisku koła zębatego znajdującego się obok przycisku uruchamiania.',
      languageDe: 'ExLoader verfügt über ein integriertes Dienstprogramm, das Ihr System analysiert und verschiedene Tipps zur Behebung von Problemen im Zusammenhang mit Modifikationen beim Start oder Abstürzen anzeigt. Dieses Dienstprogramm kann über die Zahnradtaste neben der Starttaste geöffnet werden.',
      languageIt: 'ExLoader dispone di un\'utilità integrata che analizza il tuo sistema e mostra vari suggerimenti per la risoluzione dei problemi relativi al processo di avvio delle modifiche o agli arresti anomali. Puoi aprire questa utility utilizzando il pulsante a forma di ingranaggio che si trova vicino al pulsante di avvio del cheat.',
      languageTr: 'ExLoader, sisteminizi analiz eden ve modifikasyonun çalışması veya çökmesiyle ilgili sorunları çözmek için çeşitli ipuçları gösteren yerleşik bir yardımcı programa sahiptir. Bu yardımcı programı başlat düğmesinin yanındaki pinyon düğmesini kullanarak açabilirsiniz.',
      languageEs: 'ExLoader tiene una utilidad incorporada que analiza su sistema y muestra varios consejos para solucionar problemas relacionados con el funcionamiento o el crash de la modificación. Puede abrir esta utilidad utilizando el botón de piñón situado junto al botón de inicio.',
      languageCn: 'ExLoader 有一个内置实用程序，可以分析你的系统，并显示与修改启动过程或崩溃有关的各种故障排除提示。您可以使用 mod 启动按钮附近的齿轮按钮打开该实用程序。',
    },
  },
  {
    name: 'WhichButtonIsUsedForCheatMenuOpening', value: {
      languageEn: 'Which button opens cheat\'s or hack\'s menu?',
      languageRu: 'На какую кнопку открывается меню чита?',
      languageUa: 'На яку кнопку відкривається меню чита?',
      languagePl: 'Który przycisk otwiera menu cheata lub hacka?',
      languageDe: 'Welche Taste öffnet das Menü des Cheat oder Hack?',
      languageIt: 'Quale pulsante apre il menu dei cheat o hack?',
      languageTr: 'Hangi düğme okuma menüsünü açar?',
      languageEs: '¿Qué botón abre el menú de las trampas o hackas?',
      languageCn: '哪个按钮可以打开模式菜单？',
    },
  },
  {
    name: 'WhichButtonIsUsedForCheatMenuOpeningDescription', value: {
      languageEn: 'All information related to the modification menu opening key and additional actions that might be necessary to be done (if any) will be shown in the ExLoader itself. Just read what is written in the application and you will get answers to all your questions.',
      languageRu: 'Вся информация, связанная с клавишей открытия меню модификации и дополнительными действиями, которые необходимо выполнить (если таковые имеются) будет показана в самом ExLoader. Просто читай то, что написано в приложении и ты получишь ответы на все свои вопросы.',
      languageUa: 'Уся інформація, пов\'язана з клавішею відкриття меню модифікації та додатковими діями, які необхідно виконати (якщо такі є), буде показана в самому ExLoader. Просто читай те, що написано в додатку, і ти отримаєш відповіді на всі свої запитання.',
      languagePl: 'Wszystkie informacje związane z kluczem menu modyfikacji i dodatkowymi krokami, które trzeba wykonać (jeśli takie są), będą pokazane w samym ExLoader. Wystarczy przeczytać to, co jest napisane w dodatku, a wszystkie Twoje pytania znajdą odpowiedź.',
      languageDe: 'Alle Informationen bezüglich der Modifikationsmenütaste und der zusätzlichen Schritte, die durchgeführt werden müssen (falls vorhanden), werden im ExLoader selbst angezeigt. Lesen Sie einfach, was im Anhang steht, und alle Ihre Fragen werden beantwortet.',
      languageIt: 'Tutte le informazioni relative ai tasti di apertura del menu di modifica e alle azioni aggiuntive che potrebbe essere necessario eseguire (se presenti) verranno visualizzate nell\'ExLoader stesso. Ti basterà leggere quanto scritto nell\'applicazione e otterrai le risposte a tutte le tue domande.',
      languageTr: "Değişiklik menüsünü açacak tuşla ilgili tüm bilgiler ve gerçekleştirilecek ek eylemler (varsa) ExLoader'ın kendisinde gösterilecektir. Sadece uygulamada yazılanları okuyun ve tüm sorularınıza cevap alacaksınız.",
      languageEs: 'Toda la información relacionada con la tecla para abrir el menú de modificación y las acciones adicionales a realizar (si las hubiera) se mostrarán en el propio ExLoader. Sólo tienes que leer lo que está escrito en la aplicación y obtendrás respuesta a todas tus preguntas.',
      languageCn: '与打开修改菜单的按键和要执行的其他操作（如有）相关的所有信息都将显示在 ExLoader 本身中。只需阅读应用程序中的内容，您就能获得所有问题的答案。',
    },
  },
  {
    name: 'WhereToDownloadInjector', value: {
      languageEn: 'Where can i get an injector to launch this cheat or hack?',
      languageRu: 'Где взять инжектор для запуска чита?',
      languageUa: 'Де взяти інжектор для запуску чита?',
      languagePl: 'Gdzie mogę zdobyć wtryskiwacz, aby uruchomić ten cheat lub hack?',
      languageDe: 'Wo kann ich einen Injektor bekommen, um diesen Cheat oder hack oder Hack zu starten??',
      languageIt: 'Dove posso trovare un injector per lanciare questo cheat o hack?',
      languageTr: 'Okumayı çalıştırmak için enjektörü nereden bulabilirim?',
      languageEs: '¿Dónde conseguir un inyector para ejecutar la trampa o hacka?',
      languageCn: '我在哪里可以买到启动这种改装的喷射器？',
    },
  },
  {
    name: 'WhereToDownloadInjectorDescription', value: {
      languageEn: 'Many people use Ghost Injector, Extreme Injector, GHInjector, Vac-Bypass Injector, Kirin, etc. to launch common cheats and hacks with the .DLL extension, but in our case there is no need to download any additional software, ExLoader installs all modifications by itself, without any third-party software!',
      languageRu: 'Для запуска обычных читов, имеющих расширение .DLL, многие люди используют такие инжекторы, как Ghost Injector, Extreme Injector, GHInjector, Vac-Bypass Injector, Kirin и т.д, однако, в нашем случае никаких дополнительных программ качать не нужно, ExLoader запускает все модификации самостоятельно, без использования стороннего ПО!',
      languageUa: 'Для запуску звичайних читів, що мають розширення .DLL, багато людей використовують такі інжектори, як Ghost Injector, Extreme Injector, GHInjector, Vac-Bypass Injector, Kirin і т. д., однак, у нашому випадку ніяких додаткових програм качати не потрібно, ExLoader запускає всі модифікації самостійно, без використання стороннього ПЗ!',
      languagePl: 'Wiele osób używa Ghost Injector, Extreme Injector, GHInjector, Vac-Bypass Injector, Kirin itp. do uruchamiania popularnych cheatów lub hacków z rozszerzeniem .DLL, ale w naszym przypadku nie ma potrzeby pobierania żadnego dodatkowego oprogramowania, ExLoader uruchamia wszystkie modyfikacje samodzielnie, bez żadnego oprogramowania firm trzecich!',
      languageDe: 'Viele Leute benutzen Ghost Injector, Extreme Injector, GHInjector, Vac-Bypass Injector, Kirin, usw., um gängige Cheats oder hacks mit der .DLL-Erweiterung auszuführen, aber in unserem Fall gibt es keine Notwendigkeit, zusätzliche Software herunterzuladen, ExLoader führt alle Modifikationen von selbst aus, ohne jegliche Software von Dritten!',
      languageIt: 'Molte persone usano Ghost Injector, Extreme Injector, GHInjector, Vac-Bypass Injector, Kirin, ecc. per lanciare cheat o hack comuni con l\'estensione .DLL, ma nel nostro caso non è necessario scaricare alcun software aggiuntivo, ExLoader installa tutte le modifiche da solo , senza alcun software di terze parti!',
      languageTr: 'DLL uzantılı normal hileleri çalıştırmak için birçok kişi Ghost Injector, Extreme Injector, GHInjector, Vac-Bypass Injector, Kirin gibi enjektörleri kullanır, ancak bizim durumumuzda herhangi bir ek program indirmeye gerek yoktur, ExLoader üçüncü taraf yazılım kullanmadan tüm değişiklikleri kendi başına çalıştırır!',
      languageEs: 'Para ejecutar trampas normales con extensión .DLL, mucha gente utiliza inyectores como Ghost Injector, Extreme Injector, GHInjector, Vac-Bypass Injector, Kirin, etc., sin embargo, en nuestro caso no hay necesidad de descargar ningún programa adicional, ¡ExLoader ejecuta todas las modificaciones por sí mismo, sin utilizar software de terceros!',
      languageCn: '许多人使用 Ghost Injector、Extreme Injector、GHInjector、Vac-Bypass Injector、Kirin 等来启动以 .DLL 为扩展名的常用修改器，但在我们的情况下，无需下载任何其他软件，ExLoader 可自行安装所有修改器，无需任何第三方软件！',
    },
  },
  {
    name: 'total-reviews', value: {
      languageEn: 'Total marks amount',
      languageRu: 'Всего оценок',
      languageUa: 'Всього оцінок',
      languagePl: 'Suma ocen',
      languageDe: 'Gesamtnoten',
      languageIt: 'Importo totale dei voti',
      languageTr: 'Toplam puan',
      languageEs: 'Puntuación total',
      languageCn: '总分',
    },
  },
  {
    // Like 31st of January, 31 January 2024
    name: 'January', value: {
      languageEn: 'January',
      languageRu: 'Января',
      languageUa: 'Січня',
      languagePl: 'Stycznia',
      languageDe: "Januar",
      languageIt: 'Gennaio',
      languageTr: 'Ocak',
      languageEs: 'Enero',
      languageCn: '一月份',
    },
  },
  {
    name: 'February', value: {
      languageEn: 'February',
      languageRu: 'Февраля',
      languageUa: 'Лютого',
      languagePl: 'Lutego',
      languageDe: "Februar",
      languageIt: 'Febbraio',
      languageTr: 'Şubat',
      languageEs: 'Febrero',
      languageCn: '二月份',
    },
  },
  {
    name: 'March', value: {
      languageEn: 'March',
      languageRu: 'Марта',
      languageUa: 'Березня',
      languagePl: 'Marzca',
      languageDe: "März",
      languageIt: 'Martha',
      languageTr: 'Martha',
      languageEs: 'Marzo',
      languageCn: '玛莎',
    },
  },
  {
    name: 'April', value: {
      languageEn: 'April',
      languageRu: 'Апреля',
      languageUa: 'Квітня',
      languagePl: 'Kwietnia',
      languageDe: "April",
      languageIt: 'Aprile',
      languageTr: 'Nisan',
      languageEs: 'Abril',
      languageCn: '四月',
    },
  },
  {
    name: 'May', value: {
      languageEn: 'May',
      languageRu: 'Мая',
      languageUa: 'Травня',
      languagePl: 'Maja',
      languageDe: "Mai",
      languageIt: 'Maggio',
      languageTr: 'Maya',
      languageEs: 'Mayo',
      languageCn: '玛雅人',
    },
  },
  {
    name: 'June', value: {
      languageEn: 'June',
      languageRu: 'Июня',
      languageUa: 'Червня',
      languagePl: 'Czerwca',
      languageDe: "Juni",
      languageIt: 'Giugno',
      languageTr: 'Haziran',
      languageEs: 'Junio',
      languageCn: '六月',
    },
  },
  {
    name: 'July', value: {
      languageEn: 'July',
      languageRu: 'Июля',
      languageUa: 'Липня',
      languagePl: 'Lipca',
      languageDe: "Juli",
      languageIt: 'Luglio',
      languageTr: 'Temmuz',
      languageEs: 'Julio',
      languageCn: '七月',
    },
  },
  {
    name: 'August', value: {
      languageEn: 'August',
      languageRu: 'Августа',
      languageUa: 'Серпня',
      languagePl: 'Sierpnia',
      languageDe: "August",
      languageIt: 'Agosto',
      languageTr: 'Augusta',
      languageEs: 'Agosto',
      languageCn: '奥古斯塔',
    },
  },
  {
    name: 'September', value: {
      languageEn: 'September',
      languageRu: 'Сентября',
      languageUa: 'Вересня',
      languagePl: 'Września',
      languageDe: "September",
      languageIt: 'Settembre',
      languageTr: 'Eylül',
      languageEs: 'Septiembre',
      languageCn: '九月份',
    },
  },
  {
    name: 'October', value: {
      languageEn: 'October',
      languageRu: 'Октября',
      languageUa: 'Жовтня',
      languagePl: 'Października',
      languageDe: "Oktober",
      languageIt: 'Ottobre',
      languageTr: 'Ekim',
      languageEs: 'Octubre',
      languageCn: '十月份',
    },
  },
  {
    name: 'November', value: {
      languageEn: 'November',
      languageRu: 'Ноября',
      languageUa: 'Листопада',
      languagePl: 'Listopada',
      languageDe: "November",
      languageIt: 'Novembre',
      languageTr: 'Kasım',
      languageEs: 'Noviembre',
      languageCn: '十一月',
    },
  },
  {
    name: 'December', value: {
      languageEn: 'December',
      languageRu: 'Декабря',
      languageUa: 'Грудня',
      languagePl: 'Grudnia',
      languageDe: "Dezember",
      languageIt: 'Dicembre',
      languageTr: 'Aralık',
      languageEs: 'Diciembre',
      languageCn: '十二月',
    },
  },
  {
    name: 'LatestUpdate', value: {
      languageEn: 'Latest update date',
      languageRu: 'Последнее обновление',
      languageUa: 'Останнє оновлення',
      languagePl: 'Najnowsza data aktualizacji',
      languageDe: "Neuestes Update",
      languageIt: 'Data dell\'ultimo aggiornamento',
      languageTr: 'Son güncelleme',
      languageEs: 'Última actualización',
      languageCn: '最后更新',
    },
  },
  {
    name: 'AuthorTranslation', value: {
      languageEn: 'Author',
      languageRu: 'Автор',
      languageUa: 'Автор',
      languagePl: 'Autor',
      languageDe: "Autor",
      languageIt: 'Autore',
      languageTr: 'Yazar',
      languageEs: 'Autor',
      languageCn: '作者',
    },
  },
  {
    name: 'ReleaseDate', value: {
      languageEn: 'Release date',
      languageRu: 'Дата выхода',
      languageUa: 'Дата виходу',
      languagePl: 'Data wydania',
      languageDe: "Erscheinungsdatum",
      languageIt: 'Data di rilascio',
      languageTr: 'Çıkış tarihi',
      languageEs: 'Fecha de publicación',
      languageCn: '发布日期',
    },
  },
  {
    name: 'InstallsThird', value: {
      languageEn: 'Downloads',
      languageRu: 'Загрузок',
      languageUa: 'Завантажень',
      languagePl: 'Pobrań',
      languageDe: "Downloads",
      languageIt: 'Downloads',
      languageTr: 'İndirmeler',
      languageEs: 'Descargas',
      languageCn: '下载',
    },
  },
  {
    name: 'LaunchesThird', value: {
      languageEn: 'Launches',
      languageRu: 'Запусков',
      languageUa: 'Запусків',
      languagePl: 'Uruchomień',
      languageDe: "Starts",
      languageIt: 'Avvia',
      languageTr: 'Başlatıldı',
      languageEs: 'Ejecutar',
      languageCn: '启动',
    },
  },
  {
    name: 'MoreInfo', value: {
      languageEn: 'Other information',
      languageRu: 'Другая информация',
      languageUa: 'Інша інформація',
      languagePl: 'Inne informacje',
      languageDe: "Andere Informationen",
      languageIt: 'Altre informazioni',
      languageTr: 'Diğer bilgiler',
      languageEs: 'Información adicional',
      languageCn: '其他信息',
    },
  },
  {
    name: 'OnCard', value: {
      languageEn: 'On the mod card in the ExLoader app',
      languageRu: 'На карточке мода в приложении ExLoader',
      languageUa: 'На картці мода в додатку ExLoader',
      languagePl: 'Na karcie modów w aplikacji ExLoader',
      languageDe: "Auf der Mod-Karte in der ExLoader App",
      languageIt: 'Sulla scheda mod nell\'app ExLoader',
      languageTr: 'ExLoader uygulamasındaki mod kartında',
      languageEs: 'En la tarjeta mod de la aplicación ExLoader',
      languageCn: '在 ExLoader 应用程序的模式卡上',
    },
  },
  {
    name: 'Description', value: {
      languageEn: "Modification's description",
      languageRu: 'Описание модификации',
      languageUa: 'Опис модифікації',
      languagePl: 'Opis modyfikacji',
      languageDe: "Beschreibung der Modifikation",
      languageIt: 'Descrizione della modifica',
      languageTr: 'Değişikliğin açıklaması',
      languageEs: 'Descripción de la modificación',
      languageCn: '修改说明',
    },
  },
  {
    name: 'Features', value: {
      languageEn: "Popular functions in modifications",
      languageRu: 'Популярные функции в модификациях',
      languageUa: 'Популярні функції в модифікаціях',
      languagePl: 'Popularne funkcje w modyfikacjach',
      languageDe: "Beliebte Funktionen in Modifikationen",
      languageIt: 'Funzioni popolari nelle modifiche',
      languageTr: 'Modifikasyonlardaki popüler özellikler',
      languageEs: 'Funciones populares en las modificaciones',
      languageCn: '修改中的热门功能',
    },
  },
  {
    name: 'WH', value: {
      languageEn: "Wallhack, ESP, WH - highlights enemies through walls",
      languageRu: 'Wallhack, ESP, ВХ - подсветка врагов через стены',
      languageUa: 'Wallhack, ESP, ВХ - підсвічування ворогів через стіни',
      languagePl: 'Wallhack, ESP, WH - oświetlanie wrogów przez ściany',
      languageDe: "Wallhack, ESP - Gegner durch Wände hindurch beleuchten",
      languageIt: 'Wallhack, ESP, WH - evidenzia i nemici attraverso i muri',
      languageTr: 'Wallhack, ESP, WH - düşmanları duvarların içinden vurgular',
      languageEs: 'Wallhack, ESP, WH - muestra a los enemigos a través de las paredes',
      languageCn: '穿墙攻击，ESP，WH - 突出显示穿墙的敌人',
    },
  },
  {
    name: 'Aimbot', value: {
      languageEn: "Aimbot - automatic positions your crosshair on enemies",
      languageRu: 'Aimbot, аим - авто наводка прицела на противников',
      languageUa: 'Аімбот - автоматичне націлювання на ворогів',
      languagePl: 'Aimbot - automatyczne celowanie we wrogów',
      languageDe: "Aimbot - automatisch zielender Gegner",
      languageIt: 'Aimbot - posiziona automaticamente il mirino sui nemici',
      languageTr: 'Aimbot, düşmanları otomatik hedefleme',
      languageEs: 'Aimbot, apunta de forma automatica al enemigo',
      languageCn: '瞄准器，自动瞄准敌人',
    },
  },
  {
    name: 'Trigger', value: {
      languageEn: "Triggerbot - auto shooting if crosshair is positioned on the enemy",
      languageRu: 'Triggerbot, триггер - авто выстрел при наведении',
      languageUa: 'Triggerbot, тригер - авто постріл при наведенні',
      languagePl: 'Triggerbot - automatyczny ogień po wycelowaniu',
      languageDe: "Triggerbot - automatischer Schuss beim Zeigen",
      languageIt: 'Triggerbot - colpo automatico se il mirino è posizionato sul nemico',
      languageTr: 'Triggerbot - nişangah düşmanın üzerindeyse otomatik atış.',
      languageEs: 'Triggerbot - dispara de forma automática si la mira esta sobre el enemigo',
      languageCn: '扳机机器人 - 如果十字准线位于敌人身上，则自动射击',
    },
  },
  {
    name: 'SkinChanger', value: {
      languageEn: "Skinchanger - changes your skins and models",
      languageRu: 'Skinchanger, скинчейджер - подмена скинов и моделек',
      languageUa: 'Skinchanger - заміна скінів та моделей',
      languagePl: 'Skinchanger - wymiana skórek i modeli',
      languageDe: "Skinchanger - Skin und Modelltausch",
      languageIt: 'Skinchanger: cambia skin e modelli',
      languageTr: 'Skinchanger - görünümlerinizi ve modellerinizi değiştirir',
      languageEs: 'Skinchanger - cambia tus skins y modelos',
      languageCn: '皮肤修改器 | skinchanger - 更改皮肤和模型',
    },
  },
  {
    name: 'Bhop', value: {
      languageEn: "Bhop, bunnyhop - jump and autostrafes helper",
      languageRu: 'Bhop, баннихоп - помощник в распрыжке и авто-стрейфах',
      languageUa: 'Bhop, банніхоп - помічник у розприжці та авто-стрейфах',
      languagePl: 'Bhop, bunnyhop - pomocnik przy skokach i autostopach',
      languageDe: "Bhop, bunnyhop - ein Helfer für Sprünge und Autostrifts",
      languageIt: 'Bhop, bunnyhop - aiutante di salto e accovacciamento automatico',
      languageTr: 'Bhop, bunnyhop - zıplama ve otostraf yardımcısı',
      languageEs: 'Bhop, bunnyhop - ayudante de salto y autostrafes',
      languageCn: 'Bhop、bunnyhop - 跳跃和自动扶梯助手',
    },
  },
  {
    name: 'InventoryChanger', value: {
      languageEn: "InventoryChanger - adds skins to your inventory",
      languageRu: 'InventoryChanger - добавление скинов в инвентарь',
      languageUa: 'InventoryChanger - додавання скінів в інвентар',
      languagePl: 'InventoryChanger - dodawanie skórek do ekwipunku',
      languageDe: "InventoryChanger - Hinzufügen von Häuten zu Ihrem Inventar",
      languageIt: 'InventoryChanger - aggiunge skin al tuo inventario',
      languageTr: 'InventoryChanger - envanterinize görünümler ekler',
      languageEs: 'InventoryChanger - añade skins a tu inventario',
      languageCn: 'InventoryChanger - 在库存中添加皮肤',
    },
  },
  {
    name: 'SpinBot', value: {
      languageEn: "Spinbot - anti-aims for rage hvh games",
      languageRu: 'Spinbot, крутилка - антиаимы для rage хвх игр',
      languageUa: 'Spinbot, крутилка - антиаїми для rage хвх ігор',
      languagePl: 'Spinbot - antyramy do gier rage xvh',
      languageDe: "Spinbot - Anti-Ziele für Wut xvh Spiele",
      languageIt: 'Spinbot - anti-mira per i giochi rage hvh',
      languageTr: 'Spinbot - öfke hvh oyunları için anti-amaçlar',
      languageEs: 'Spinbot - anti-aim para juegos rage hvh',
      languageCn: 'Spinbot - 愤怒的小鸟游戏的反要求',
    },
  },
  {
    // Like unknown person
    name: 'Unknown', value: {
      languageEn: "Unknown",
      languageRu: 'Неизвестен',
      languageUa: 'Невідомий',
      languagePl: 'Nieznana',
      languageDe: "Unbekannt",
      languageIt: 'Sconosciuto',
      languageTr: 'Bilinmiyor',
      languageEs: 'Desconocido',
      languageCn: '未知',
    },
  },
  {
    name: 'AdvertBlock', value: {
      languageEn: "This is a place for an ad :c",
      languageRu: 'Здесь должен быть рекламный блок :c',
      languageUa: 'Тут має бути рекламний блок :c',
      languagePl: 'Powinien tu być adblock :c',
      languageDe: "Hier sollte es einen Adblock geben :c",
      languageIt: 'Questo è un posto per un annuncio :c',
      languageTr: 'Burada bir adblock olmalı :c',
      languageEs: 'Debería haber un adblock aquí :c',
      languageCn: '这里应该有一个广告拦截器：c',
    },
  },
  {
    // Like "it's unknown what to do next"
    name: 'UnknownNoun', value: {
      languageEn: "Unknown",
      languageRu: 'Неизвестно',
      languageUa: 'Невідомо',
      languagePl: 'Nieznany',
      languageDe: "Unbekannt",
      languageIt: 'Sconosciuto',
      languageTr: 'Bilinmiyor',
      languageEs: 'Desconocido',
      languageCn: '未知',
    },
  },
  {
    name: 'CfgPath', value: {
      languageEn: "Configs installation path:",
      languageRu: 'Путь установки конфигов:',
      languageUa: 'Шлях встановлення конфігів',
      languagePl: 'Ścieżka instalacji konfiguracji:',
      languageDe: "Installationspfad der Konfiguration:",
      languageIt: 'Percorso di installazione per le Config:',
      languageTr: 'Kurulum yolunu yapılandırır:',
      languageEs: 'Configura la ubicacion de instalación:',
      languageCn: '配置安装路径:',
    },
  },
  {
    name: 'GameFolder', value: {
      languageEn: "Game folder",
      languageRu: 'Папка с игрой',
      languageUa: 'Папка з грою',
      languagePl: 'Folder z grą',
      languageDe: "Spiel-Ordner",
      languageIt: 'Cartella del gioco',
      languageTr: 'Oyun klasörü',
      languageEs: 'Carpeta de juegos',
      languageCn: '游戏文件夹',
    },
  },
  {
    name: 'NoDescription', value: {
      languageEn: "Modification without description!",
      languageRu: 'Модификация без описания!',
      languageUa: 'Модифікація без опису!',
      languagePl: 'Modyfikacja bez opisu!',
      languageDe: "Modifikation ohne Beschreibung!",
      languageIt: 'Modifica senza descrizione!',
      languageTr: 'Açıklama yapılmadan değişiklik!',
      languageEs: '¡Modificación sin descripción!',
      languageCn: '无说明的修改',
    },
  },
  {
    name: 'PopularReviews', value: {
      languageEn: "Popular reviews",
      languageRu: 'Популярные комментарии',
      languageUa: 'Популярні коментарі',
      languagePl: 'Popularne komentarze',
      languageDe: "Beliebte kommentare",
      languageIt: 'Recensioni popolari',
      languageTr: 'Popüler yorumlar',
      languageEs: 'Comentarios populares',
      languageCn: '热门评论',
    },
  },
  {
    name: 'YourReview', value: {
      languageEn: "You can leave a comment for this modification in the ExLoader app!",
      languageRu: 'Ты можешь оставить свой комментарий к этой модификации в приложении ExLoader!',
      languageUa: 'Ти можеш залишити свій коментар до цієї модифікації в додатку ExLoader!',
      languagePl: 'Możesz zostawić komentarz do tej modyfikacji w aplikacji ExLoader!',
      languageDe: "Sie können einen Kommentar zu dieser Modifikation in der ExLoader-App hinterlassen!",
      languageIt: 'Puoi lasciare un commento per questa modifica nell\'app ExLoader!',
      languageTr: 'ExLoader uygulamasında bu değişiklik hakkında bir yorum bırakabilirsiniz!',
      languageEs: 'Puedes dejar un comentario sobre esta modificación en la aplicación ExLoader.',
      languageCn: '您可以在 ExLoader 应用程序中对此修改发表评论！',
    },
  },
  {
    name: 'TranslationInTheApp', value: {
      languageEn: "A translation of the comments is available in the app!",
      languageRu: 'Перевод комментариев доступен в приложении!',
      languageUa: 'Переклад коментарів доступний у додатку!',
      languagePl: 'Tłumaczenie komentarzy jest dostępne w aplikacji!',
      languageDe: "Eine Übersetzung der Kommentare ist in der App verfügbar!",
      languageIt: 'Una traduzione dei commenti è disponibile nell\'app!',
      languageTr: 'Yorumların çevirisi uygulamada mevcuttur!',
      languageEs: 'La traducción de los comentarios está disponible en la aplicación!',
      languageCn: '应用程序中提供评论的翻译!',
    },
  },
  {
    name: 'NoSuchPage', value: {
      languageEn: "It looks like this page doesn't exist! Perhaps it has already been deleted or simply hasn't been created yet.",
      languageRu: 'Похоже, что такой страницы не существует! Возможно её уже удалили или попросту ещё не создали.',
      languageUa: 'Схоже, що такої сторінки не існує! Можливо її вже видалили або просто ще не створили.',
      languagePl: 'Wygląda na to, że ta strona nie istnieje! Być może została już usunięta lub po prostu nie została jeszcze utworzona.',
      languageDe: "Es sieht so aus, als gäbe es diese Seite nicht! Vielleicht wurde sie bereits gelöscht oder wurde einfach noch nicht erstellt.",
      languageIt: 'Sembra che questa pagina non esista! Forse è già stato cancellato o semplicemente non è stato ancora creato.',
      languageTr: 'Görünüşe göre bu sayfa mevcut değil! Silinmiş veya henüz oluşturulmamış olabilir.',
      languageEs: 'Parece que esta página no existe. Puede que se haya borrado o que simplemente no se haya creado todavía.',
      languageCn: '该页面似乎不存在！可能已被删除，或者根本就没有创建.',
    },
  },
  {
    name: 'BackToMain', value: {
      languageEn: "Back to the main page",
      languageRu: 'На главную',
      languageUa: 'На головну',
      languagePl: 'Strona główna',
      languageDe: "Hauptseite",
      languageIt: 'Torna alla pagina principale',
      languageTr: 'Ana sayfaya geri dön',
      languageEs: 'Volver a la página principal',
      languageCn: '返回主页',
    },
  },
  {
    name: 'WorkingTranslation', value: {
      languageEn: "Working & Up To Date",
      languageRu: 'Работает & Актуально',
      languageUa: 'Працює & Актуально',
      languagePl: 'Operacyjne i istotne',
      languageDe: "Operativ & Relevant",
      languageIt: 'Funzionante e aggiornato',
      languageTr: 'Operasyonel ve İlgili',
      languageEs: 'Trabajando y Actualizando',
      languageCn: '操作性和相关性',
    },
  },
  {
    name: 'HowToDownload', value: {
      languageEn: "How to download? All mods from our site can be launched using the ExLoader application, which is what you download from this site. After clicking the «Download» button, you need to choose the installer file saving path, wait for it to download, and then run the downloaded file. In the opened window select the application installation mode, wait for the installation to complete and open ExLoader. After that, you can choose the game you need with the mod you like and start playing!",
      languageRu: 'Как скачать? Все моды с нашего сайта можно запустить с помощью приложения ExLoader, именно его ты и скачиваешь с сайта. После нажатия на кнопку «Скачать» тебе необходимо выбрать путь сохранения файла установщика, дождаться его загрузки, а затем запустить скачанный файл. В открывшемся окне выбери режим установки приложения, дождись завершения установки и открой ExLoader. После этого ты сможешь выбрать нужную тебе игру с понравившимся модом и приступить к игре!',
      languageUa: 'Як завантажити? Всі моди з нашого сайту можна запустити за допомогою програми ExLoader, саме її ти і скачуєш з сайту. Після натискання на кнопку «Завантажити» тобі необхідно вибрати шлях збереження файлу установника, дочекатися його завантаження, а потім запустити завантажений файл. У вікні вибери режим установки програми, дочекайся завершення установки і відкрий ExLoader. Після цього ти зможеш вибрати потрібну тобі гру з вподобаним модом і приступити до гри!',
      languagePl: 'Jak pobrać? Wszystkie mody z naszej strony mogą być uruchamiane za pomocą aplikacji ExLoader, którą pobierasz ze strony. Po kliknięciu przycisku «Pobierz» należy wybrać ścieżkę do zapisania pliku instalatora, poczekać na jego pobranie, a następnie uruchomić pobrany plik. W otwartym oknie wybierz tryb instalacji aplikacji, poczekaj na zakończenie instalacji i otwórz ExLoader. Następnie możesz wybrać grę z ulubionym modem i zacząć grać!',
      languageDe: "Wie wird heruntergeladen? Alle Mods von unserer Website können mit der ExLoader-Anwendung ausgeführt werden, es ist die, die Sie von der Website herunterladen. Nachdem Sie auf die Schaltfläche «Download» geklickt haben, müssen Sie den Pfad zum Speichern der Installationsdatei auswählen, den Download abwarten und dann die heruntergeladene Datei ausführen. In dem sich öffnenden Fenster wählen Sie den Installationsmodus der Anwendung, warten, bis die Installation abgeschlossen ist, und öffnen ExLoader. Danach können Sie das gewünschte Spiel mit Ihrem Lieblingsmod auswählen und mit dem Spielen beginnen!",
      languageIt: 'Come scaricare? Tutte le mod del nostro sito possono essere avviate utilizzando l\'applicazione ExLoader, che è quella scaricabile da questo sito. Dopo aver fatto clic sul pulsante «Download», è necessario scegliere il percorso di salvataggio del file di installazione, attendere il download, quindi eseguire il file scaricato. Nella finestra aperta seleziona la modalità di installazione dell\'applicazione, attendi il completamento dell\'installazione e apri ExLoader. Successivamente, puoi scegliere il gioco che ti serve con la mod che ti piace e iniziare a giocare!',
      languageTr: "Nasıl indirilir? Sitemizdeki tüm modlar ExLoader uygulaması kullanılarak çalıştırılabilir, siteden indirdiğiniz uygulamadır. İndir düğmesine tıkladıktan sonra, yükleyici dosyasını kaydetmek için yolu seçmeniz, indirilmesini beklemeniz ve ardından indirilen dosyayı çalıştırmanız gerekir. Açılan pencerede uygulama kurulum modunu seçin, kurulumun tamamlanmasını bekleyin ve ExLoader'ı açın. Bundan sonra favori modunuzla istediğiniz oyunu seçebilir ve oynamaya başlayabilirsiniz!",
      languageEs: '¿Cómo descargar? Todos los mods de nuestro sitio pueden ejecutarse utilizando la aplicación ExLoader, que es la que se descarga del sitio. Después de hacer clic en el botón "Descargar", tienes que seleccionar la ubicacion para guardar el archivo de la instalación, esperar a que se descargue y, a continuación, ejecutar el archivo descargado. En la ventana que se abre, selecciona el modo de instalación de la aplicación, espera a que se complete la instalación y abre ExLoader. Después ya puedes seleccionar el juego que quieras con tu mod favorito y ¡empezar a jugar!',
      languageCn: '如何下载？您可以使用 ExLoader 应用程序运行我们网站上的所有修改器。点击 "下载 "按钮后，您需要选择保存安装文件的路径，等待下载，然后运行下载的文件。在打开的窗口中，选择应用程序的安装模式，等待安装完成并打开 ExLoader。之后，你就可以用自己喜欢的 MOD 选择想要的游戏并开始玩了！',
    }
  },
  {
    name: 'Since', value: {
      languageEn: "since",
      languageRu: 'с',
      languageUa: 'з',
      languagePl: 'od',
      languageDe: "dem",
      languageIt: 'Da',
      languageTr: 'beri',
      languageEs: 'desde',
      languageCn: '因为',
    },
  },
  {
    name: 'LaunchGuide', value: {
      languageEn: "Launch guide/advices",
      languageRu: 'Дополнения к запуску',
      languageUa: 'Доповнення до запуску',
      languagePl: 'Dodatki do uruchomienia',
      languageDe: "Ergänzungen zur Einführung",
      languageIt: 'Guida/consigli di avvio',
      languageTr: 'Lansman takviyeleri',
      languageEs: 'Guía/consejos de lanzamiento',
      languageCn: '推出补充剂',
    },
  },
  {
    name: 'LaunchGuideDefault', value: {
      languageEn: "1. Open the ExLoader\n2. Find this modification in it's library and open it's page\n3. Click Launch button!",
      languageRu: "1. Открой ExLoader\n2. Найди эту модификацию и перейди на её карточку\n3. Нажми на кнопку запустить!",
      languageUa: "1. відкрий ExLoader\n2. Знайди цю модифікацію і перейди на її картку\n3. Натисни на кнопку запустити!",
      languagePl: "1. otwórz ExLoader\n2. Znajdź tę modyfikację i przejdź do jej karty\n3. Kliknij przycisk uruchom!",
      languageDe: "1. öffnen Sie ExLoader\n2. Finden Sie diese Modifikation und gehen Sie zu ihrer Karte\n3. Klicken Sie auf die Schaltfläche Ausführen!",
      languageIt: '1. Apri ExLoader\n2. Trova questa modifica nella sua libreria e apri la sua pagina\n3. Fare clic sul pulsante Avvia!',
      languageTr: "1. ExLoader'ı açın\n2. Kütüphanesinde bu değişikliği bulun ve sayfasını açın\n3. Başlat düğmesine tıklayın!",
      languageEs: '1. Abra el ExLoader\n2. Busque esta modificación en su biblioteca y abra su página\n3. Pulsa el botón Ejecutar',
      languageCn: '1. 打开 ExLoader\n2. 在库中找到此修改并打开它的页面\n3. 点击启动按钮',
    },
  },
  {
    name: "Macros", value: {
      languageEn: "Macros",
      languageRu: 'Макрос | Macros',
      languageUa: 'Макрос | Macros',
      languagePl: 'Macros',
      languageDe: 'Macros',
      languageIt: 'Macros',
      languageTr: 'Macros',
      languageEs: 'Macros',
      languageCn: 'Macros',
    },
  },
  {
    name: "CSSVersion", value: {
      languageEn: "font_other.css",
      languageRu: 'font_other.css',
      languageUa: 'font_other.css',
      languagePl: 'font_other.css',
      languageDe: 'font_other.css',
      languageIt: 'font_other.css',
      languageTr: 'font_other.css',
      languageEs: 'font_other.css',
      languageCn: 'font_asia.css',
    },
  },
  {
    name: 'AdsOnWebsiteOrClient', value: {
      languageEn: 'Advertising enquiries',
      languageRu: 'По вопросам рекламы',
      languageUa: 'З питань реклами',
      languagePl: 'Zapytania dotyczące reklam',
      languageDe: 'Für Werbeanfragen',
      languageIt: 'Richieste pubblicitarie',
      languageTr: 'Reklam talepleri',
      languageEs: 'Consultas publicitarias',
      languageCn: '广告咨询',
    },
  },
  {
    name: 'PlaceAnAdDescription', value: {
      languageEn: 'Place an advert on our website, app or any of our other resources!',
      languageRu: 'Разместить рекламу у нас на сайте, в приложении или же на любом другом нашем ресурсе!',
      languageUa: 'Розмістити рекламу у нас на сайті, в додатку або ж на будь-якому іншому нашому ресурсі!',
      languagePl: 'Umieść reklamę na naszej stronie internetowej, w aplikacji lub innych naszych zasobach!',
      languageDe: 'Schalten Sie eine Anzeige auf unserer Website, App oder einer unserer anderen Ressourcen!',
      languageIt: 'Inserite un annuncio sul nostro sito web, sulla nostra app o su qualsiasi altra risorsa!',
      languageTr: 'Web sitemize, uygulamamıza veya diğer kaynaklarımızdan herhangi birine reklam verin!',
      languageEs: 'Publique un anuncio en nuestro sitio web, aplicación o cualquiera de nuestros otros recursos.',
      languageCn: '在我们的网站、应用程序或任何其他资源上发布广告!',
    },
  },
  {
    name: 'WhichBannersSizesYouSupport', value: {
      languageEn: "Which banners sizes do you support?",
      languageRu: 'Баннеры какого размера вы поддерживаете?',
      languageUa: 'Банери якого розміру ви підтримуєте?',
      languagePl: 'Jaki rozmiar banerów obsługujecie?',
      languageDe: 'Welche Größe von Bannern unterstützen Sie?',
      languageIt: 'Quali sono le dimensioni dei banner supportate?',
      languageTr: 'Hangi boyuttaki afişleri destekliyorsunuz?',
      languageEs: '¿Qué tamaños de banners admite??',
      languageCn: '你们支持多大尺寸的横幅?',
    },
  },
  {
    name: 'WhichBannersSizesYouSupportDescription', value: {
      languageEn: "If it's a website then 1000x1000px for a square banner and 1455x135px for a wide banner. In the app, the only size available is 1000x80px. (Width x Height)",
      languageRu: 'Если речь идёт о веб-сайте, то 1000x1000px для квадратного баннера и 1455x135px для широкого. В приложении единственный доступный размер это 1000x80px. (Ширина х Высота).',
      languageUa: 'Якщо йдеться про веб-сайт, то 1000x1000px для квадратного банера і 1455x135px для широкого. У застосунку єдиний доступний розмір це 1000x80px. (Ширина х Висота).',
      languagePl: 'Jeśli jest to strona internetowa, 1000x1000px dla kwadratowego banera i 1455x135px dla szerokiego banera. W aplikacji jedynym dostępnym rozmiarem jest 1000x80px. (Szerokość x Wysokość).',
      languageDe: 'Wenn es sich um eine Website handelt, 1000x1000px für ein quadratisches Banner und 1455x135px für ein breites Banner. In einer App ist die einzige verfügbare Größe 1000x80px. (Breite x Höhe).',
      languageIt: "Se si tratta di un sito web, 1000x1000px per un banner quadrato e 1455x135px per un banner largo. In un'app, l'unica dimensione disponibile è 1000x80px. (Larghezza x Altezza).",
      languageTr: 'Bir web sitesiyse, kare bir banner için 1000x1000px ve geniş bir banner için 1455x135px. Bir uygulamada, kullanılabilecek tek boyut 1000x80 pikseldir. (Genişlik x Yükseklik).',
      languageEs: 'Si se trata de un sitio web, 1000x1000px para un banner cuadrado y 1455x135px para un banner ancho. En una aplicación, el único tamaño disponible es 1000x80px. (Ancho x Alto).',
      languageCn: '如果是网站，方形横幅的尺寸为 1000x1000px，宽幅横幅的尺寸为 1455x135px。在应用程序中，唯一可用的尺寸是 1000x80px。(宽度 x 高度).',
    },
  },
  {
    name: 'BannersFormats', value: {
      languageEn: "Available banners formats, regions and pages",
      languageRu: 'Доступные форматы баннеров, регионов и страниц',
      languageUa: 'Доступні формати банерів, регіони та сторінки',
      languagePl: 'Dostępne formaty banerów, regiony i strony',
      languageDe: 'Verfügbare Bannerformate, Regionen und Seiten',
      languageIt: 'Formati disponibili per banner, regioni e pagine',
      languageTr: 'Afişler, bölgeler ve sayfalar için mevcut formatlar',
      languageEs: 'Formatos disponibles para banners, regiones y páginas',
      languageCn: '横幅、区域和页面的可用格式',
    },
  },
  {
    name: 'BannersFormatsDescription', value: {
      languageEn: "You can place both .png and .gif banners. If you decide to place your advert on the site, you can choose the language subdomain where your banner will be placed. For a client, you can choose any specific countries where your advert will be shown! Ads on the website are placed only on the pages of specified games and mods for that games, but in the client you can place a banner that will be shown on all app's screens, or on any game page you want!",
      languageRu: 'Вы можете разместить как .png, так и .gif баннеры. При размещении рекламы на сайте вы можете выбрать языковой поддомен, на котором будет размещён ваш баннер. Для клиента можно выбирать любые конкретные страны, в которых будет показана ваша реклама! Реклама на сайте размещается только на страницах конкретно-указанных игр и модов к ним, но в клиенте можно разместить баннер на страницах всего приложения, либо же, на странице нужной вам игры!',
      languageUa: 'Ви можете розміщувати банери у форматі .png та .gif. Якщо ви вирішили розмістити свою рекламу на сайті, ви можете вибрати мовний піддомен, на якому буде розміщено ваш банер. Для клієнта ви можете вибрати будь-які конкретні країни, де буде показано ваше оголошення! Реклама на сайті розміщується тільки на сторінках певних ігор та модів до них, а в клієнті ви можете розмістити банер, який буде показаний на всіх екранах програми або на будь-якій сторінці гри, яку ви захочете!',
      languagePl: 'Można umieszczać zarówno banery .png, jak i .gif. Jeśli zdecydujesz się umieścić swoją reklamę w witrynie, możesz wybrać subdomenę językową, w której zostanie umieszczony Twój baner. W przypadku klienta można wybrać określone kraje, w których reklama będzie wyświetlana! Reklamy na stronie są umieszczane tylko na stronach określonych gier i modów do tych gier, ale w kliencie możesz umieścić baner, który będzie wyświetlany na wszystkich ekranach aplikacji lub na dowolnej stronie gry!',
      languageDe: 'Sie können sowohl .png- als auch .gif-Banner platzieren. Wenn Sie sich entscheiden, Ihre Werbung auf der Website zu platzieren, können Sie die Sprach-Subdomain wählen, in der Ihr Banner platziert werden soll. Für einen Kunden können Sie bestimmte Länder auswählen, in denen Ihre Werbung angezeigt werden soll! Anzeigen auf der Website werden nur auf den Seiten bestimmter Spiele und Mods für diese Spiele platziert, aber im Client können Sie ein Banner platzieren, das auf allen Bildschirmen der App oder auf jeder beliebigen Spielseite angezeigt wird!',
      languageIt: "È possibile inserire banner sia in formato .png che .gif. Quando si inserisce un annuncio sul sito, è possibile scegliere il sottodominio linguistico in cui verrà inserito il banner. Per un cliente, è possibile scegliere qualsiasi paese specifico in cui verrà mostrato il proprio annuncio! Gli annunci sul sito vengono inseriti solo nelle pagine dei giochi e delle mod specificate, ma nel client è possibile inserire un banner nelle pagine dell'intera applicazione, o nella pagina del gioco che si desidera!",
      languageTr: "Hem .png hem de .gif bannerları yerleştirebilirsiniz. Siteye bir reklam yerleştirirken, banner'ınızın yerleştirileceği dil alt alanını seçebilirsiniz. Bir müşteri için, reklamınızın gösterileceği belirli ülkeleri seçebilirsiniz! Sitedeki reklamlar yalnızca belirtilen oyunların ve modların sayfalarına yerleştirilir, ancak istemcide tüm uygulamanın sayfalarına veya istediğiniz oyunun sayfasına bir banner yerleştirebilirsiniz!",
      languageEs: "Puede colocar tanto banners .png como .gif. Al colocar un anuncio en el sitio, puede elegir el subdominio de idioma en el que se colocará su banner. En el caso de un cliente, puede elegir los países específicos en los que se mostrará su anuncio. Los anuncios en el sitio sólo se colocan en las páginas de los juegos y mods especificados, pero en el cliente puedes colocar un banner en las páginas de toda la aplicación, ¡o en la página del juego que quieras!",
      languageCn: "您可以放置 .png 和 .gif 横幅。在网站上发布广告时，您可以选择横幅所在的语言子域。对于客户，您可以选择广告展示的特定国家！网站上的广告只在指定游戏和 mods 的页面上投放，但在客户端上，您可以在整个应用程序的页面上投放横幅广告，也可以在您想要的游戏页面上投放横幅广告!",
    },
  },
  {
    name: 'BannersRestrictions', value: {
      languageEn: "Are there any restrictions for ads that you won't publish?",
      languageRu: 'Есть ли ограничения на рекламу, которую вы рекламировать не станете?',
      languageUa: 'Чи є обмеження на рекламу, яку ви рекламувати не станете?',
      languagePl: 'Czy istnieją ograniczenia dotyczące reklam, których nie będziesz reklamować?',
      languageDe: 'Gibt es Werbebeschränkungen, für die Sie nicht werben werden?',
      languageIt: 'Ci sono limitazioni alla pubblicità che non volete pubblicizzare?',
      languageTr: 'Reklam vermeyeceğiniz kısıtlamalar var mı?',
      languageEs: '¿Existen restricciones a la publicidad que no publicaran?',
      languageCn: '是否有不做广告的广告限制?',
    },
  },
  {
    name: 'BannersRestrictionsDescription', value: {
      languageEn: "We will not publish scam projects, casinos, viruses, suspicious software, betting predictions, quick-rich-schemes or any other illegal shit. We won't change our minds even for great money!",
      languageRu: 'Да, мы не рекламируем скам проекты, вирусы, подозрительное ПО, прогнозы на ставки, инфоцыганство или любую другую нелегальную хрень. Ни за какие деньги.',
      languageUa: 'Так, ми не рекламуємо скам проєкти, віруси, підозріле ПЗ, прогнози на ставки, інфоциганство або будь-яку іншу нелегальну хрень. Ні за які гроші.',
      languagePl: 'Tak, nie reklamujemy oszukańczych projektów, wirusów, podejrzanego oprogramowania, prognoz bukmacherskich, cyganów informacyjnych ani żadnego innego nielegalnego gówna. Nie za żadne pieniądze.',
      languageDe: 'Ja, wir werben nicht für Betrugsprojekte, Viren, verdächtige Software, Wettprognosen, Info-Zigeuner oder anderen illegalen Mist. Nicht für jedes Geld.',
      languageIt: "Sì, non pubblicizziamo progetti di truffa, virus, software sospetti, pronostici di scommesse, zingari dell'informazione o qualsiasi altra cosa illegale. Non per denaro.",
      languageTr: 'Evet, dolandırıcılık projelerinin, virüslerin, şüpheli yazılımların, bahis tahminlerinin, bilgi çingenelerinin veya diğer yasadışı şeylerin reklamını yapmıyoruz. Para için değil.',
      languageEs: 'Sí, no anunciamos proyectos de estafa, virus, software sospechoso, predicciones de apuestas, gitanos de la información ni ninguna otra mierda ilegal. Ni por dinero.',
      languageCn: '是的，我们不宣传诈骗项目、病毒、可疑软件、投注预测、信息吉普赛人或任何其他非法狗屎。不为任何金钱。',
    },
  },
  {
    name: 'WebsiteStats', value: {
      languageEn: "Website statistics (daily users + monthly users + geo)",
      languageRu: 'Статистика сайта (ежедневные пользователи + ежемесячные пользователи + гео)',
      languageUa: 'Статистика сайту (щоденні користувачі + щомісячні користувачі + гео)',
      languagePl: 'Statystyki witryny (dzienni użytkownicy + miesięczni użytkownicy + geo)',
      languageDe: 'Website-Statistiken (tägliche Nutzer + monatliche Nutzer + geo)',
      languageIt: 'Statistiche del sito (utenti giornalieri + utenti mensili + geo)',
      languageTr: 'Site istatistikleri (günlük kullanıcılar + aylık kullanıcılar + coğrafi bölge)',
      languageEs: 'Estadísticas de la aplicación (usuarios diarios + usuarios mensuales + geo)',
      languageCn: '网站统计数据（日用户数 + 月用户数 + 地理位置）',
    },
  },
  {
    name: 'AppStats', value: {
      languageEn: "Application's statistics (daily users + monthly users + geo)",
      languageRu: 'Статистика приложения (ежедневные пользователи + ежемесячные пользователи + гео)',
      languageUa: 'Статистика застосунку (щоденні користувачі + щомісячні користувачі + гео)',
      languagePl: 'Statystyki aplikacji (dzienni użytkownicy + miesięczni użytkownicy + geo)',
      languageDe: 'Anwendungsstatistiken (tägliche Nutzer + monatliche Nutzer + geo)',
      languageIt: "Statistiche dell'applicazione (utenti giornalieri + utenti mensili + geo)",
      languageTr: 'Uygulama istatistikleri (günlük kullanıcılar + aylık kullanıcılar + coğrafi bölge)',
      languageEs: 'Estadísticas de la aplicación (usuarios diarios + usuarios mensuales + geo)',
      languageCn: '应用程序统计 (日用户 + 月用户 + 地理位置)',
    },
  },
  {
    name: 'AddPlacementExamples', value: {
      languageEn: "Examples of adverts and where they are placed",
      languageRu: 'Примеры рекламы и где она размещается',
      languageUa: 'Приклади реклами і де вона розміщується',
      languagePl: 'Przykłady reklam i miejsca ich umieszczania',
      languageDe: 'Beispiele für Anzeigen und deren Platzierung',
      languageIt: 'Esempi di inserzioni e di collocazione',
      languageTr: 'Reklam örnekleri ve yerleştirildikleri yerler',
      languageEs: 'Ejemplos de anuncios y dónde se colocan',
      languageCn: '广告示例及其投放位置',
    },
  },
  {
    name: 'PriceAndContacts', value: {
      languageEn: "What is the price of advertising and where can you contacts be found?",
      languageRu: 'Какова цена рекламы и куда писать по поводу её покупки?',
      languageUa: 'Яка ціна реклами і куди писати з приводу її купівлі?',
      languagePl: 'Jaka jest cena reklamy i gdzie pisać o jej zakup?',
      languageDe: 'Wie hoch ist der Preis für Werbung und wo kann man sie kaufen?',
      languageIt: 'Qual è il prezzo della pubblicità e dove scrivere per acquistarla?',
      languageTr: 'Reklam fiyatı nedir ve satın almak için nereye yazılır?',
      languageEs: '¿Cuál es el precio de la publicidad y dónde escribir para comprarla?',
      languageCn: '广告价格是多少，在哪里购买?',
    },
  },
  {
    name: 'PriceAndContactsDescription', value: {
      languageEn: "The price of the advert depends on the chosen type of advertising (specifically for 1 game/on all screens of the application), region and on what exactly you want to advertise. Our contacts are located at the bottom part of this page!",
      languageRu: 'Цена рекламы сильно зависит от выбранного типа рекламы (конкретно под 1 игру/на всех экранах приложения), региона и от того, что конкретно вы рекламируете. Наши контакты расположены в нижней части страницы!',
      languageUa: 'Ціна реклами сильно залежить від обраного типу реклами (конкретно під 1 гру/на всіх екранах застосунку), регіону і від того, що конкретно ви рекламуєте. Наші контакти розташовані в нижній частині сторінки!',
      languagePl: 'Cena reklamy silnie zależy od wybranego typu reklamy (konkretnie dla 1 gry/na wszystkich ekranach aplikacji), regionu i tego, co dokładnie reklamujesz. Nasze kontakty znajdują się na dole strony!',
      languageDe: 'Der Preis der Werbung hängt stark von der gewählten Art der Werbung (speziell für 1 Spiel/auf allen Bildschirmen der Anwendung), der Region und davon ab, was genau Sie werben möchten. Unsere Kontakte finden Sie unten auf der Seite!',
      languageIt: "Il prezzo della pubblicità dipende fortemente dal tipo di pubblicità scelta (specificamente per 1 gioco/su tutte le schermate dell'applicazione), dalla regione e da ciò che si vuole esattamente pubblicizzare. I nostri contatti si trovano in fondo alla pagina!",
      languageTr: 'Reklam fiyatı, seçilen reklam türüne (özellikle 1 oyun için / uygulamanın tüm ekranlarında), bölgeye ve tam olarak neyin reklamını yaptığınıza bağlıdır. İletişim bilgilerimiz sayfanın alt kısmında yer almaktadır!',
      languageEs: 'El precio de la publicidad depende en gran medida del tipo de publicidad elegido (específicamente para 1 juego/en todas las pantallas de la aplicación), de la región y de lo que anuncie exactamente. Nuestros contactos se encuentran al final de la página.',
      languageCn: '广告价格主要取决于您所选择的广告类型（具体为 1 款游戏/应用程序的所有屏幕）、地区和广告内容。我们的联系方式位于页面底部!',
    },
  },
];

/// Opens image from provided index in a separate dialog with blurred background.
function openScreenshot(index) {
  try {
    // Find image link and ensure that it's not empty
    let src = document.getElementsByClassName('screenshot')[index - 1].src;
    if(!src.includes('screenshot_')) {
      document.getElementsByClassName('screenshot-viewer')[0].classList.add('visible');
      document.getElementsByClassName('screenshot-object')[0].src =
        src.replace(".webp", ".png").replace("webp_images", "images");
    }
  } catch (_) {
    /* Do nothing */
  }
}

/// Navigates user to translated version of the website.
function navigateToTranslatedWebsite(language, saveLanguageSwitchingState = false) {
  try {
    var currentURL = window.location.href;
    var ending = currentURL.split(".net/").pop().replace("#ru", '').replace("#en", '').replace("#ua", '').replace("#de", '').replace("#pl", '').replace("#tr", '').replace("#cn", '').replace("#es", '').replace("#it", '');
    window.open(("https://" + (translationElements.find(entry => entry.name === 'LangTag').value)[_languages[language]] + ".exloader.net/" + ending).replace("https://ru.", 'https://'), "_self");
  } catch (_) {
    translateWebsite(language, saveLanguageSwitchingState);
  }
}

/// Updates current language to the provided [language] variable.
function translateWebsite(language, saveLanguageSwitchingState = false) {
  // Change dropdown selected item to the provided one
  try {
    document.getElementById("current-language").textContent = language;
  } catch (_) {
    /* Do nothing */
  }

  // Go through each translation element, find it's html representation and replace its text value
  for (let translationTitle in translationElements) {
    try {
      // There can be multiple items with the same className so loop through all found items
      [...document.getElementsByClassName(translationElements[translationTitle]['name'])].forEach(el => {
        let name = translationElements[translationTitle]['name'];
        if (name !== 'SwitchTo' && name !== "Yes" && name !== "No") {
          el.textContent = translationElements[translationTitle]['value'][_languages[language]];
        }
      });
    } catch (_) {
      /* Do nothing */
    }
  }

  // Update page title
  try {
    if(document.title.includes('ExLoader')) {
      document.title = translationElements.find(
        entry => entry.name === 'UnifiedLibrary',
      ).value[_languages[language]];
    } else {
      // Find possible titles for all site pages
      let cheatsFor = translationElements.find(el => el.name === 'CheatsFor').value;
      let justFor = translationElements.find(el => el.name === 'For').value;

      // Get non-translatable parts
      let modTitle = document.title.split(' - ')[0];
      let gameName = "";
      if(document.title.includes(' - ')) {
        gameName = document.title.split(' ').slice(-1)[0];
      } else {
        gameName = document.title.split(' ').slice(2).join(" ");
      }

      for(let _language in _languages) {
        if(!document.title.includes(' - ')) {
          document.title = `${cheatsFor[_languages[language]]} ${gameName}`;
        } else {
          let alternativeTitleSpan = document.getElementsByClassName('ActualTitle')[0].classList;
          let lastClassName = alternativeTitleSpan.item(alternativeTitleSpan.length - 1);
          document.title = `${modTitle} - ${translationElements.find(el => el.name === lastClassName).value[_languages[language]]} ${justFor[_languages[language]]} ${gameName}`;
        }
      }
    }
  } catch (_) {
    /* Do nothing */
  }

  // Change main image for current language
  try {
    let image = document.getElementById('main-image');
    if (language === 'Русский' || language === 'Українська') {
      image.src = "resources/main_ru.webp";
    } else {
      image.src = "resources/main_en.webp";
    }
  } catch (_) {
    /* Do nothing */
  }

  // Cache language to re-apply translation if page is refreshed
  try {
    localStorage['language'] = language;
    if (saveLanguageSwitchingState === true) {
      localStorage['language-suggestion-isAlreadyShown'] = true;
    }
  } catch (_) {
    /* Do nothing */
  }

  // Update descriptions on game cards
  try {
    if(language === 'Русский') {
      [...document.getElementsByClassName('mod-card')].forEach(el => {
        try {
          el.getElementsByClassName('mod-description')[0].textContent =
            el.getElementsByClassName('mod-description-ru')[0].alt;
        } catch (_) {
          /* Do nothing */
        }
        try {
          document.getElementsByClassName('mod_custom_message')[0].textContent =
            el.getElementsByClassName('mod_custom_message_ru')[0].alt;
        } catch (_) {
          /* Do nothing */
        }
      });
    } else if (language === 'Українська') {
      [...document.getElementsByClassName('mod-card')].forEach(el => {
        try {
          el.getElementsByClassName('mod-description')[0].textContent =
            el.getElementsByClassName('mod-description-ua')[0].alt;
        } catch (_) {
          /* Do nothing */
        }
        try {
          document.getElementsByClassName('mod_custom_message')[0].textContent =
            el.getElementsByClassName('mod_custom_message_ua')[0].alt;
        } catch (_) {
          /* Do nothing */
        }
      });
    } else {
      [...document.getElementsByClassName('mod-card')].forEach(el => {
        try {
          el.getElementsByClassName('mod-description')[0].textContent =
            el.getElementsByClassName('mod-description-en')[0].alt;
        } catch (_) {
          /* Do nothing */
        }
        try {
          document.getElementsByClassName('mod_custom_message')[0].textContent =
            el.getElementsByClassName('mod_custom_message_en')[0].alt;
        } catch (_) {
          /* Do nothing */
        }
      });
    }
  } catch (_) {
    /* Do nothing */
  }

  // Update description of the game
  try {
    if(language === 'Русский') {
      document.getElementsByClassName('game-description')[0].textContent =
              document.getElementsByClassName('game-description-ru')[0].alt;
    } else if (language === 'Українська') {
      document.getElementsByClassName('game-description')[0].textContent =
        document.getElementsByClassName('game-description-ua')[0].alt;
    } else {
      document.getElementsByClassName('game-description')[0].textContent =
        document.getElementsByClassName('game-description-en')[0].alt;
    }
  } catch (_) {
    /* Do nothing */
  }
}
