var blackMarkers = [
  { 
      coordinates: [38.28962, 21.79132], 
      popupText: {
          English: 'Central Library and Information Center',
          Ελληνικά: 'Κεντρική βιβλιοθήκη και Κέντρο ενημέρωσης'
      }
  },
  { 
      coordinates: [38.29022, 21.78636], 
      popupText: {
          English: 'Conference Center',
          Ελληνικά: 'Συνεδριακό Κέντρο'
      }
  },
  { 
      coordinates: [38.28570, 21.79006], 
      popupText: {
          English: 'Student Dormitory',
          Ελληνικά: 'Φοιτητική Εστία'
      }
  },
  { 
      coordinates: [38.28204, 21.78855], 
      popupText: {
          English: 'University of Patras Gym',
          Ελληνικά: 'Πανεπιστημιακό Γυμναστήριο Πατρών'
      }
  },
  { 
      coordinates: [38.2861, 21.7866], 
      popupText: {
          English: 'Rectorate',
          Ελληνικά: 'Πρυτανεία'
      }
  }];
  if (typeof BussIcon !== 'undefined'){
  var busStopMarkers = [
    { 
      coordinates: [38.28576, 21.78621], 
      popupText: {
        English: 'Departure bus stop-Rectorate', 
        Ελληνικά: 'Στάση αναχώρησης-Πρυτανεία'
      }
    },
    { 
      coordinates: [38.28592, 21.78604], 
      popupText: {
        English: 'Train Response bus stop-Rectorate', 
        Ελληνικά: 'Στάση ανταπόκρισης τρένου-Πρυτανεία'
      }
    },
    { 
      coordinates: [38.28602,21.78584], 
      popupText: {
        English: 'Arrival bus stop-Rectorate', 
        Ελληνικά: 'Στάση άφιξης-Πρυτανεία'
      }
    },
    { 
      coordinates: [38.28800, 21.78655], 
      popupText: {
        English: 'Polytechnic`s bus stop', 
        Ελληνικά: 'Στάση Πολυτεχνείων'
      }
    },
    { 
      coordinates: [38.28994, 21.78487], 
      popupText: {
        English: 'Conference Center bus stop', 
        Ελληνικά: 'Στάση Συνεδριακού'
      }
    },
    { 
      coordinates: [38.29193,21.78755], 
      popupText: {
        English: 'Science`s arrival bus stop', 
        Ελληνικά: 'Στάση άφιξης Θετικών Επιστημών'
      }
    },
    { 
      coordinates: [38.29355, 21.79058], 
      popupText: {
        English: 'Arrival bus stop of the Geology Dep', 
        Ελληνικά: 'Στάση άφιξης Γεωλογικού'
      }
    },
    { 
      coordinates: [38.29440, 21.79205], 
      popupText: {
        English: 'Arrival bus stop of Medics', 
        Ελληνικά: 'Στάση άφιξης-Ιατρική'
      }
    },
    { 
      coordinates: [38.29592, 21.79457], 
      popupText: {
        English: 'Arrival bus stop-University Hospital', 
        Ελληνικά: 'Στάση άφιξης Πανεπιστημιακού Νοσοκομείου'
      }
    },
    { 
      coordinates: [38.29685, 21.79607], 
      popupText: {
        English: 'Departure bus stop-starting point', 
        Ελληνικά: 'Στάση-αφετηρία αναχώρησης'
      }
    },
    { 
      coordinates: [38.29467, 21.79204], 
      popupText: {
        English: 'Departure bus stop-Medics', 
        Ελληνικά: 'Στάση αναχώρησης-Ιατρική'
      }
    },
    { 
      coordinates: [38.29369, 21.79035], 
      popupText: {
        English: 'Departure bus stop of the Geology Dep', 
        Ελληνικά: 'Στάση αναχώρησης Γεωλογικού'
      }
    },
    { 
      coordinates: [38.29197, 21.78729], 
      popupText: {
        English: 'Science`s departure bus stop', 
        Ελληνικά: 'Σταση αναχώρησης Θετικών Επιστημών'
      }
    },
    { 
      coordinates: [38.28962, 21.78218], 
      popupText: {
        English: 'OAED bus stop', 
        Ελληνικά: 'Στάση ΟΑΕΔ'
      }
    },
  
      { coordinates: [38.28615,21.78611], popupText: { English: '612 Bus starting point', Ελληνικά: 'Αφετηρία 612' } },
      { coordinates: [38.28697,21.78987], popupText: { English: '612 Bus stop-Dormitory', Ελληνικά: 'Στάση 612-Εστία' } },
      { coordinates: [38.29036,21.79458], popupText: { English: '612 Bus stop-CEID', Ελληνικά: 'Σταση 612-Μηχανικοί ΗΥ' } },
      { coordinates: [38.29009,21.79182], popupText: { English: '612 Bus stop-Library', Ελληνικά: 'Στάση 612-Βιβλιοθήκη' } },
      { coordinates: [38.28784,21.78669], popupText: { English: '612 Bus stop-Polytechnic', Ελληνικά: 'Σταση 612-Πολυτεχνεία' } },
      { coordinates: [38.28847,21.78416], popupText: { English: '612 Bus stop-Speech Therapy', Ελληνικά: 'Στάση 612-Λογοθεραπία' } },
    
  ];

  busStopMarkers.forEach(function(marker) {
    L.marker(marker.coordinates, { icon: BussIcon })
      .bindPopup(marker.popupText)
      .addTo(map);
  });
}
  
  
  var orangeMarkers = [
    { 
        coordinates: [38.28700, 21.786467], 
        popupText: {
            English: 'Peace Park',
            Ελληνικά: 'Πάρκο Ειρήνης'
        }
    },
    { 
        coordinates: [38.28678, 21.78558], 
        popupText: {
            English: 'Octagon',
            Ελληνικά: 'Octagon'
        }
    },
    { 
        coordinates: [38.28594,21.78573], 
        popupText: {
            English: 'Coffee Island',
            Ελληνικά: 'Coffee Island'
        }
    },
    { 
        coordinates: [38.28593, 21.78975], 
        popupText: {
            English: 'Student Restaurant',
            Ελληνικά: 'Εστιατόριο Φοιτητικής Εστίας'
        }
    },
    { 
        coordinates: [38.29041, 21.79482], 
        popupText: {
            English: 'CEID Cafeteria',
            Ελληνικά: 'Καφετέρια CEID'
        }
    },
    { 
        coordinates: [38.28912, 21.78741], 
        popupText: {
            English: 'Mechanical Engineering Canteen',
            Ελληνικά: 'Κυλικείο Μηχανολόγων'
        }
    },
    { 
        coordinates: [38.29089, 21.78852], 
        popupText: {
            English: 'Chemistry Canteen',
            Ελληνικά: 'Κυλικείο Χημικού'
        }
    },
  ];
  
  var blueMarkers = [
    { 
      coordinates: [38.29019, 21.79503], 
      popupText: {
        English: 'Department of Computer Engineering & Informatics',
        Ελληνικά: 'Τμήμα Μηχανικών ΗΥ & Πληροφορικής'
      }
    },
    { 
      coordinates: [38.29382, 21.79399], 
      popupText: {
        English: 'Medical School',
        Ελληνικά: 'Ιατρική Σχολή'
      }
    },
    { 
      coordinates: [38.29237, 21.79257], 
      popupText: {
        English: 'Department of Pharmacy',
        Ελληνικά: 'Τμήμα Φαρμακευτικής'
      }
    },
    { 
      coordinates: [38.29181, 21.78994], 
      popupText: {
        English: 'Department of Geology',
        Ελληνικά: 'Τμήμα Γεωλογίας'
      }
    },
    { 
      coordinates: [38.29127, 21.78883], 
      popupText: {
        English: 'Department of Physics',
        Ελληνικά: 'Τμήμα Φυσικής'
      }
    },
    { 
      coordinates: [38.29052, 21.79012], 
      popupText: {
        English: 'Department of Mathematics',
        Ελληνικά: 'Τμήμα Μαθηματικών'
      }
    },
    { 
      coordinates: [38.29069, 21.78781], 
      popupText: {
        English: 'Department of Chemistry',
        Ελληνικά: 'Τμήμα Χημείας'
      }
    },
    { 
      coordinates: [38.28962, 21.78827], 
      popupText: {
        English: 'Department of Chemical Engineering',
        Ελληνικά: 'Τμήμα Χημικών Μηχανικών'
      }
    },
    { 
      coordinates: [38.28923,21.78780], 
      popupText: {
        English: 'School of Mechanical Engineering & Aeronautics',
        Ελληνικά: 'Σχολή Μηχανολόγων Μηχανικών & Αεροναυπηγικής'
      }
    },
    { 
      coordinates: [38.28888, 21.79048], 
      popupText: {
        English: 'Department of Civil Engineering',
        Ελληνικά: 'Τμήμα Πολιτικών Μηχανικών'
      }
    },
    { 
      coordinates: [38.28848, 21.78736], 
      popupText: {
        English: 'Department of Primary Education',
        Ελληνικά: 'Παιδαγωγικό Τμήμα Δημοτικής Εκπαίδευσης'
      }
    },
    { 
      coordinates: [38.28787, 21.78927], 
      popupText: {
        English: 'Department of Electrical & Computer Engineering',
        Ελληνικά: 'Τμήμα Ηλεκτρολόγων Μηχανικών & Τεχνολογίας Υπολογιστών'
      }
    },
    { 
      coordinates: [38.28825, 21.78336], 
      popupText: {
        English: 'Department of Speech Therapy',
        Ελληνικά: 'Τμήμα Λογοθεραπείας'
      }
    },
    { 
      coordinates: [38.28693, 21.78195], 
      popupText: {
        English: 'Department of Economics',
        Ελληνικά: 'Τμήμα Οικονομικών Επιστημών'
      }
    },
    { 
      coordinates: [38.28680, 21.78412], 
      popupText: {
        English: 'Department of Business Administration',
        Ελληνικά: 'Τμήμα Διοίκησης Επιχειρήσεων'
      }
    },
    { 
      coordinates: [38.29009, 21.78974], 
      popupText: {
        English: 'Department of Biology',
        Ελληνικά: 'Τμήμα Βιολογίας'
      }
    },
    { 
      coordinates: [38.28468, 21.78410], 
      popupText: {
        English: 'Department of Theatre Studies',
        Ελληνικά: 'Τμήμα Θεατρικών Σπουδών'
      }
    },
    { 
      coordinates: [38.28494, 21.78462], 
      popupText: {
        English: 'Department of Philosophy',
        Ελληνικά: 'Τμήμα Φιλοσοφίας'
      }
    },
    { 
      coordinates: [38.28336, 21.78695], 
      popupText: {
        English: 'Department of Material Science',
        Ελληνικά: 'Τμήμα Επιστήμης των Υλικών'
      }
    },
    { 
      coordinates: [38.28468, 21.78760], 
      popupText: {
        English: 'Department of Physiotherapy',
        Ελληνικά: 'Τμήμα Φυσικοθεραπείας'
      }
    },
    {
      coordinates: [38.28487,21.78795],
      popupText:{
        English: 'Department of History-Archaeology',
        Ελληνικά:'Τμήμα Ιστορίας-Αρχαιολογίας'
    }
  },
  {
    coordinates: [38.28590, 21.78438],
    popupText:{
      English: 'Department of Architecture',
      Ελληνικά:'Τμήμα Αρχιτεκτόνων'
  }
  },
  ];

  const knownLocationsgr = {
    'συνεδριακό': [38.29022, 21.78636],
    'συνεδριακό κέντρο': [38.29022, 21.78636],
  
    'Νοσοκομείο': [38.2943,21.7957],
    'Νοσοκομέιο Ρίο': [38.2943,21.7957],
    'Βοήθεια': [38.2943,21.7957],
  
    'Βιβλιοθήκη': [38.28962, 21.79132],
    'Κεντρική βιβλιοθήκη': [38.28962, 21.79132],
    'Κέντρο Ενημέρωσης': [38.28962, 21.79132],
  
    'Πρυτανεία': [38.2861, 21.7866],
    'Κτίριο Α': [38.2861, 21.7866],

  
    'Φοιτητική Εστία': [38.28620,21.78970],
    'Εστία': [38.28620,21.78970],
    'Λέσχη Σίτησης': [38.28620,21.78970],
  
    'Πανεπιστημιακό Γυμναστήριο': [38.28204, 21.78855],
    'Γήπεδα': [38.28204, 21.78855],
    'Αθλητικές εγκαταστάσεις': [38.28204, 21.78855],
    'Γυμναστήριο': [38.28204, 21.78855],
  
    'Τμήμα Μηχανικών Ηλεκτρονικών Υπολογιστών και Πληροφορικής': [38.29019, 21.79503],
    'Ceid': [38.29019, 21.79503],
    'Τμήμα ΗΥ': [38.29019, 21.79503],
  
    'Ιατρική Σχολή': [38.29386,21.79361],
    'Ιατρική': [38.29386,21.79361],
    'Τμήμα Ιατρικής': [38.29386,21.79361],
  
    'Φαρμακευτική': [38.29237, 21.79257],
    'Τμήμα Φαρμακευτικής': [38.29237, 21.79257],
  
    'Γεωλογία': [38.29181, 21.78994],
    'Τμήμα Γεωλογίας': [38.29181, 21.78994],
    'Γεωλογικό': [38.29181, 21.78994],
  
    'Φυσικό': [38.29127, 21.78883],
    'Τμήμα Φυσικής': [38.29127, 21.78883],
  
    'Χημικό': [38.29069, 21.78781],
    'Τμήμα Χημείας': [38.29069, 21.78781],
  
    'Μαθηματικό': [38.29052, 21.79012],
    'Τμήμα Μαθηματικών': [38.29052, 21.79012],
  
    'Βιολογικό': [38.29009, 21.78974],
    'Τμήμα Βιολογίας': [38.29009, 21.78974],
  
    'Τμήμα Χημικών Μηχανικών': [38.28962, 21.78827],
    'Χημικοί Μηχανικοί': [38.28962, 21.78827],
    'Χημικών Μηχανικών': [38.28962, 21.78827],
  
    'Σχολή Μηχανολόγων Μηχανικών & Αεροναυπηγικής': [38.28923,21.78780],
    'Τμήμα Μηχανολόγων Μηχανικών & Αεροναυπηγικής': [38.28923,21.78780],
    'Τμήμα Μηχανολόγων Μηχανικών': [38.28923,21.78780],
    'Μηχανολόγοι': [38.28923,21.78780],
    'Αεροναυπηγοί': [38.28923,21.78780],
    'Μηχανολόγων': [38.28923,21.78780],
  
    'Τμήμα Πολιτικών Μηχανικών': [38.28888, 21.79048],
    'Πολιτικοί Μηχανικοί' : [38.28888, 21.79048],
    'Πολιτικών Μηχανικών': [38.28888, 21.79048],
  
    'Παιδαγωγικό Τμήμα Δημοτικής Εκπαίδευσης': [38.28848, 21.78736],
    'Παιδαγωγικό' : [38.28848, 21.78736],
  
    'Τμήμα Ηλεκτρολόγων Μηχανικών & Τεχνολογίας Υπολογιστών': [38.28787, 21.78927],
    'Ηλέκτρολόγοι': [38.28787, 21.78927],
    'Ηλέκτρολόγων': [38.28787, 21.78927],

    'Τμήμα Λογοθεραπίας': [38.28825, 21.78336],
    'Λογοθεραπία' : [38.28825, 21.78336],
    'Τμήμα Λογοθεραπείας': [38.28825, 21.78336],
    'Λογοθεραπεία' : [38.28825, 21.78336],
  
    'Τμήμα Οικονομικών Επιστημών': [38.28693, 21.78195],
    'Οικονομικό' : [38.28693, 21.78195],
  
    'Τμήμα Διοίκησης Επιχειρήσεων': [38.28680, 21.78412],
    'Διοίκηση' : [38.28680, 21.78412],
    'Διοίκηση Επιχειρήσεων' : [38.28680, 21.78412],
  
    'Τμήμα Θεατρικών Σπουδών': [38.28468, 21.78410],
    'Θεατρολογία' : [38.28468, 21.78410],
  
    'Τμήμα Φιλοσοφίας': [38.28494, 21.78462],
    'Φιλοσοφία' : [38.28494, 21.78462],
    'Φιλοσοφικό' : [38.28494, 21.78462],
  
    'Τμήμα Επιστήμης Υλικών': [38.28336, 21.78695],
    'Τμήμα Επιστήμης των Υλικών': [38.28336, 21.78695],
    'Επιστήμη Υλικών' : [38.28336, 21.78695],
  
    'Τμήμα Φυσικοθεραπείας': [38.28487,21.78773],
    'Φυσικοθεραπεία' : [38.28487,21.78773],
  
    'Τμήμα Ιστορίας-Αρχαιολογίας': [38.28487,21.78773],
    'Ιστορία' : [38.28487,21.78773],
    'Αρχαιολογία' : [38.28487,21.78773],
    'Ιστορία και Αρχαιολογία' : [38.28487,21.78773],
  
    'Τμήμα Αρχιτεκτόνων': [38.28590, 21.78438],
    'Αρχιτέκτονες' : [38.28590, 21.78438],
    'Αρχιτεκτονική' : [38.28590, 21.78438],
    'Αρχιτεκτόνων' : [38.28590, 21.78438],

    'Πάρκο Ειρήνης': [38.28700, 21.786467],
    'Πάρκο' : [38.28700, 21.786467],
  
    'Οκτάγωνο': [38.28678,21.78558],
    'Octagon' : [38.28678,21.78558],

    'Κόφι': [38.28594,21.78573],
  
    'Εστιατόριο Φοιτητικής Εστίας': [38.28620,21.78970],
    'Εστιατόριο': [38.28620,21.78970],
    'Εστιατόριο Εστίας': [38.28620,21.78970],
  
    'Καφετέρια CEID': [38.29041,21.79482],
    'CEID Cafeteria': [38.29041,21.79482],
  
    'Κυλικείο Μηχανολόγων': [38.28912, 21.78741],

    'Κυλικείο Χημικού': [38.29089,21.78852],

      'Στάση αναχώρησης-Πρυτανεία': [38.28576, 21.78621],
      'Στάση ανταπόκρισης τρένου-Πρυτανεία': [38.28592, 21.78604],
      'Στάση άφιξης-Πρυτανεία': [38.28602,21.78584],
      'Στάση Πολυτεχείων': [38.28800, 21.78655],
      'Στάση Συνεδριακού': [38.28994, 21.78487],
      'Στάση άφιξης Θετικών Επιστημών': [38.29193,21.78755],
      'Στάση άφιξης Γεωλογικού': [38.29355, 21.79058],
      'Στάση άφιξης-Ιατρική': [38.29440, 21.79205],
      'Στάση άφιξης Πανεπιστημιακού Νοσοκομείου': [38.29592, 21.79457],
      'Στάση-αφετηρία αναχώρησης': [38.29685, 21.79607],
      'Στάση αναχώρησης-Ιατρική': [38.29467, 21.79204],
      'Στάση αναχώρησης Γεωλογικού': [38.29369, 21.79035],
      'Σταση αναχώρησης Θετικών Επιστημών': [38.29197, 21.78729],
      'Στάση ΟΑΕΔ': [38.28962, 21.78218],
      'Αφετηρία 612': [38.28615, 21.78611],
      'Στάση 612-Εστία': [38.28697, 21.78987],
      'Σταση 612-Μηχανικοί ΗΥ': [38.29036, 21.79458],
      'Στάση 612-Βιβλιοθήκη': [38.29009, 21.79182],
      'Σταση 612-Πολυτεχνεία': [38.28784, 21.78669],
      'Στάση 612-Λογοθεραπία': [38.28847, 21.78416]
      
  };

  const knownLocationsen = {
    'Conference': [38.29022, 21.78636],
    'Conference Center': [38.29022, 21.78636],
  
    'Hospital': [38.2943,21.7957],
    'Patras General University Hospital': [38.2943,21.7957],
    'Help': [38.2943,21.7957],
    'University Hospital': [38.2943,21.7957],

    'Library': [38.28962, 21.79132],
    'Central Library': [38.28962, 21.79132],
    'Central Library & Information Services': [38.28962, 21.79132],
    'Information Services': [38.28962, 21.79132],

    'Administration Building': [38.2861, 21.7866],
    'Administration': [38.2861, 21.7866],

    'University Hall of Residence': [38.28620,21.78970],
    'Hall of Residence': [38.28620,21.78970],
    'Student canteen': [38.28620,21.78970],

    'University of Patras Gym': [38.28204, 21.78855],
    'Fitness center': [38.28204, 21.78855],
    'sports facilities': [38.28204, 21.78855],
    'stadiums': [38.28204, 21.78855],

    'Department of Computer Engineering and Informatics': [38.29019, 21.79503],
    'Department of Computer Engineering & Informatics': [38.29019, 21.79503],
    'Informatics': [38.29019, 21.79503],
    'Computer Engineering': [38.29019, 21.79503],
    'Ceid': [38.29019, 21.79503],

    'Medical School': [38.29386,21.79361],
    'Medicine': [38.29386,21.79361],
    "Department of Medicine": [38.29386,21.79361],
    "School of Medicine": [38.29386,21.79361],

    'Pharmacy': [38.29237, 21.79257],
    'Department of Pharmacy': [38.29237, 21.79257],

    'Geology': [38.29181, 21.78994],
    'Department of Geology': [38.29181, 21.78994],

    'Physics': [38.29127, 21.78883],
    'Department of Physics': [38.29127, 21.78883],

    'Chemistry': [38.29069, 21.78781],
    'Department of Chemistry': [38.29069, 21.78781],

    'Mathematics': [38.29052, 21.79012],
    'Department of Mathematics': [38.29052, 21.79012],

    'Biology': [38.29009, 21.78974],
    'Department of Biology': [38.29009, 21.78974],

    'Department of Chemical Engineering': [38.28962, 21.78827],
    "Chemical Engineers": [38.28962, 21.78827],
    "Chemical Engineering": [38.28962, 21.78827],
    "Chemical Engineering Department": [38.28962, 21.78827],

    'School of Mechanical & Aeronautical Engineering': [38.28923,21.78780],
    'Mechanical Engineering & Aeronautical School': [38.28923,21.78780],
    "Department of Mechanical & Aeronautical Engineering": [38.28923,21.78780],
    "Department of Mechanical Engineering": [38.28923,21.78780],
    "Mechanical Engineers": [38.28923,21.78780],
    "Aeronautical Engineers": [38.28923,21.78780],

    'Department of Civil Engineering': [38.28888, 21.79048],
    'Civil Engineers' : [38.28888, 21.79048],
    'Civil Engineering': [38.28888, 21.79048],
    'Civil Engineering Department': [38.28888, 21.79048],

    'Department of Primary Education': [38.28848, 21.78736],
    'Department of Education' : [38.28848, 21.78736],

    'Department of Electrical & Computer Engineering': [38.28787, 21.78927],
    "Electrical engineers": [38.28787, 21.78927],

    'Department of Logotherapy': [38.28825, 21.78336],
    "Cognotherapy" : [38.28825, 21.78336],
    "Department of Speech Therapy": [38.28825, 21.78336],
    "Speech therapy" : [38.28825, 21.78336],

    'Department of Economics': [38.28693, 21.78195],
    'Economics' : [38.28693, 21.78195],

    'Department of Business Administration': [38.28680, 21.78412],
    'Administration' : [38.28680, 21.78412],
    "Business Administration" : [38.28680, 21.78412],

    'Department of Theatre Studies': [38.28468, 21.78410],
    'Theatrology' : [38.28468, 21.78410],
  
    'Department of Philosophy': [38.28494, 21.78462],
    'Philosophy' : [38.28494, 21.78462],

    'Department of Materials Science': [38.28336, 21.78695],
    'Materials Science' : [38.28336, 21.78695],

    'Department of Physiotherapy': [38.28487,21.78773],
    'Physiotherapy' : [38.28487,21.78773],

    'Department of History-Archaeology': [38.28487,21.78773],
    'History' : [38.28487,21.78773],
    'Archaeology' : [38.28487,21.78773],
    'History and archaeology' : [38.28487,21.78773],

    'Department of Architecture': [38.28590, 21.78438],
    'Architecture' : [38.28590, 21.78438],
    'Architects' : [38.28590, 21.78438],
  
    'Peace Park': [38.28700, 21.786467],
    'Park' : [38.28700, 21.786467],

    'Octagon' : [38.28678,21.78558],

    'Coffee Island': [38.28594,21.78573],
    'Coffee': [38.28594,21.78573],
  
    'Student Dormitory Restaurant': [38.28620,21.78970],
    'Student Restaurant': [38.28620,21.78970],
    'Restaurant': [38.28620,21.78970],
    "Dormitory Restaurant": [38.28620,21.78970],

    'CEID Cafeteria': [38.29041,21.79482],

    'Mechanical Engineering Canteen': [38.28912, 21.78741],

    'Chemist`s Canteen': [38.29089,21.78852],

    'Departure bus stop-Rectorate': [38.28576, 21.78621],
    'Train Response bus stop-Rectorate': [38.28592, 21.78604],
    'Arrival bus stop-Rectorate': [38.28602,21.78584],
    'Polytechnic`s bus stop': [38.28800, 21.78655],
    'Conference Center bus stop': [38.28994, 21.78487],
    'Science`s arrival bus stop': [38.29193,21.78755],
    'Arrival bus stop of the Geological Section': [38.29355, 21.79058],
    'Arrival bus stop of Medics': [38.29440, 21.79205],
    'Arrival bus stop-University Hospital': [38.29592, 21.79457],
    'Departure bus stop-starting point': [38.29685, 21.79607],
    'Departure bus stop-Medics': [38.29467, 21.79204],
    'Departure bus stop of the Geological Section': [38.29369, 21.79035],
    'Science`s departure bus stop': [38.29197, 21.78729],
    'OAED bus stop': [38.28962, 21.78218],
    '612 Bus starting point': [38.28615, 21.78611],
    '612 Bus stop-Dormitory': [38.28697, 21.78987],
    '612 Bus stop-CEID': [38.29036, 21.79458],
    '612 Bus stop-Library': [38.29009, 21.79182],
    '612 Bus stop-Polytechnic': [38.28784, 21.78669],
    '612 Bus stop-Speech Therapy': [38.28847, 21.78416]
  
  }


  const knownLocationsgrmona = {
    'Συνεδριακό κέντρο': [38.29022, 21.78636],
    
    'Νοσοκομέιο Ρίο': [38.2943,21.7957],

    'Κεντρική βιβλιοθήκη': [38.28962, 21.79132],
  
    'Πρυτανεία': [38.2861, 21.7866],
  
    'Φοιτητική Εστία': [38.28620,21.78970],
  
    'Πανεπιστημιακό Γυμναστήριο': [38.28204, 21.78855],
  
    'Τμήμα Μηχανικών Ηλεκτρονικών Υπολογιστών και Πληροφορικής': [38.29019, 21.79503],
  
    'Ιατρική Σχολή': [38.29386,21.79361],
  
    'Τμήμα Φαρμακευτικής': [38.29237, 21.79257],
  
    'Τμήμα Γεωλογίας': [38.29181, 21.78994],

    'Τμήμα Φυσικής': [38.29127, 21.78883],

    'Τμήμα Χημείας': [38.29069, 21.78781],

    'Τμήμα Μαθηματικών': [38.29052, 21.79012],

    'Τμήμα Βιολογίας': [38.29009, 21.78974],
  
    'Τμήμα Χημικών Μηχανικών': [38.28962, 21.78827],
  
    'Τμήμα Μηχανολόγων Μηχανικών & Αεροναυπηγικής': [38.28923,21.78780],

    'Τμήμα Πολιτικών Μηχανικών': [38.28888, 21.79048],
  
    'Παιδαγωγικό Τμήμα Δημοτικής Εκπαίδευσης': [38.28848, 21.78736],
  
    'Τμήμα Ηλεκτρολόγων Μηχανικών & Τεχνολογίας Υπολογιστών': [38.28787, 21.78927],

    'Τμήμα Λογοθεραπίας': [38.28825, 21.78336],
  
    'Τμήμα Οικονομικών Επιστημών': [38.28693, 21.78195],
  
    'Τμήμα Διοίκησης Επιχειρήσεων': [38.28680, 21.78412],
  
    'Τμήμα Θεατρικών Σπουδών': [38.28468, 21.78410],
  
    'Τμήμα Φιλοσοφίας': [38.28494, 21.78462],
  
    'Τμήμα Επιστήμης Υλικών': [38.28336, 21.78695],

    'Τμήμα Φυσικοθεραπείας': [38.28487,21.78773],
  
    'Τμήμα Ιστορίας-Αρχαιολογίας': [38.28487,21.78773],
  
    'Τμήμα Αρχιτεκτόνων': [38.28590, 21.78438],

    'Πάρκο Ειρήνης': [38.28700, 21.786467],
  
    'Οκτάγωνο': [38.28678,21.78558],
  
    'Κόφι': [38.28594,21.78573],
  
    'Εστιατόριο Φοιτητικής Εστίας': [38.28620,21.78970],
  
    'Καφετέρια CEID': [38.29041,21.79482],
  
    'Κυλικείο Μηχανολόγων': [38.28912, 21.78741],

    'Κυλικείο Χημικού': [38.29089,21.78852],

    'Στάση αναχώρησης-Πρυτανεία': [38.28576, 21.78621],
    'Στάση ανταπόκρισης τρένου-Πρυτανεία': [38.28592, 21.78604],
    'Στάση άφιξης-Πρυτανεία': [38.28602,21.78584],
    'Στάση Πολυτεχείων': [38.28800, 21.78655],
    'Στάση Συνεδριακού': [38.28994, 21.78487],
    'Στάση άφιξης Θετικών Επιστημών': [38.29193,21.78755],
    'Στάση άφιξης Γεωλογικού': [38.29355, 21.79058],
    'Στάση άφιξης-Ιατρική': [38.29440, 21.79205],
    'Στάση άφιξης Πανεπιστημιακού Νοσοκομείου': [38.29592, 21.79457],
    'Στάση-αφετηρία αναχώρησης': [38.29685, 21.79607],
    'Στάση αναχώρησης-Ιατρική': [38.29467, 21.79204],
    'Στάση αναχώρησης Γεωλογικού': [38.29369, 21.79035],
    'Σταση αναχώρησης Θετικών Επιστημών': [38.29197, 21.78729],
    'Στάση ΟΑΕΔ': [38.28962, 21.78218],
    'Αφετηρία 612': [38.28615, 21.78611],
    'Στάση 612-Εστία': [38.28697, 21.78987],
    'Σταση 612-Μηχανικοί ΗΥ': [38.29036, 21.79458],
    'Στάση 612-Βιβλιοθήκη': [38.29009, 21.79182],
    'Σταση 612-Πολυτεχνεία': [38.28784, 21.78669],
    'Στάση 612-Λογοθεραπία': [38.28847, 21.78416]
  };

  const knownLocationsenmona = {
    'Conference Center': [38.29022, 21.78636],
  
    'Patras General University Hospital': [38.2943,21.7957],

    'Central Library & Information Services': [38.28962, 21.79132],

    'Administration Building': [38.2861, 21.7866],

    'University Hall of Residence': [38.28620,21.78970],

    'Fitness center': [38.28204, 21.78855],

    'Department of Computer Engineering & Informatics': [38.29019, 21.79503],

    'Medical School': [38.29386,21.79361],

    'Department of Pharmacy': [38.29237, 21.79257],

    'Department of Geology': [38.29181, 21.78994],

    'Department of Physics': [38.29127, 21.78883],

    'Department of Chemistry': [38.29069, 21.78781],

    'Department of Mathematics': [38.29052, 21.79012],

    'Department of Biology': [38.29009, 21.78974],

    'Department of Chemical Engineering': [38.28962, 21.78827],

    "Department of Mechanical & Aeronautical Engineering": [38.28923,21.78780],

    'Department of Civil Engineering': [38.28888, 21.79048],

    'Department of Primary Education': [38.28848, 21.78736],

    'Department of Electrical & Computer Engineering': [38.28787, 21.78927],

    'Department of Logotherapy': [38.28825, 21.78336],

    'Department of Economics': [38.28693, 21.78195],

    'Department of Business Administration': [38.28680, 21.78412],

    'Department of Theatre Studies': [38.28468, 21.78410],
  
    'Department of Philosophy': [38.28494, 21.78462],

    'Department of Materials Science': [38.28336, 21.78695],

    'Department of Physiotherapy': [38.28487,21.78773],

    'Department of History-Archaeology': [38.28487,21.78773],

    'Department of Architecture': [38.28590, 21.78438],
  
    'Peace Park': [38.28700, 21.786467],

    'Octagon' : [38.28678,21.78558],

    'Coffee Island': [38.28594,21.78573],
  
    'Student Dormitory Restaurant': [38.28620,21.78970],

    'CEID Cafeteria': [38.29041,21.79482],

    'Mechanical Engineering Canteen': [38.28912, 21.78741],

    'Chemist`s Canteen': [38.29089,21.78852],

    'Departure bus stop-Rectorate': [38.28576, 21.78621],
    'Train Response bus stop-Rectorate': [38.28592, 21.78604],
    'Arrival bus stop-Rectorate': [38.28602,21.78584],
    'Polytechnic`s bus stop': [38.28800, 21.78655],
    'Conference Center bus stop': [38.28994, 21.78487],
    'Science`s arrival bus stop': [38.29193,21.78755],
    'Arrival bus stop of the Geological Section': [38.29355, 21.79058],
    'Arrival bus stop of Medics': [38.29440, 21.79205],
    'Arrival bus stop-University Hospital': [38.29592, 21.79457],
    'Departure bus stop-starting point': [38.29685, 21.79607],
    'Departure bus stop-Medics': [38.29467, 21.79204],
    'Departure bus stop of the Geological Section': [38.29369, 21.79035],
    'Science`s departure bus stop': [38.29197, 21.78729],
    'OAED bus stop': [38.28962, 21.78218],
    '612 Bus starting point': [38.28615, 21.78611],
    '612 Bus stop-Dormitory': [38.28697, 21.78987],
    '612 Bus stop-CEID': [38.29036, 21.79458],
    '612 Bus stop-Library': [38.29009, 21.79182],
    '612 Bus stop-Polytechnic': [38.28784, 21.78669],
    '612 Bus stop-Speech Therapy': [38.28847, 21.78416]
  }
  
  var knownLocations = Object.assign({}, knownLocationsen, knownLocationsgr);
  var markers = [...blackMarkers, ...orangeMarkers, ...blueMarkers];

  
  

  