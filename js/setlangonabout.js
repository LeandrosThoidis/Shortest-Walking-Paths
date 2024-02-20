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
    currentLangElement.innerHTML = lang === 'Ελληνικά' ? 'Ελληνικά <span class="checked">✓</span>' : 'English <span class="checked">✓</span>';
    updatePageContent2(lang);
  }

  function updatePageContent2(lang) {
    var translations = {
      English: {
        campusNavigation: "Campus Navigation",
        departments: "Departments",
        cafeRestaurants: "Cafe-Restaurants",
        about: "About",
        home: "Home",
        pageTitle: {
          "about.html": "About",
          "about": "About"
        },
        aboutPage: {
        about1:"SWaP is a navigation app that finds the shortest possible routes in the University of Patras. The application highlights all the facilities of the university allocated in the three available pages. For the shortest path search the application asks about: currentLocation and Destination. The currentLocation field, is provided with two οptions: either complete this field or press the FIND ME button which detects and displays current location on map. Finally, it is a progressive web-app, so there is the feature of cached recent routes so that the user can view them.",
        about2: "Therefore, SWaP is a useful app for both the new-year and higher-year students.",
        contact: "Contact me at:"}
      },
      
      Ελληνικά: {
        campusNavigation: "Περιήγηση Πανεπιστημίου",
        departments: "Τμήματα",
        cafeRestaurants: "Καφέ-Εστιατόρια",
        about: "Σχετικά",
        home: "Αρχική",
        pageTitle: {
          "about.html": "Σχετικά",
          "about": "Σχετικά"
        },
        aboutPage: {
        about1:"Το SWaP είναι μια εφαρμογή πλοήγησης που βρίσκει τις συντομότερες δυνατές διαδρομές στο Πανεπιστήμιο Πατρών. Η εφαρμογή αναδεικνύει όλες τις εγκαταστάσεις του πανεπιστημίου, αυτές κατανέμονται στις τρεις διαθέσιμες σελίδες. Για την αναζήτηση της συντομότερης διαδρομής η εφαρμογή ζητάει τα εξής: Τρέχουσα Τοποθεσία και Προορισμός. Για το πεδίο Τρέχουσα Τοποθεσία, παρέχονται δύο επιλογές: είτε να συμπληρωθεί το πεδίο είτε να πατηθεί το κουμπί ΒΡΕΣ ΜΕ το οποίο εντοπίζει και εμφανίζει την τρέχουσα τοποθεσία στο χάρτη. Τέλος, πρόκειται για μια προοδευτική διαδικτυακή εφαρμογή, οπότε υπάρχει η δυνατότητα προσωρινής αποθήκευσης των πρόσφατα αναζητημένων διαδρομών, ώστε ο χρήστης να μπορεί να τις βλέπει χωρίς σύνδεση στο ίντερνετ",
        about2: "Ως εκ τούτου, το SWaP είναι μια χρήσιμη εφαρμογή τόσο για τους πρωτοετείς όσο και για τους τελειόφοιτους φοιτητές.",
        contact: "Βρείτε με στο:"}
      }
    };
  
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
      updateNavLinkText('#side-menu li a[href="/pages/recommendation/Departments.html"]', translations[lang].departments, 'location_city');
      updateNavLinkText('#side-menu li a[href="/pages/recommendation/Cafe-restaurants.html"]', translations[lang].cafeRestaurants, 'restaurant');
      updateNavLinkText('#side-menu li a[href="/pages/about.html"]', translations[lang].about, 'info');
      }
      else{ 
        document.querySelector('#side-menu li a.subheader').textContent = translations[lang].campusNavigation;
        updateNavLinkText('#side-menu li a[href*="/"]', translations[lang].home, 'home'); 
        updateNavLinkText('#side-menu li a[href*="/departments"]', translations[lang].departments, 'location_city');
        updateNavLinkText('#side-menu li a[href*="/cafe-restaurants"]', translations[lang].cafeRestaurants, 'restaurant');
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