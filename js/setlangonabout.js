var currentUrl = window.location.href;
if (currentUrl.includes('about')){
document.addEventListener('DOMContentLoaded', () => {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'Ελληνικά';
    setLanguage(selectedLanguage); // Set the initial language
  
    document.getElementById('current-lang').addEventListener('click', (e) => {
      e.stopPropagation();
      const langOptions = document.getElementById('lang-options');
      langOptions.style.display = (langOptions.style.display === 'none' || !langOptions.style.display) ? 'block' : 'none';
    });
  
    document.querySelector('#option-greek a').addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage('Ελληνικά');
    });
  
    document.querySelector('#option-english a').addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage('English');
    });
  
    // Hide language options when clicking anywhere else on the document
    document.addEventListener('click', () => {
      document.getElementById('lang-options').style.display = 'none';
    }, true);
  });

  var currentUrl = window.location.href;

  function setLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    const currentLangElement = document.getElementById('current-lang');
    currentLangElement.innerHTML = lang === 'Ελληνικά' ? 'EΛ <span class="checked">✓</span>' : 'EN <span class="checked">✓</span>';
    updatePageContent2(lang);
  }

  function updatePageContent2(lang) {
    var translations = {
      English: {
        campusNavigation: "Points of Interest",
        subtitle: "Your 'Shortest Walking-Paths' campus assistant",
        departments: "Departments",
        cafeRestaurants: "Cafe-Restaurants",
        about: "About",
        home: "Home",
        BusStations: "Bus Stations",
        pageTitle: {
          "about.html": "About",
          "about": "About"
        },
        aboutPage: {
        about1:"SWaP is your 'Shortest Walking-Paths' campus assistant, helping you find shortest walking paths within our upatras campus. You can either let SWaP know your current location via your wireless device or manually first select / type a starting point and then your destination from the dropdown list. SWap will show you the shortest route to walk to your point of interest. Keep in mind that after your first visit, SWaP remains fully functional even if you are off-grid",
        about2: "Enjoy SWaPing around at upatras campus!",
        contact: "Contact me at:"}
      },
      
      Ελληνικά: {
        campusNavigation: "Σημεία Ενδιαφέροντος",
        subtitle: "Ο βοηθός σας στην εύρεση συντομότερων μονοπατιών",
        departments: "Τμήματα",
        cafeRestaurants: "Καφέ-Εστιατόρια",
        about: "Σχετικά",
        home: "Αρχική",
        BusStations: "Στάσεις Λεωφορείων",
        pageTitle: {
          "about.html": "Σχετικά",
          "about": "Σχετικά"
        },
        aboutPage: {
        about1:"Το SWaP είναι ο βοηθός σας για την εύρεση των 'συντομότερων μονοπατιών για πεζούς' στην πανεπιστημιούπολη της Πάτρας. Μπορείτε είτε να επιτρέψετε στο SWaP την πρόσβαση στην τοποθεσία σας μέσω της ασύρματης συσκευής σας είτε να επιλέξετε/πληκτρολογήσετε χειροκίνητα πρώτα ένα σημείο εκκίνησης και στη συνέχεια τον προορισμό σας από την αναπτυσσόμενη λίστα. Το SWap θα σας δείξει τη συντομότερη διαδρομή για να περπατήσετε μέχρι το σημείο για το οποίο ενδιαφέρεστε. Λάβετε υπόψη ότι μετά την πρώτη σας επίσκεψη, το SWaP παραμένει πλήρως λειτουργικό ακόμη και αν είστε εκτός δικτύου",
        about2: "Απολαύστε το SWaPing στο Πανεπιστήμιο Πατρών!",
        contact: "Βρείτε με στο:"}
      }
    };

    var subtitleElement = document.querySelector('.subtitle');
  if (subtitleElement) subtitleElement.textContent = translations[lang].subtitle;

    var about1Element = document.getElementById('about1');
    if (about1Element) {about1Element.textContent = translations[lang].aboutPage.about1;
    }
    var about2Element = document.getElementById('about2');
    if (about2Element) {about2Element.textContent = translations[lang].aboutPage.about2;
    }

    var contactElement = document.getElementById('contact');
    if (contactElement) {contactElement.textContent = translations[lang].aboutPage.contact;
    }

      var currentPage = window.location.pathname.split("/").pop(); 
      var pageTitleElement = document.getElementById('pageTitle'); 
      if (pageTitleElement && translations[lang].pageTitle[currentPage]) {
        pageTitleElement.textContent = translations[lang].pageTitle[currentPage];
      } 
      if (currentUrl.includes('.html')){
      document.querySelector('#side-menu li a.subheader').textContent = translations[lang].campusNavigation;
      updateNavLinkText('#side-menu li a[href="/index.html"]', translations[lang].home, 'home'); 
      updateNavLinkText('#side-menu li a[href="/pages/recommendation/Departments.html"]', translations[lang].departments, 'location_city');
      updateNavLinkText('#side-menu li a[href="/pages/recommendation/Cafe-restaurants.html"]', translations[lang].cafeRestaurants, 'restaurant');
      updateNavLinkText('#side-menu li a[href="/pages/recommendation/BusStations.html"]', translations[lang].BusStations, 'directions_bus');
      updateNavLinkText('#side-menu li a[href="/pages/about.html"]', translations[lang].about, 'info');
      }
      else{ 
        document.querySelector('#side-menu li a.subheader').textContent = translations[lang].campusNavigation;
        updateNavLinkText('#side-menu li a[href*="/"]', translations[lang].home, 'home'); 
        updateNavLinkText('#side-menu li a[href*="/departments"]', translations[lang].departments, 'location_city');
        updateNavLinkText('#side-menu li a[href*="/cafe-restaurants"]', translations[lang].cafeRestaurants, 'restaurant');
        updateNavLinkText('#side-menu li a[href*="/busstations"]', translations[lang].BusStations, 'directions_bus');
        updateNavLinkText('#side-menu li a[href*="/about"]', translations[lang].about, 'info');
        }
      }

function updateNavLinkText(selector, text, iconClassName) {
  var linkElement = document.querySelector(selector);
  if (linkElement) {
    // Remove the old text node
    linkElement.childNodes.forEach(function(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        linkElement.removeChild(node);
      }
    });

    // Add the new text node
    linkElement.appendChild(document.createTextNode(text));

    // Ensure the icon remains
    if (!linkElement.querySelector('.material-icons')) {
      var icon = document.createElement('i');
      icon.className = 'material-icons';
      icon.textContent = iconClassName;
      linkElement.insertBefore(icon, linkElement.firstChild);
    }
  }
}
}
else{}