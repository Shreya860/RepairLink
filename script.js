import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

const firebaseConfig = {
  projectId: "repairlink-de1ta",
  appId: "1:4711329582:web:6e12287963fd4bd58254bf",
  storageBucket: "repairlink-de1ta.firebasestorage.app",
  apiKey: "AIzaSyDMuvy1qfYvqLP348TZB-lfxGixaJGZFrk",
  authDomain: "repairlink-de1ta.firebaseapp.com",
  messagingSenderId: "4711329582",
  measurementId: "G-BQ7PBRSGH3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

let windowCurrentUser = null;
onAuthStateChanged(auth, async (user) => {
  const navLogin = document.getElementById('navLogin');
  const navLogout = document.getElementById('navLogout');
  
  if (user) {
    windowCurrentUser = user;
    if(navLogin) navLogin.style.display = 'none';
    if(navLogout) navLogout.style.display = 'inline-block';
    
    // Check role and inject links
    try {
      const { getDoc, doc } = await import("https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js");
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if(userDoc.exists()) {
        const role = userDoc.data().role;
        const navDashboard = document.getElementById('navDashboard');
        if (navDashboard) {
          if (role === 'kaarigar') navDashboard.href = 'KaarigarDashboard.html';
          else if (role === 'user') navDashboard.href = 'UserDashboard.html';
          else if (role === 'admin') navDashboard.href = 'Admin.html';
        }
        
        if (role === 'admin') {
          const nav = navLogout.parentNode;
          if(!document.getElementById('navAdmin')) {
            const adminLink = document.createElement('a');
            adminLink.id = 'navAdmin';
            adminLink.href = 'Admin.html';
            adminLink.textContent = 'Admin Panel';
            adminLink.style.color = '#FF4C3B';
            adminLink.style.textDecoration = 'none';
            nav.insertBefore(adminLink, navLogout);
          }
        }
      }
    } catch(err) {
      console.error(err);
    }
    
  } else {
    windowCurrentUser = null;
    if(navLogin) navLogin.style.display = 'inline-block';
    if(navLogout) navLogout.style.display = 'none';
    const navAdmin = document.getElementById('navAdmin');
    if(navAdmin) navAdmin.remove();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const navLogout = document.getElementById('navLogout');
  if(navLogout) {
    navLogout.addEventListener('click', (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        window.location.reload();
      });
    });
  }
});

// ---------- Translation / Localization Helper ----------
  let currentLang = 'en';
  const translations = {
    en: {
      disclaimer: "Prototype demo — names, phone numbers, ratings & reviews shown here are placeholder data, not real people.",
      roleTitle: "Welcome to RepairLink",
      roleSub: "Tell us who you are, so we can show you the right screen.",
      roleCustomerTitle: "I need something repaired",
      roleCustomerDesc: "Find a trusted kaarigar near you — cobbler, watch repairer, appliance technician or locksmith.",
      roleArtisanTitle: "I repair things for a living",
      roleArtisanDesc: "List yourself on RepairLink so customers nearby can find and message you directly.",
      backToStart: "Back",
      artisanEyebrow: "List yourself as a kaarigar",
      artisanFormTitle: "Get discovered by customers near you",
      artisanFormIntro: "Fill this in and our team will verify your details before your profile goes live on the map. Verification helps customers trust who they're calling.",
      fieldName: "Full name",
      fieldTrade: "Your trade",
      tradeCobbler: "Cobbler",
      tradeWatch: "Watch repairer",
      tradeAppliance: "Appliance repairer",
      tradeLocksmith: "Locksmith",
      fieldYears: "Years of experience",
      fieldArea: "Area / locality",
      fieldPhone: "Phone / WhatsApp number",
      fieldHours: "Working hours",
      fieldIntro: "A line about your work",
      fieldId: "ID for verification (mock — nothing is uploaded in this prototype)",
      uploadText: "Tap to attach Aadhaar / shop ID photo",
      submitListing: "Submit for verification",
      pendingTag: "⏳ Pending verification",
      previewLabel: "HOW YOUR PROFILE WILL LOOK",
      statHoursLabel: "Hours",
      statYearsLabel: "Years here",
      statJobsLabel: "Jobs completed",
      verifySteps: "What happens next",
      verifyStep1: "Our team calls you to confirm your details and check your ID.",
      verifyStep2: "We do a short in-person or phone verification of your shop/stall.",
      verifyStep3: "Once verified, your profile goes live with a green \"Verified\" badge that customers can see and trust.",
      submitAnother: "Submit another profile",
      repliesHour: "Usually replies within the hour",
      delivered: "Delivered",
      whatCustomersSay: "What customers say",
      messageWhatsapp: "Message this kaarigar on WhatsApp",
      markDone: "Mark repair done",
      reportIssue: "Report an issue",
      heroEyebrow: "What is RepairLink?",
      heroTitle: "We give your broken things a second chance.",
      heroP1: "We provide repair links to you, so that your daily needs can be fulfilled without turning them into waste. We connect you to the nearest kaarigar — cobbler, watch repairer, appliance technician or locksmith — who can fix what you already own.",
      heroP2: "Anything that truly cannot be repaired, we collect ourselves and send for recycling, so it reduces waste piling up in Delhi.",
      heroRegion: "Currently live only in North Delhi",
      heroBtnText: "Explore the map",
      brandTagline: "Mapping North Delhi's kaarigars — repair first, recycle what's left",
      legendTitle: "Services We Provide",
      legendSub: "Tap a symbol on the map to meet the kaarigar",
      legendCobblerName: "Cobblers",
      legendCobblerDesc: "— shoe & leather repair",
      legendWatchName: "Watch repairers",
      legendWatchDesc: "— horologists",
      legendApplianceName: "Appliance repair",
      legendApplianceDesc: "— mixers & grinders",
      legendLocksmithName: "Locksmiths",
      legendLocksmithDesc: "— keys & locks",
      chatCtaText: "Chat with a RepairLink helper",
      locateEyebrow: "Find your nearest kaarigar",
      locateHeading: "Select your location and we'll show you the closest artisan of each trade — in no time.",
      localityPlaceholder: "Choose your area in North Delhi…",
      locateBtnText: "Find closest kaarigars",
      resultsHeader: "CLOSEST TO YOU",
      nearestTo: "Nearest to",
      awayLabel: "away",
      fromLabel: "from",
      ticketNoLabel: "REPAIR TICKET NO.",
      verifiedText: "Verified",
      pendingText: "Pending verification",
      estLabel: "Est.",
      priceTooltip: "Estimated range only — confirm the final price with the kaarigar directly.",
      reviewsLabel: "reviews",
      yrsLabel: "yrs",
      toastDone: "Repair marked as complete. Thank you!",
      toastReport: "Report received. Our team will look into this.",
      phName: "e.g. Ramesh Kumar",
      phArea: "e.g. Kamla Nagar",
      phPhone: "10-digit number",
      phHours: "e.g. 10 AM – 7 PM, closed Sun",
      phIntro: "e.g. I've been resoling shoes near Kamla Nagar for 8 years...",
      clickForStory: "Click to read their story →"
    },
    hi: {
      disclaimer: "प्रोटोटाइप डेमो — यहाँ दिखाए गए नाम, फोन नंबर, रेटिंग और समीक्षाएं केवल उदाहरण के लिए हैं, असली लोग नहीं।",
      roleTitle: "RepairLink में आपका स्वागत है",
      roleSub: "हमें बताएं कि आप कौन हैं, ताकि हम आपको सही स्क्रीन दिखा सकें।",
      roleCustomerTitle: "मुझे कुछ ठीक करवाना है",
      roleCustomerDesc: "अपने पास भरोसेमंद कारीगर खोजें — मोची, घड़ी मरम्मत करने वाला, उपकरण तकनीशियन या ताला बनाने वाला।",
      roleArtisanTitle: "मैं मरम्मत का काम करता/करती हूँ",
      roleArtisanDesc: "RepairLink पर खुद को सूचीबद्ध करें ताकि आस-पास के ग्राहक आपको ढूंढ कर सीधे संपर्क कर सकें।",
      backToStart: "वापस",
      artisanEyebrow: "खुद को कारीगर के रूप में सूचीबद्ध करें",
      artisanFormTitle: "अपने पास के ग्राहकों तक पहुंचें",
      artisanFormIntro: "यह भरें और हमारी टीम आपकी प्रोफ़ाइल मैप पर लाइव होने से पहले आपकी जानकारी सत्यापित करेगी। सत्यापन से ग्राहकों को भरोसा होता है कि वे किसे कॉल कर रहे हैं।",
      fieldName: "पूरा नाम",
      fieldTrade: "आपका व्यवसाय",
      tradeCobbler: "मोची",
      tradeWatch: "घड़ी मरम्मत करने वाला",
      tradeAppliance: "उपकरण मरम्मत करने वाला",
      tradeLocksmith: "ताला बनाने वाला",
      fieldYears: "अनुभव के वर्ष",
      fieldArea: "क्षेत्र / इलाका",
      fieldPhone: "फोन / व्हाट्सएप नंबर",
      fieldHours: "काम के घंटे",
      fieldIntro: "अपने काम के बारे में एक पंक्ति",
      fieldId: "सत्यापन के लिए पहचान पत्र (नकली — इस प्रोटोटाइप में कुछ भी अपलोड नहीं होता)",
      uploadText: "आधार / दुकान आईडी फ़ोटो जोड़ने के लिए टैप करें",
      submitListing: "सत्यापन के लिए जमा करें",
      pendingTag: "⏳ सत्यापन लंबित",
      previewLabel: "आपकी प्रोफ़ाइल ऐसी दिखेगी",
      statHoursLabel: "घंटे",
      statYearsLabel: "यहाँ के वर्ष",
      statJobsLabel: "पूरी की गई मरम्मतें",
      verifySteps: "आगे क्या होगा",
      verifyStep1: "हमारी टीम आपकी जानकारी की पुष्टि करने और आपकी आईडी जाँचने के लिए आपको कॉल करेगी।",
      verifyStep2: "हम आपकी दुकान/स्टॉल का संक्षिप्त व्यक्तिगत या फोन सत्यापन करते हैं।",
      verifyStep3: "सत्यापन के बाद, आपकी प्रोफ़ाइल हरे \"सत्यापित\" बैज के साथ लाइव हो जाती है, जिसे ग्राहक देख और भरोसा कर सकते हैं।",
      submitAnother: "एक और प्रोफ़ाइल जमा करें",
      repliesHour: "आमतौर पर एक घंटे के भीतर जवाब देते हैं",
      delivered: "भेज दिया गया",
      whatCustomersSay: "ग्राहक क्या कहते हैं",
      messageWhatsapp: "इस कारीगर को व्हाट्सएप पर संदेश भेजें",
      markDone: "मरम्मत पूर्ण को चिह्नित करें",
      reportIssue: "समस्या दर्ज करें",
      heroEyebrow: "RepairLink क्या है?",
      heroTitle: "हम आपकी टूटी चीज़ों को दूसरा मौका देते हैं।",
      heroP1: "हम आपको मरम्मत के संपर्क उपलब्ध कराते हैं, ताकि आपकी रोज़मर्रा की ज़रूरतें बिना कचरा बढ़ाए पूरी हो सकें। हम आपको सबसे नज़दीकी कारीगर — मोची, घड़ी मरम्मत करने वाला, उपकरण तकनीशियन या ताला बनाने वाला — से जोड़ते हैं जो आपकी पहले से मौजूद चीज़ को ठीक कर सके।",
      heroP2: "जो चीज़ सच में मरम्मत के लायक नहीं होती, उसे हम खुद इकट्ठा करके रीसाइक्लिंग के लिए भेजते हैं, ताकि दिल्ली में कचरा कम जमा हो।",
      heroRegion: "फिलहाल केवल उत्तरी दिल्ली में उपलब्ध",
      heroBtnText: "मैप देखें",
      brandTagline: "उत्तरी दिल्ली के कारीगरों की मैपिंग — पहले मरम्मत, फिर जो बचे उसे रीसाइकल",
      legendTitle: "हमारी सेवाएं",
      legendSub: "कारीगर से मिलने के लिए मैप पर एक चिह्न टैप करें",
      legendCobblerName: "मोची",
      legendCobblerDesc: "— जूते और चमड़े की मरम्मत",
      legendWatchName: "घड़ी मरम्मत करने वाले",
      legendWatchDesc: "— घड़ीसाज़",
      legendApplianceName: "उपकरण मरम्मत",
      legendApplianceDesc: "— मिक्सर और ग्राइंडर",
      legendLocksmithName: "ताला बनाने वाले",
      legendLocksmithDesc: "— चाबी और ताले",
      chatCtaText: "RepairLink सहायक से चैट करें",
      locateEyebrow: "अपना नज़दीकी कारीगर खोजें",
      locateHeading: "अपना स्थान चुनें और हम आपको हर व्यवसाय के सबसे नज़दीकी कारीगर तुरंत दिखाएंगे।",
      localityPlaceholder: "उत्तरी दिल्ली में अपना क्षेत्र चुनें…",
      locateBtnText: "नज़दीकी कारीगर खोजें",
      resultsHeader: "आपके सबसे नज़दीक",
      nearestTo: "इनके सबसे नज़दीक",
      awayLabel: "दूर",
      fromLabel: "से",
      ticketNoLabel: "मरम्मत टिकट नंबर",
      verifiedText: "सत्यापित",
      pendingText: "सत्यापन लंबित",
      estLabel: "अनुमानित",
      priceTooltip: "केवल अनुमानित सीमा — अंतिम मूल्य की पुष्टि सीधे कारीगर से करें।",
      reviewsLabel: "समीक्षाएं",
      yrsLabel: "वर्ष",
      toastDone: "मरम्मत पूर्ण के रूप में चिह्नित। धन्यवाद!",
      toastReport: "रिपोर्ट मिल गई है। हमारी टीम इसे देखेगी।",
      phName: "जैसे: रमेश कुमार",
      phArea: "जैसे: कमला नगर",
      phPhone: "10 अंकों का नंबर",
      phHours: "जैसे: सुबह 10 – शाम 7, रविवार बंद",
      phIntro: "जैसे: मैं कमला नगर के पास 8 साल से जूतों की मरम्मत कर रहा/रही हूँ...",
      clickForStory: "उनकी कहानी पढ़ने के लिए क्लिक करें →"
    }
  };

  function t18n(key) {
    return (translations[currentLang] && translations[currentLang][key]) || translations['en'][key] || key;
  }

  function tradeLabel(tradeKey) {
    return t18n('trade' + tradeKey.charAt(0).toUpperCase() + tradeKey.slice(1));
  }

  const TRADES = {
    cobbler:   { label:"Cobbler", color:"#FFB800", dim:"var(--marigold-dim)", price:"₹80 – ₹450",
      icon:'<path fill="CURR" d="M6 3h3v7.3l6.4 2.7c1.2.5 1.9 1.6 1.9 2.9V16H6a2 2 0 01-2-2V5a2 2 0 012-2z"/><path fill="CURR" d="M3.3 16h14.4a1.6 1.6 0 01-1.6 1.6H4.9A1.6 1.6 0 013.3 16z"/>' },
    watch:     { label:"Watch Repairer", color:"#FF4C3B", dim:"var(--vermilion-dim)", price:"₹150 – ₹900",
      icon:'<rect fill="CURR" x="10" y="1.5" width="4" height="3" rx="0.8"/><rect fill="CURR" x="10" y="19.5" width="4" height="3" rx="0.8"/><circle fill="CURR" cx="12" cy="12" r="6.3"/><path stroke="#fff" stroke-width="1.3" stroke-linecap="round" fill="none" d="M12 8.6v3.6l2.4 1.4"/>' },
    appliance: { label:"Appliance Repairer", color:"#2E8FE0", dim:"var(--teal-dim)", price:"₹200 – ₹1,200",
      icon:'<path fill="CURR" d="M7.2 3h9.6l-1.7 9.8a3.7 3.7 0 01-3.65 3.1h-.7a3.7 3.7 0 01-3.65-3.1z"/><rect fill="CURR" x="9.3" y="19.4" width="5.4" height="1.8" rx="0.6"/><path stroke="#fff" stroke-width="1" stroke-linecap="round" d="M9.3 7.8h5.4"/>' },
    locksmith: { label:"Locksmith", color:"#2FA65C", dim:"var(--leaf-dim)", price:"₹150 – ₹700",
      icon:'<circle fill="CURR" cx="7.2" cy="16.8" r="3.6"/><path stroke="CURR" stroke-width="2.6" stroke-linecap="round" fill="none" d="M9.7 14.3L18.5 5.5"/><path stroke="CURR" stroke-width="2.2" stroke-linecap="round" fill="none" d="M18.5 5.5l2.3 2.3M15.9 8.1l2.1 2.1"/>' }
  };

  let ARTISANS = [
    { name:"Ramesh Kumar", trade:"cobbler", phone:"919876507001", years:11, hours:"10 AM – 7 PM · Closed Sun", lat:28.6667, lng:77.2286, area:"Kashmere Gate",
      s1:"Hey! I'm Ramesh — I've been sitting right here near Kashmere Gate for the past 11 years.",
      s2:"I've repaired more than 5,000 shoes in that time and I keep my rates minimal, because everyone deserves a well-fitting pair. I sit from 10 AM to 7 PM, but not on Sundays — that's family day." },
    { name:"Suresh Lal", trade:"cobbler", phone:"919876507002", years:6, hours:"9 AM – 6:30 PM · Closed Sun", lat:28.6580, lng:77.2100, area:"Sadar Bazaar",
      s1:"Namaste, I'm Suresh, working out of a small corner in Sadar Bazaar for 6 years now.",
      s2:"My father taught me this trade, and before him, my grandfather. Nothing goes to waste if it can still be mended. Come by 9 to 6:30, except Sundays." },
    { name:"Iqbal Ahmed", trade:"watch", phone:"919876507003", years:19, hours:"11 AM – 8 PM · Closed Sun", lat:28.6800, lng:77.2220, area:"Civil Lines",
      s1:"I'm Iqbal — I've kept time for this part of Civil Lines for 19 years now.",
      s2:"Battery changes, strap repairs, old mechanical pieces no showroom wants to touch anymore — I take them all. I'm here 11 to 8, every day but Sunday." },
    { name:"Harbhajan Singh", trade:"watch", phone:"919876507004", years:8, hours:"10:30 AM – 7:30 PM · Closed Sun", lat:28.6800, lng:77.2050, area:"Kamla Nagar",
      s1:"Hello, I'm Harbhajan, and I've had my little watch counter in Kamla Nagar for 8 years.",
      s2:"Students from the college nearby are half my customers. I charge what's fair, especially for students. Find me 10:30 to 7:30, closed Sundays." },
    { name:"Farooq Sheikh", trade:"appliance", phone:"919876507005", years:14, hours:"10 AM – 7 PM · Closed Sun", lat:28.6600, lng:77.2050, area:"Azad Market",
      s1:"I'm Farooq — for 14 years I've been fixing mixers, grinders and small kitchen motors near Azad Market.",
      s2:"Most people think a mixer with a dead motor is trash. Nine times out of ten, it isn't. I take minimal charges. Open 10 to 7, not Sundays." },
    { name:"Deepak Chauhan", trade:"appliance", phone:"919876507006", years:9, hours:"9:30 AM – 6:30 PM · Closed Sun", lat:28.7100, lng:77.1900, area:"Model Town",
      s1:"Hi, I'm Deepak, running a small repair stall in Model Town for the past 9 years.",
      s2:"Mixies, grinders, table fans, irons — if it plugs in and it's stopped working, bring it over. Open 9:30 to 6:30, closed Sundays." },
    { name:"Rafiq Malik", trade:"locksmith", phone:"919876507007", years:16, hours:"9 AM – 9 PM · Open all week", lat:28.6660, lng:77.2170, area:"Tis Hazari",
      s1:"I'm Rafiq — I've been cutting keys and fixing locks near Tis Hazari courts for 16 years.",
      s2:"Court days keep this area busy, so I stay open all week, 9 AM to 9 PM. Old almirah locks, padlocks, house locks — always for the right reasons." },
    { name:"Meena Devi", trade:"locksmith", phone:"919876507008", years:7, hours:"10 AM – 6 PM · Closed Sun", lat:28.6870, lng:77.2010, area:"Roshanara Road",
      s1:"Hello, I'm Meena — one of the few women locksmiths you'll find in this trade, working near Roshanara Road for 7 years.",
      s2:"Duplicate keys, jammed locks, gate repairs — I handle it all, and I keep my rates the same for everyone. Here 10 to 6, closed Sundays." },
    { name:"Vinod Kashyap", trade:"cobbler", phone:"919876507009", years:5, hours:"10 AM – 8 PM · Closed Sun", lat:28.7040, lng:77.2110, area:"Mukherjee Nagar",
      s1:"I'm Vinod, and I've had my stool outside the coaching lane in Mukherjee Nagar for 5 years now.",
      s2:"Half my customers are students who've worn one pair of shoes into the ground. I keep prices student-friendly and turn most repairs around same-day." },
    { name:"Nasir Khan", trade:"watch", phone:"919876507010", years:12, hours:"10 AM – 7:30 PM · Closed Sun", lat:28.6995, lng:77.2080, area:"GTB Nagar",
      s1:"Hello, I'm Nasir — I've run a small watch counter outside GTB Nagar metro for 12 years.",
      s2:"Mostly strap changes and battery swaps for people rushing to catch a train, but I enjoy the occasional old mechanical watch too." },
    { name:"Ashok Verma", trade:"appliance", phone:"919876507011", years:10, hours:"9:30 AM – 6:30 PM · Closed Sun", lat:28.6960, lng:77.2260, area:"Timarpur",
      s1:"I'm Ashok, fixing mixers and grinders out of a small shop in Timarpur for the past 10 years.",
      s2:"If the jar is cracked or the blade's gone blunt, I can usually source a replacement part rather than telling you to buy new." },
    { name:"Salim Qureshi", trade:"locksmith", phone:"919876507012", years:13, hours:"9 AM – 8 PM · Open all week", lat:28.7130, lng:77.2280, area:"Wazirabad",
      s1:"I'm Salim, working near Wazirabad for 13 years now, mostly gate and shutter locks.",
      s2:"This area has a lot of old iron gates that jam in the monsoon — that's most of my calls in July and August." },
    { name:"Balwant Singh", trade:"cobbler", phone:"919876507013", years:8, hours:"10 AM – 7 PM · Closed Sun", lat:28.7160, lng:77.1720, area:"Adarsh Nagar",
      s1:"Sat Sri Akal, I'm Balwant — I've been repairing shoes in Adarsh Nagar market for 8 years.",
      s2:"Sports shoes are my specialty — kids wear through soles fast here and I can resole them for a fraction of a new pair." },
    { name:"Prakash Yadav", trade:"watch", phone:"919876507014", years:6, hours:"10:30 AM – 7 PM · Closed Sun", lat:28.6920, lng:77.1570, area:"Keshav Puram",
      s1:"Hi, I'm Prakash, at a small counter in Keshav Puram for 6 years now.",
      s2:"Straps, glass, batteries, and small repairs on quartz watches — quick and fair, every time." },
    { name:"Zaheer Ahmed", trade:"appliance", phone:"919876507015", years:7, hours:"10 AM – 7 PM · Closed Sun", lat:28.7050, lng:77.2270, area:"Majnu ka Tilla",
      s1:"I'm Zaheer — I've fixed household appliances near Majnu ka Tilla for 7 years.",
      s2:"Mixers, grinders, and the occasional rice cooker — if the motor still turns, I can usually bring it back." },
    { name:"Om Prakash", trade:"locksmith", phone:"919876507016", years:10, hours:"9 AM – 8 PM · Open all week", lat:28.7550, lng:77.2000, area:"Burari",
      s1:"I'm Om Prakash, cutting keys and repairing locks in Burari for 10 years.",
      s2:"New duplicate keys usually take me ten minutes. If you're locked out, call ahead and I'll try to reach you within the hour." },
    { name:"Chhotu Ram", trade:"cobbler", phone:"919876507017", years:9, hours:"9:30 AM – 6:30 PM · Closed Sun", lat:28.8530, lng:77.0920, area:"Narela",
      s1:"I'm Chhotu Ram, working from a small stall near Narela market for 9 years.",
      s2:"This is a working-class area, so I keep my rates as low as I can — a resole rarely costs more than a cup of chai." },
    { name:"Aslam Sheikh", trade:"watch", phone:"919876507018", years:15, hours:"10 AM – 7 PM · Closed Sun", lat:28.7960, lng:77.1360, area:"Alipur",
      s1:"I'm Aslam — I've run a small watch repair table in Alipur for 15 years.",
      s2:"I still keep spare parts for a few older mechanical brands that most repairers won't touch anymore." },
    { name:"Kishan Lal", trade:"appliance", phone:"919876507019", years:11, hours:"9 AM – 7 PM · Closed Sun", lat:28.6720, lng:77.1980, area:"Sabzi Mandi",
      s1:"I'm Kishan, fixing mixers and grinders near Sabzi Mandi for 11 years.",
      s2:"Vendors here bring me their crushers and juicers when they break down mid-morning — I try to get them running before the lunch rush." },
    { name:"Radha Devi", trade:"locksmith", phone:"919876507020", years:5, hours:"10:30 AM – 6:30 PM · Closed Sun", lat:28.6960, lng:77.1980, area:"Shakti Nagar",
      s1:"Hello, I'm Radha — one of the newer locksmiths around, working in Shakti Nagar for 5 years.",
      s2:"I learned the trade at a training centre and set up on my own after. Duplicate keys and small lock repairs are my main work." },
    { name:"Mahesh Prasad", trade:"cobbler", phone:"919876507021", years:7, hours:"10 AM – 7 PM · Closed Sun", lat:28.6920, lng:77.2100, area:"Malka Ganj",
      s1:"I'm Mahesh, mending shoes near Malka Ganj for the past 7 years.",
      s2:"College students and office-goers both stop by here — I keep a price list on display so nobody has to ask twice." },
    { name:"Yusuf Malik", trade:"watch", phone:"919876507022", years:9, hours:"10 AM – 7:30 PM · Closed Sun", lat:28.6980, lng:77.1930, area:"Rana Pratap Bagh",
      s1:"I'm Yusuf, running a small watch stall in Rana Pratap Bagh for 9 years.",
      s2:"Battery changes take five minutes, most strap repairs under fifteen — I keep common straps in stock so you rarely come back twice." },
    { name:"Devendra Kumar", trade:"appliance", phone:"919876507023", years:6, hours:"10 AM – 7 PM · Closed Sun", lat:28.7020, lng:77.2070, area:"Kingsway Camp",
      s1:"I'm Devendra, repairing mixers and small appliances in Kingsway Camp for 6 years.",
      s2:"I studied basic electricals before I started this, so I can usually diagnose a fault on the spot." },
    { name:"Naseem Akhtar", trade:"locksmith", phone:"919876507024", years:8, hours:"9:30 AM – 7:30 PM · Closed Sun", lat:28.7370, lng:77.1620, area:"Bhalswa",
      s1:"I'm Naseem, working with locks and keys near Bhalswa for 8 years.",
      s2:"A lot of my work here is repairing old padlocks rather than replacing them — most can be saved with the right part." }
  ];

  let LOCALITIES = [];
  let localityMap = new Map();
  let map, markers = [];

  function initApp() {
    localityMap = new Map();
    ARTISANS.forEach(a => { if(!localityMap.has(a.area)) localityMap.set(a.area, {lat:a.lat, lng:a.lng}); });
    LOCALITIES = Array.from(localityMap, ([name, c]) => ({name, ...c})).sort((a,b)=>a.name.localeCompare(b.name));

    const localitySelect = document.getElementById('localitySelect');
    localitySelect.innerHTML = '<option value="" data-i18n="localityPlaceholder">Choose your area in North Delhi…</option>';
    LOCALITIES.forEach(loc => {
      const opt = document.createElement('option');
      opt.value = loc.name; opt.textContent = loc.name;
      localitySelect.appendChild(opt);
    });

    // Legend icons setup
    document.getElementById('legendCobbler').innerHTML = `<svg viewBox="0 0 24 24">${TRADES.cobbler.icon.replaceAll('CURR', TRADES.cobbler.color)}</svg>`;
    document.getElementById('legendWatch').innerHTML = `<svg viewBox="0 0 24 24">${TRADES.watch.icon.replaceAll('CURR', TRADES.watch.color)}</svg>`;
    document.getElementById('legendAppliance').innerHTML = `<svg viewBox="0 0 24 24">${TRADES.appliance.icon.replaceAll('CURR', TRADES.appliance.color)}</svg>`;
    document.getElementById('legendLocksmith').innerHTML = `<svg viewBox="0 0 24 24">${TRADES.locksmith.icon.replaceAll('CURR', TRADES.locksmith.color)}</svg>`;
    
    function refreshLegendPrices(){
      document.getElementById('legendPriceCobbler').textContent = `${t18n('estLabel')} ${TRADES.cobbler.price}`;
      document.getElementById('legendPriceWatch').textContent = `${t18n('estLabel')} ${TRADES.watch.price}`;
      document.getElementById('legendPriceAppliance').textContent = `${t18n('estLabel')} ${TRADES.appliance.price}`;
      document.getElementById('legendPriceLocksmith').textContent = `${t18n('estLabel')} ${TRADES.locksmith.price}`;
    }
    refreshLegendPrices();

  // ---------- Map Setup ----------
  const map = L.map('map', { zoomControl:false, attributionControl:true }).setView([28.74, 77.18], 11.4);
  L.control.zoom({ position:'bottomright' }).addTo(map);

  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)',
    maxZoom:17, minZoom:10, updateWhenZooming:false, keepBuffer:2
  }).addTo(map);

  const NORTH_DELHI_ZONE = [
    [28.865,77.078],[28.885,77.128],[28.868,77.188],[28.805,77.228],
    [28.735,77.238],[28.700,77.243],[28.665,77.238],[28.652,77.213],
    [28.650,77.200],[28.657,77.184],[28.672,77.174],[28.690,77.176],
    [28.700,77.170],[28.712,77.165],[28.740,77.152],[28.780,77.132],
    [28.822,77.108],[28.865,77.078]
  ];
  L.polygon(NORTH_DELHI_ZONE, {
    color:'#8A5C00', weight:2.4, opacity:0.85, dashArray:'9 5',
    fillColor:'#FFB800', fillOpacity:0.07
  }).addTo(map).bindTooltip('North Delhi service zone (illustrative outline)', {sticky:true, direction:'top'});

  L.marker([28.822, 77.10], { icon: L.divIcon({ html:'<div class="zone-label">North Delhi Service Zone</div>', className:'', iconSize:null }) }).addTo(map);

  // ---------- Marker Icons ----------
  function iconSvg(trade, highlighted, verified){
    const t = TRADES[trade];
    const badge = verified ? `<div class="marker-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><path d="M5 13l4 4L19 7"/></svg></div>` : '';
    return `<div class="kmarker ${highlighted ? 'highlighted' : ''}"><svg viewBox="0 0 24 24">${t.icon.replaceAll('CURR', t.color)}</svg>${badge}</div>`;
  }
  function buildIcon(trade, highlighted, verified){
    return L.divIcon({
      html: iconSvg(trade, highlighted, verified), className:'',
      iconSize: highlighted ? [42,42] : [30,30],
      iconAnchor: highlighted ? [21,21] : [15,15]
    });
  }

  // ---------- Trust & Verification Logic ----------
  function seededRand(seed){
    const x = Math.sin(seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  }
  function isVerified(a){
    if(a.pending) return false;
    return a.years > 6;
  }
  const REVIEW_POOL = {
    cobbler: [
      { n:"Priya S.", t:"Fixed my sandal strap in ten minutes and charged next to nothing." },
      { n:"Ankit R.", t:"Resoled a pair of office shoes I thought were done for. Good as new." },
      { n:"Sunita M.", t:"Quick, honest pricing, and he remembered me from the last visit." },
      { n:"Rahul B.", t:"Saved my favourite boots — wouldn't have found this place otherwise." },
      { n:"Kavita J.", t:"Went in expecting to buy new shoes, walked out with the old ones fixed." },
      { n:"Manoj T.", t:"Told me honestly the shoe wasn't worth repairing, saved me the money." }
    ],
    watch: [
      { n:"Rohan K.", t:"Brought in my father's old watch — he got it ticking again in a day." },
      { n:"Neha G.", t:"Fair price for a battery change, didn't try to upsell me." },
      { n:"Vikram S.", t:"Fixed a strap no showroom would even look at." },
      { n:"Anjali P.", t:"Same-day service and the watch runs better than before it broke." },
      { n:"Sameer D.", t:"Knows old mechanical watches better than most 'authorised' shops." },
      { n:"Divya N.", t:"Honest about what could and couldn't be repaired." }
    ],
    appliance: [
      { n:"Ritu A.", t:"My mixer's motor was gone, he rebuilt it for a fraction of a new one." },
      { n:"Sandeep V.", t:"Grinder jar cracked, he sourced a replacement part same day." },
      { n:"Pooja L.", t:"Fixed our iron in fifteen minutes flat, very fair rate." },
      { n:"Gaurav M.", t:"Diagnosed the fault over a call before I even brought it in." },
      { n:"Shalini R.", t:"Table fan works better now than when we first bought it." },
      { n:"Naveen C.", t:"Reliable — this is the third appliance he's fixed for our family." }
    ],
    locksmith: [
      { n:"Arjun B.", t:"Locked out at 10pm, he reached in twenty minutes." },
      { n:"Meera K.", t:"Cut a duplicate key on the spot, took less time than expected." },
      { n:"Tarun S.", t:"Repaired an old almirah lock instead of pushing me to replace it." },
      { n:"Fatima H.", t:"Reasonable price for a gate lock repair after the monsoon jammed it." },
      { n:"Yash P.", t:"Professional and quick, didn't ask any awkward questions either." },
      { n:"Bhavna D.", t:"Trustworthy — let him into the house without a second thought." }
    ]
  };
  function trustData(a, idx){
    const r1 = seededRand(idx * 7 + 1), r2 = seededRand(idx * 13 + 3), r3 = seededRand(idx * 23 + 5);
    const rating = a.avgRating !== undefined ? a.avgRating : Math.round((4.2 + r1 * 0.75) * 10) / 10;
    const reviewCount = a.totalRatings !== undefined ? a.totalRatings : 18 + Math.floor(r2 * 140) + a.years * 3;
    const jobsCompleted = Math.round(a.years * 40 + r3 * 220);
    const pool = REVIEW_POOL[a.trade];
    const i1 = idx % pool.length, i2 = (idx + 2) % pool.length;
    return { rating, reviewCount, jobsCompleted, verified: isVerified(a), reviews:[pool[i1], pool[i2]] };
  }
  function starsSvg(rating){
    const full = Math.round(rating);
    let out = '';
    for(let i=0;i<5;i++){
      const on = i < full;
      out += `<svg viewBox="0 0 24 24" fill="${on ? '#FFB800' : 'none'}" stroke="${on ? '#FFB800' : 'var(--ink-dim)'}" stroke-width="1.5"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.3l-5.9 3.2 1.2-6.5-4.8-4.6 6.6-.9z"/></svg>`;
    }
    return out;
  }

  const panel = document.getElementById('panel');
  const scrim = document.getElementById('scrim');
  const storyView = document.getElementById('storyView');
  const resultsView = document.getElementById('resultsView');

  let currentReference = { lat:28.6900, lng:77.2050, label:"central North Delhi" };

  function haversine(lat1, lng1, lat2, lng2){
    const R = 6371;
    const dLat = (lat2-lat1) * Math.PI/180;
    const dLng = (lng2-lng1) * Math.PI/180;
    const x = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
  }
  function formatDistance(km){
    return km < 1 ? `${Math.round(km*1000)} m` : `${km.toFixed(1)} km`;
  }

  function openPanel(){ panel.classList.add('open'); scrim.classList.add('open'); }
  function closePanel(){ panel.classList.remove('open'); scrim.classList.remove('open'); resetHighlights(); }
  document.getElementById('panelClose').addEventListener('click', closePanel);
  scrim.addEventListener('click', closePanel);

  let currentArtisan = null;
  let currentArtisanIdx = null;

  function showStory(a, idx){
    storyView.style.display = 'block';
    resultsView.style.display = 'none';
    currentArtisan = a;
    currentArtisanIdx = idx;
    const t = TRADES[a.trade];
    const td = trustData(a, idx);
    document.getElementById('ticketNo').textContent = `${t18n('ticketNoLabel')} ${String(idx+1).padStart(3,'0')}`;
    document.getElementById('artisanName').childNodes[0].nodeValue = a.name + ' ';
    const badge = document.getElementById('verifyBadge');
    badge.classList.toggle('pending', !td.verified);
    document.getElementById('verifyBadgeText').textContent = td.verified ? t18n('verifiedText') : t18n('pendingText');
    const tag = document.getElementById('tradeTag');
    tag.innerHTML = `<svg viewBox="0 0 24 24">${t.icon.replaceAll('CURR', t.color)}</svg> ${tradeLabel(a.trade)} · ${a.area}`;
    tag.style.background = t.dim;
    tag.style.color = t.color;
    document.getElementById('starsRow').innerHTML = starsSvg(td.rating);
    document.getElementById('ratingNum').textContent = td.rating.toFixed(1);
    document.getElementById('reviewCountText').textContent = `(${td.reviewCount} ${t18n('reviewsLabel')})`;
    const pill = document.getElementById('pricePill');
    pill.textContent = `${t18n('estLabel')} ${t.price}`;
    pill.title = t18n('priceTooltip');
    const dist = haversine(currentReference.lat, currentReference.lng, a.lat, a.lng);
    document.getElementById('proximityText').textContent = `${formatDistance(dist)} ${t18n('awayLabel')} · ${t18n('fromLabel')} ${currentReference.label}`;
    document.getElementById('chatAvatar').textContent = a.name.charAt(0);
    document.getElementById('chatAvatar').style.borderColor = t.color;
    document.getElementById('chatName').textContent = a.name;
    document.getElementById('storyText1').textContent = a.s1;
    document.getElementById('storyText2').textContent = a.s2;
    document.getElementById('statHours').textContent = a.hours.split('·')[0].trim();
    document.getElementById('statYears').textContent = a.years + ' ' + t18n('yrsLabel');
    document.getElementById('statJobs').textContent = td.jobsCompleted + '+';
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = td.reviews.map(r => `
      <div class="review-card">
        <div class="review-top"><span class="review-name">${r.n}</span><span class="stars">${starsSvg(td.rating)}</span></div>
        <div class="review-text">${r.t}</div>
      </div>`).join('');
    document.getElementById('whatsappPanel').href = `https://wa.me/${a.phone}?text=${encodeURIComponent('Hi ' + a.name + ', I found you on RepairLink and would like help with a repair.')}`;

    // Action button updates using the safe t18n helper
    const doneBtn = document.getElementById('markDoneBtn');
    const reportBtn = document.getElementById('reportBtn');
    doneBtn.disabled = false; reportBtn.disabled = false;
    doneBtn.classList.remove('confirmed'); reportBtn.classList.remove('confirmed');
    doneBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg><span data-i18n="markDone">' + t18n('markDone') + '</span>';
    reportBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/></svg><span data-i18n="reportIssue">' + t18n('reportIssue') + '</span>';

    openPanel();
  }

  function popupHtml(a){
    return `<b>${a.name}</b>${isVerified(a) ? ` <span style="color:#1F7A44">✓ ${t18n('verifiedText')}</span>` : ''}<br>${tradeLabel(a.trade)} · ${a.area}<br><span style="opacity:.7">${t18n('clickForStory')}</span>`;
  }

  const markers = [];
  ARTISANS.forEach((a, idx) => {
    const marker = L.marker([a.lat, a.lng], { icon: buildIcon(a.trade, false, isVerified(a)) }).addTo(map);
    marker.bindPopup(popupHtml(a));
    marker.on('click', () => showStory(a, idx));
    markers.push(marker);
  });

  function refreshMarkerPopups(){
    markers.forEach((m, i) => m.setPopupContent(popupHtml(ARTISANS[i])));
  }

  function resetHighlights(){ markers.forEach((m, i) => m.setIcon(buildIcon(ARTISANS[i].trade, false, isVerified(ARTISANS[i])))); }

  const bounds = L.latLngBounds(ARTISANS.map(a => [a.lat, a.lng]));
  map.fitBounds(bounds, { padding:[60,60] });

  let currentLocality = null;

  function renderResultsForLocality(loc){
    resetHighlights();

    const nearestByTrade = {};
    Object.keys(TRADES).forEach(trade => {
      let best = null, bestDist = Infinity, bestIdx = -1;
      ARTISANS.forEach((a, idx) => {
        if(a.trade !== trade) return;
        const d = haversine(loc.lat, loc.lng, a.lat, a.lng);
        if(d < bestDist){ bestDist = d; best = a; bestIdx = idx; }
      });
      if(best) nearestByTrade[trade] = { artisan:best, dist:bestDist, idx:bestIdx };
    });

    document.getElementById('resultsLocality').textContent = `${t18n('nearestTo')} ${loc.name}`;
    const list = document.getElementById('resultsList');
    list.innerHTML = '';
    Object.entries(nearestByTrade).forEach(([trade, info]) => {
      const t = TRADES[trade];
      const card = document.createElement('div');
      card.className = 'result-card';
      card.innerHTML = `
        <div class="result-top">
          <div class="result-name">${info.artisan.name}</div>
          <div class="result-dist">${formatDistance(info.dist)} ${t18n('awayLabel')}</div>
        </div>
        <div class="result-trade" style="background:${t.dim}; color:${t.color}">
          <svg viewBox="0 0 24 24">${t.icon.replaceAll('CURR', t.color)}</svg> ${tradeLabel(trade)}
        </div>
        <div class="result-area">${info.artisan.area}</div>`;
      card.addEventListener('click', () => showStory(info.artisan, info.idx));
      list.appendChild(card);
      markers[info.idx].setIcon(buildIcon(trade, true, isVerified(info.artisan)));
    });
  }

  document.getElementById('locateBtn').addEventListener('click', () => {
    const name = localitySelect.value;
    if(!name){ localitySelect.focus(); return; }
    const loc = LOCALITIES.find(l => l.name === name);
    currentReference = { lat:loc.lat, lng:loc.lng, label:loc.name };
    currentLocality = loc;
    renderResultsForLocality(loc);

    storyView.style.display = 'none';
    resultsView.style.display = 'block';
    openPanel();
    map.flyTo([loc.lat, loc.lng], 14, { duration: 0.9 });
  });

  document.getElementById('heroClose').addEventListener('click', () => {
    document.getElementById('heroScrim').classList.add('closed');
  });

  // ---------- Role Selector & Onboarding Logic ----------
  const roleScrim = document.getElementById('roleScrim');
  const roleCustomer = document.getElementById('roleCustomer');
  const roleArtisan = document.getElementById('roleArtisan');

  roleCustomer.addEventListener('click', () => {
    roleScrim.classList.add('closed');
  });

  roleArtisan.addEventListener('click', () => {
    window.location.href = 'Auth.html';
  });

  // Toast logic
  function showToast(msg) {
    const toast = document.getElementById('mockToast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  document.getElementById('markDoneBtn').addEventListener('click', function() {
    this.classList.add('confirmed');
    showToast(t18n('toastDone'));
  });

  document.getElementById('reportBtn').addEventListener('click', function() {
    this.classList.add('confirmed');
    showToast(t18n('toastReport'));
  });

  // ---------- Booking Logic (Firestore) ----------
  const bookPickupBtn = document.getElementById('bookPickupBtn');
  const bookingModal = document.getElementById('bookingModal');
  const confirmBookingBtn = document.getElementById('confirmBookingBtn');

  if (bookPickupBtn) {
    bookPickupBtn.addEventListener('click', () => {
      if (!windowCurrentUser) {
        showToast("Please log in to book a pickup!");
        setTimeout(() => window.location.href = 'Auth.html', 1500);
        return;
      }
      bookingModal.style.display = 'flex';
    });
  }

  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener('click', async () => {
      const item = document.getElementById('bookingItem').value;
      const addr = document.getElementById('bookingAddress').value;
      
      if (!item || !addr) {
        showToast("Please fill in what needs fixing and your address.");
        return;
      }
      
      if (!windowCurrentUser || !currentArtisan) {
        showToast("Error: Missing user or artisan info.");
        return;
      }

      confirmBookingBtn.disabled = true;
      confirmBookingBtn.innerHTML = "Booking...";

      try {
        await addDoc(collection(db, "orders"), {
          item: item,
          address: addr,
          customerId: windowCurrentUser.uid,
          kaarigarId: currentArtisan.id || currentArtisan.name,
          kaarigarName: currentArtisan.name,
          status: "pending",
          createdAt: new Date()
        });

        bookingModal.style.display = 'none';
        showToast("Booking Confirmed! Our delivery partner will contact you shortly.");
        document.getElementById('bookingItem').value = '';
        document.getElementById('bookingAddress').value = '';
      } catch (err) {
        console.error("Booking failed:", err);
        showToast("Failed to confirm booking.");
      } finally {
        confirmBookingBtn.disabled = false;
        confirmBookingBtn.innerHTML = "<span style=\"font-weight:600; text-align:center; width:100%;\">Confirm Pickup</span>";
      }
    });
  }

  // ---------- Language Toggle Wiring ----------
  function applyTranslations(){
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t18n(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t18n(el.getAttribute('data-i18n-placeholder'));
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    // Re-render dynamic content built from JS templates, which data-i18n can't reach.
    refreshLegendPrices();
    refreshMarkerPopups();
    const panelWasOpen = panel.classList.contains('open');
    if(currentArtisan !== null && storyView.style.display !== 'none'){
      showStory(currentArtisan, currentArtisanIdx);
    } else if(currentLocality){
      renderResultsForLocality(currentLocality);
    }
    if(!panelWasOpen){ closePanel(); }
  }

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentLang = btn.dataset.lang;
        applyTranslations();
      });
    });
  } // end of initApp

  // Fetch data from Firestore
  async function loadData() {
    try {
      const kaarigarsCol = collection(db, 'kaarigars');
      const snapshot = await getDocs(kaarigarsCol);
      if (snapshot.size < 24) {
        console.log("Firestore data is incomplete. Uploading mock data...");
        // Seed the database
        for (let i = 0; i < ARTISANS.length; i++) {
          const artisan = ARTISANS[i];
          await setDoc(doc(db, 'kaarigars', `kaarigar-${i}`), artisan);
        }
        console.log("Mock data uploaded successfully.");
        // ARTISANS array is already full of the local mock data, so we proceed.
      } else {
        // We have data in Firestore!
        const fetchedData = [];
        snapshot.forEach(doc => {
          fetchedData.push(doc.data());
        });
        ARTISANS = fetchedData;
        console.log("Fetched from Firestore:", ARTISANS);
      }
      initApp();
    } catch(err) {
      console.error("Firestore fetch error, using fallback data", err);
      initApp();
    }
  }

  loadData();