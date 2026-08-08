import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, doc, addDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

import { firebaseConfig } from './env.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

window.windowUserRole = null;
let windowCurrentUser = null;
onAuthStateChanged(auth, async (user) => {
  const navLogin = document.getElementById('navLogin');
  const navLogout = document.getElementById('navLogout');
  
  if (user) {
    windowCurrentUser = user;
    if(navLogin) navLogin.style.display = 'none';
    if(navLogout) navLogout.style.display = 'flex';
    
    // Check role and inject links
    try {
      const { getDoc, doc } = await import("https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js");
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if(userDoc.exists()) {
        const role = userDoc.data().role;
        window.windowUserRole = role;
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
      disclaimer: "Prototype demo - names, phone numbers, ratings & reviews shown here are placeholder data, not real people.",
      roleTitle: "Welcome to RepairLink",
      roleSub: "Tell us who you are, so we can show you the right screen.",
      roleCustomerTitle: "I need something repaired",
      roleCustomerDesc: "Find a trusted kaarigar near you - cobbler, watch repairer, appliance technician or locksmith.",
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
      fieldId: "ID for verification (mock - nothing is uploaded in this prototype)",
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
      heroP1: "We provide repair links to you, so that your daily needs can be fulfilled without turning them into waste. We connect you to the nearest kaarigar - cobbler, watch repairer, appliance technician or locksmith - who can fix what you already own.",
      heroP2: "Anything that truly cannot be repaired, we collect ourselves and send for recycling, so it reduces waste piling up in Delhi.",
      heroRegion: "Currently live only in North Delhi",
      heroBtnText: "Explore the map",
      brandTagline: "Mapping North Delhi's kaarigars - repair first, recycle what's left",
      legendTitle: "Services We Provide",
      legendSub: "Tap a symbol on the map to meet the kaarigar",
      legendCobblerName: "Cobblers",
      legendCobblerDesc: "- shoe & leather repair",
      legendWatchName: "Watch repairers",
      legendWatchDesc: "- horologists",
      legendApplianceName: "Appliance repair",
      legendApplianceDesc: "- mixers & grinders",
      legendLocksmithName: "Locksmiths",
      legendLocksmithDesc: "- keys & locks",
      chatCtaText: "Chat with a RepairLink helper",
      locateEyebrow: "Find your nearest kaarigar",
      locateHeading: "Select your location and we'll show you the closest artisan of each trade - in no time.",
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
      priceTooltip: "Estimated range only - confirm the final price with the kaarigar directly.",
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
      disclaimer: "प्रोटोटाइप डेमो - यहाँ दिखाए गए नाम, फोन नंबर, रेटिंग और समीक्षाएं केवल उदाहरण के लिए हैं, असली लोग नहीं।",
      roleTitle: "RepairLink में आपका स्वागत है",
      roleSub: "हमें बताएं कि आप कौन हैं, ताकि हम आपको सही स्क्रीन दिखा सकें।",
      roleCustomerTitle: "मुझे कुछ ठीक करवाना है",
      roleCustomerDesc: "अपने पास भरोसेमंद कारीगर खोजें - मोची, घड़ी मरम्मत करने वाला, उपकरण तकनीशियन या ताला बनाने वाला।",
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
      fieldId: "सत्यापन के लिए पहचान पत्र (नकली - इस प्रोटोटाइप में कुछ भी अपलोड नहीं होता)",
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
      heroP1: "हम आपको मरम्मत के संपर्क उपलब्ध कराते हैं, ताकि आपकी रोज़मर्रा की ज़रूरतें बिना कचरा बढ़ाए पूरी हो सकें। हम आपको सबसे नज़दीकी कारीगर - मोची, घड़ी मरम्मत करने वाला, उपकरण तकनीशियन या ताला बनाने वाला - से जोड़ते हैं जो आपकी पहले से मौजूद चीज़ को ठीक कर सके।",
      heroP2: "जो चीज़ सच में मरम्मत के लायक नहीं होती, उसे हम खुद इकट्ठा करके रीसाइक्लिंग के लिए भेजते हैं, ताकि दिल्ली में कचरा कम जमा हो।",
      heroRegion: "फिलहाल केवल उत्तरी दिल्ली में उपलब्ध",
      heroBtnText: "मैप देखें",
      brandTagline: "उत्तरी दिल्ली के कारीगरों की मैपिंग - पहले मरम्मत, फिर जो बचे उसे रीसाइकल",
      legendTitle: "हमारी सेवाएं",
      legendSub: "कारीगर से मिलने के लिए मैप पर एक चिह्न टैप करें",
      legendCobblerName: "मोची",
      legendCobblerDesc: "- जूते और चमड़े की मरम्मत",
      legendWatchName: "घड़ी मरम्मत करने वाले",
      legendWatchDesc: "- घड़ीसाज़",
      legendApplianceName: "उपकरण मरम्मत",
      legendApplianceDesc: "- मिक्सर और ग्राइंडर",
      legendLocksmithName: "ताला बनाने वाले",
      legendLocksmithDesc: "- चाबी और ताले",
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
      priceTooltip: "केवल अनुमानित सीमा - अंतिम मूल्य की पुष्टि सीधे कारीगर से करें।",
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

  // Escapes live Firestore kaarigar data (name, area, etc.) before it's templated into
  // innerHTML/Leaflet popups. This data is visible and editable to any authenticated
  // kaarigar account, and is rendered to every site visitor pre-auth — without this,
  // a malicious "area" or "name" field would execute as script for anyone who loads the map.
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

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

  // Populated from Firestore in loadData() below - no local mock data.
  let ARTISANS = [];

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

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom:17, minZoom:10, updateWhenZooming:false, keepBuffer:2
  }).addTo(map);

  const NORTH_DELHI_ZONE = [
    [28.865,77.078],[28.885,77.128],[28.868,77.188],[28.805,77.228],
    [28.735,77.238],[28.700,77.243],[28.665,77.238],[28.652,77.213],
    [28.650,77.200],[28.657,77.184],[28.672,77.174],[28.690,77.176],
    [28.700,77.170],[28.712,77.165],[28.740,77.152],[28.780,77.132],
    [28.822,77.108],[28.865,77.078]
  ];

  // Create an inverted polygon to dim everything OUTSIDE North Delhi
  const worldBounds = [
    [-90, -180], [90, -180], [90, 180], [-90, 180]
  ];
  L.polygon([worldBounds, NORTH_DELHI_ZONE], {
    color: '#D89100', // Outline for North Delhi
    weight: 2,
    opacity: 0.9,
    dashArray: '8 6',
    fillColor: '#221D14', // Dim color for outside
    fillOpacity: 0.35,
    interactive: false
  }).addTo(map);

  L.marker([28.822, 77.10], { icon: L.divIcon({ html:'<div class="zone-label" style="background:#fff; padding:4px 8px; border-radius:4px; box-shadow:0 2px 8px rgba(0,0,0,0.1); font-weight:bold; font-size:12px; color:#D89100; border:1px solid #D89100;">North Delhi Zone</div>', className:'', iconSize:null }) }).addTo(map);

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
    return a.verified === true;
  }
  const REVIEW_POOL = {
    cobbler: [
      { n:"Priya S.", t:"Fixed my sandal strap in ten minutes and charged next to nothing." },
      { n:"Ankit R.", t:"Resoled a pair of office shoes I thought were done for. Good as new." },
      { n:"Sunita M.", t:"Quick, honest pricing, and he remembered me from the last visit." },
      { n:"Rahul B.", t:"Saved my favourite boots - wouldn't have found this place otherwise." },
      { n:"Kavita J.", t:"Went in expecting to buy new shoes, walked out with the old ones fixed." },
      { n:"Manoj T.", t:"Told me honestly the shoe wasn't worth repairing, saved me the money." }
    ],
    watch: [
      { n:"Rohan K.", t:"Brought in my father's old watch - he got it ticking again in a day." },
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
      { n:"Naveen C.", t:"Reliable - this is the third appliance he's fixed for our family." }
    ],
    locksmith: [
      { n:"Arjun B.", t:"Locked out at 10pm, he reached in twenty minutes." },
      { n:"Meera K.", t:"Cut a duplicate key on the spot, took less time than expected." },
      { n:"Tarun S.", t:"Repaired an old almirah lock instead of pushing me to replace it." },
      { n:"Fatima H.", t:"Reasonable price for a gate lock repair after the monsoon jammed it." },
      { n:"Yash P.", t:"Professional and quick, didn't ask any awkward questions either." },
      { n:"Bhavna D.", t:"Trustworthy - let him into the house without a second thought." }
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
    tag.innerHTML = `<svg viewBox="0 0 24 24">${t.icon.replaceAll('CURR', t.color)}</svg> ${tradeLabel(a.trade)} · ${escapeHtml(a.area)}`;
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
    const proximityBar = document.querySelector('.proximity-bar');
    const whatsappPanel = document.getElementById('whatsappPanel');
    const isAdmin = (window.windowUserRole === 'admin');
    
    if (!isAdmin) {
      whatsappPanel.style.filter = 'blur(5px)';
      whatsappPanel.style.opacity = '0.6';
      whatsappPanel.style.pointerEvents = 'none';
      whatsappPanel.style.userSelect = 'none';
      whatsappPanel.href = '#';
      whatsappPanel.onclick = (e) => { e.preventDefault(); };
    } else {
      whatsappPanel.style.filter = 'none';
      whatsappPanel.style.opacity = '1';
      whatsappPanel.style.pointerEvents = 'auto';
      whatsappPanel.style.userSelect = 'auto';
      whatsappPanel.target = "_blank";
      whatsappPanel.rel = "noopener";
      whatsappPanel.href = `https://wa.me/${a.phone}?text=${encodeURIComponent('Hi ' + a.name + ', I found you on RepairLink and would like help with a repair.')}`;
      whatsappPanel.onclick = null;
    }

    // Action button updates using the safe t18n helper
    const doneBtn = document.getElementById('markDoneBtn');
    const reportBtn = document.getElementById('reportBtn');
    doneBtn.disabled = false; reportBtn.disabled = false;

    openPanel();
  }

  window.openStory = function(idx) {
    if (ARTISANS[idx]) {
      showStory(ARTISANS[idx], idx);
    }
  };

  function popupHtml(a, idx){
    return `<div onclick="window.openStory(${idx})" style="cursor:pointer; display:block;"><b>${escapeHtml(a.name)}</b>${isVerified(a) ? ` <span style="color:#1F7A44">✓ ${t18n('verifiedText')}</span>` : ''}<br>${tradeLabel(a.trade)} · ${escapeHtml(a.area)}<br><span style="opacity:.8; color:var(--primary, #007aff); font-weight:600; display:inline-block; margin-top:4px;">${t18n('clickForStory')}</span></div>`;
  }

  const markers = [];
  ARTISANS.forEach((a, idx) => {
    const marker = L.marker([a.lat, a.lng], { icon: buildIcon(a.trade, false, isVerified(a)) }).addTo(map);
    marker.bindPopup(popupHtml(a, idx));
    marker.on('click', () => showStory(a, idx));
    markers.push(marker);
  });

  function refreshMarkerPopups(){
    markers.forEach((m, i) => m.setPopupContent(popupHtml(ARTISANS[i], i)));
  }

  function resetHighlights(){ markers.forEach((m, i) => m.setIcon(buildIcon(ARTISANS[i].trade, false, isVerified(ARTISANS[i])))); }

  if (ARTISANS.length > 0) {
    const bounds = L.latLngBounds(ARTISANS.map(a => [a.lat, a.lng]));
    map.fitBounds(bounds, { padding:[60,60] });
  }

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
          <div class="result-name">${escapeHtml(info.artisan.name)}</div>
          <div class="result-dist">${formatDistance(info.dist)} ${t18n('awayLabel')}</div>
        </div>
        <div class="result-trade" style="background:${t.dim}; color:${t.color}">
          <svg viewBox="0 0 24 24">${t.icon.replaceAll('CURR', t.color)}</svg> ${tradeLabel(trade)}
        </div>
        <div class="result-area">${escapeHtml(info.artisan.area)}</div>`;
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

  const heroClose = document.getElementById('heroClose');
  if (heroClose) {
    heroClose.addEventListener('click', () => {
      document.getElementById('heroScrim').classList.add('closed');
      const returnBtn = document.getElementById('returnHomeBtn');
      const premiumBox = document.querySelector('.premium-float');
      if(returnBtn) returnBtn.style.display = 'flex';
      if(premiumBox) premiumBox.style.display = 'flex';
    });
  }

  // ---------- Role Selector & Onboarding Logic ----------
  const roleScrim = document.getElementById('roleScrim');
  const roleCustomer = document.getElementById('roleCustomer');
  const roleArtisan = document.getElementById('roleArtisan');

  if (roleCustomer) {
    roleCustomer.addEventListener('click', () => {
      roleScrim.classList.add('closed');
    });
  }
  if (roleArtisan) {
    roleArtisan.addEventListener('click', () => {
      window.location.href = 'Auth.html';
    });
  }

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

  // Fetch real kaarigar data from Firestore - no seeding, no mock fallback.
  async function loadData() {
    try {
      const kaarigarsCol = collection(db, 'kaarigars');
      const snapshot = await getDocs(kaarigarsCol);
      const fetchedData = [];
      snapshot.forEach(docSnap => {
        const d = docSnap.data();
        // Public site only ever gets the rounded, privacy-safe coordinate. approxLat/Lng is
        // the post-migration field; lat/lng is a fallback for any not-yet-migrated docs so
        // the map doesn't silently break mid-rollout — exact coordinates never reach this file.
        const lat = d.approxLat ?? d.lat;
        const lng = d.approxLng ?? d.lng;
        fetchedData.push({ id: docSnap.id, ...d, lat, lng });
      });
      ARTISANS = fetchedData;
      console.log(`Loaded ${ARTISANS.length} kaarigars from Firestore.`);
    } catch(err) {
      console.error("Firestore fetch error - showing an empty map.", err);
      ARTISANS = [];
    }
    initApp();
  }

  loadData();