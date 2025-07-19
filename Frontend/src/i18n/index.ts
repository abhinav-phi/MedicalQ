import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { footerTranslations } from './translations/footer';

// Translation resources
const resources = {
  en: {
    translation: {
      ...footerTranslations.en,
      // Header
      header: {
        tagline: 'Smart Health Starts Here',
        searchPlaceholder: 'Search doctors, departments, services...',
        emergency: 'Emergency',
        communities: 'Communities',
        profile: 'Profile',
        settings: 'Settings',
        help: 'Help',
        privacy: 'Privacy',
        signOut: 'Sign out',
        signIn: 'Sign In',
        getStarted: 'Get Started',
        user: 'Patient',
        doctor: 'Doctor',
        admin: 'Admin'
      },
      
      // Hero Section
      hero: {
        smart: 'Smart',
        health: 'Health',
        starts: 'Starts',
        here: 'Here',
        subtitle: 'A Modern Hub for Reliable Medical Knowledge, Powered by Doctors & AI',
        bookAppointment: 'Book Appointment',
        virtualTour: 'Virtual Tour'
      },
      
      // Authentication
      auth: {
        welcomeBack: 'Welcome back',
        joinMedicalQ: 'Join MedicalQ',
        signInToAccount: 'Sign in to your account',
        createAccount: 'Create your account to get started',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        email: 'Email',
        password: 'Password',
        enterEmail: 'Enter your email',
        enterPassword: 'Enter your password',
        signingIn: 'Signing in...',
        creatingAccount: 'Creating account...',
        iAmA: 'I am a'
      },
      
      // Booking
      booking: {
        bookAppointment: 'Book Appointment',
        with: 'with',
        appointmentDetails: 'Appointment Details',
        appointmentType: 'Appointment Type',
        consultation: 'Consultation',
        followUp: 'Follow-up',
        emergency: 'Emergency',
        preferredDate: 'Preferred Date',
        preferredTime: 'Preferred Time',
        selectTime: 'Select time',
        preferredLanguage: 'Preferred Language',
        reasonForVisit: 'Reason for Visit',
        reasonPlaceholder: 'Please describe your symptoms or reason for the visit...',
        symptoms: 'Current Symptoms',
        symptomsPlaceholder: 'Describe any symptoms you are experiencing...',
        personalInformation: 'Personal Information',
        fullName: 'Full Name',
        phoneNumber: 'Phone Number',
        emailAddress: 'Email Address',
        emergencyContact: 'Emergency Contact',
        medicalHistory: 'Medical History',
        medicalHistoryPlaceholder: 'Any previous medical conditions, surgeries, or allergies...',
        currentMedications: 'Current Medications',
        medicationsPlaceholder: 'List any medications you are currently taking...',
        insuranceAndPayment: 'Insurance & Payment',
        insuranceProvider: 'Insurance Provider',
        insuranceProviderPlaceholder: 'e.g., HDFC ERGO, Star Health',
        insuranceNumber: 'Insurance Number',
        insuranceNumberPlaceholder: 'Your insurance policy number',
        specialRequests: 'Special Requests',
        specialRequestsPlaceholder: 'Any special accommodations or requests...',
        appointmentSummary: 'Appointment Summary',
        doctor: 'Doctor',
        type: 'Type',
        date: 'Date',
        time: 'Time',
        estimatedCost: 'Estimated Cost',
        previous: 'Previous',
        next: 'Next',
        cancel: 'Cancel',
        confirmBooking: 'Confirm Booking',
        booking: 'Booking...',
        loginRequired: 'Please login to book an appointment',
        appointmentBooked: 'Appointment booked successfully!',
        bookingFailed: 'Failed to book appointment',
        bookingError: 'An error occurred while booking'
      },
      
      // Virtual Tour
      tour: {
        title: 'MedicalQ Virtual Tour',
        subtitle: 'Explore our platform and discover how we can help you',
        share: 'Share',
        openInNewTab: 'Open in new tab',
        loading: 'Loading virtual tour...',
        aboutTitle: 'About This Tour',
        aboutDescription: 'Take a comprehensive tour of MedicalQ platform and learn how our innovative features can help you manage your health better.',
        featuresTitle: 'What You\'ll See',
        feature1: 'Doctor consultation interface',
        feature2: 'Community platform features',
        feature3: 'Appointment booking system',
        feature4: 'Health tracking tools',
        watchFullVideo: 'Watch Full Video',
        getStarted: 'Get Started'
      },
      
      // Community
      community: {
        title: 'Medical Community',
        subtitle: 'Connect with patients and healthcare professionals worldwide',
        searchPlaceholder: 'Search communities, posts, or topics...',
        allCommunities: 'All Communities',
        communities: 'Communities',
        trending: 'Trending',
        recent: 'Recent',
        popular: 'Popular',
        createPost: 'Create Post',
        members: 'members',
        online: 'online',
        daysAgo: 'days ago',
        hoursAgo: 'hours ago',
        justNow: 'just now',
        doctor: 'Doctor',
        patient: 'Patient',
        share: 'Share',
        createNewPost: 'Create New Post',
        postTitle: 'Post Title',
        postTitlePlaceholder: 'What would you like to discuss?',
        community: 'Community',
        selectCommunity: 'Select a community',
        content: 'Content',
        contentPlaceholder: 'Share your thoughts, experiences, or questions...',
        tags: 'Tags',
        tagsPlaceholder: 'e.g., diabetes, heart, recovery (comma separated)',
        publishPost: 'Publish Post',
        loginRequired: 'Please login to create a post',
        fillRequired: 'Please fill in the title and content',
        
        // Community names
        cardiology: 'Cardiology',
        cardiologyDesc: 'Heart health and cardiac care discussions',
        neurology: 'Neurology',
        neurologyDesc: 'Brain health and neurological conditions',
        orthopedics: 'Orthopedics',
        orthopedicsDesc: 'Bone, joint, and muscle health',
        diabetes: 'Diabetes Care',
        diabetesDesc: 'Blood sugar management and lifestyle',
        pediatrics: 'Pediatrics',
        pediatricsDesc: 'Child health and development',
        mentalHealth: 'Mental Health',
        mentalHealthDesc: 'Mental wellness and support'
      },
      
      // Search
      search: {
        placeholder: 'Search doctors, departments, services...',
        searching: 'Searching...',
        results: 'Search Results',
        noResults: 'No results found',
        tryDifferent: 'Try searching with different keywords',
        recent: 'Recent Searches',
        clearAll: 'Clear All',
        trending: 'Trending Searches'
      }
    }
  },
  
  hi: {
    translation: {
      ...footerTranslations.hi,
      // Header
      header: {
        tagline: 'स्मार्ट स्वास्थ्य यहाँ शुरू होता है',
        searchPlaceholder: 'डॉक्टर, विभाग, सेवाएं खोजें...',
        emergency: 'आपातकाल',
        communities: 'समुदाय',
        profile: 'प्रोफ़ाइल',
        settings: 'सेटिंग्स',
        help: 'सहायता',
        privacy: 'गोपनीयता',
        signOut: 'साइन आउट',
        signIn: 'साइन इन',
        getStarted: 'शुरू करें',
        user: 'मरीज़',
        doctor: 'डॉक्टर',
        admin: 'व्यवस्थापक'
      },
      
      // Hero Section
      hero: {
        smart: 'स्मार्ट',
        health: 'स्वास्थ्य',
        starts: 'शुरू',
        here: 'यहाँ',
        subtitle: 'विश्वसनीय चिकित्सा ज्ञान के लिए एक आधुनिक केंद्र, डॉक्टरों और AI द्वारा संचालित',
        bookAppointment: 'अपॉइंटमेंट बुक करें',
        virtualTour: 'वर्चुअल टूर'
      },
      
      // Authentication
      auth: {
        welcomeBack: 'वापस स्वागत है',
        joinMedicalQ: 'MedicalQ में शामिल हों',
        signInToAccount: 'अपने खाते में साइन इन करें',
        createAccount: 'शुरू करने के लिए अपना खाता बनाएं',
        signIn: 'साइन इन',
        signUp: 'साइन अप',
        email: 'ईमेल',
        password: 'पासवर्ड',
        enterEmail: 'अपना ईमेल दर्ज करें',
        enterPassword: 'अपना पासवर्ड दर्ज करें',
        signingIn: 'साइन इन हो रहा है...',
        creatingAccount: 'खाता बनाया जा रहा है...',
        iAmA: 'मैं हूँ'
      },
      
      // Booking
      booking: {
        bookAppointment: 'अपॉइंटमेंट बुक करें',
        with: 'के साथ',
        appointmentDetails: 'अपॉइंटमेंट विवरण',
        appointmentType: 'अपॉइंटमेंट प्रकार',
        consultation: 'परामर्श',
        followUp: 'फॉलो-अप',
        emergency: 'आपातकाल',
        preferredDate: 'पसंदीदा तारीख',
        preferredTime: 'पसंदीदा समय',
        selectTime: 'समय चुनें',
        preferredLanguage: 'पसंदीदा भाषा',
        reasonForVisit: 'मुलाकात का कारण',
        reasonPlaceholder: 'कृपया अपने लक्षण या मुलाकात का कारण बताएं...',
        symptoms: 'वर्तमान लक्षण',
        symptomsPlaceholder: 'आप जो भी लक्षण महसूस कर रहे हैं उनका वर्णन करें...',
        personalInformation: 'व्यक्तिगत जानकारी',
        fullName: 'पूरा नाम',
        phoneNumber: 'फोन नंबर',
        emailAddress: 'ईमेल पता',
        emergencyContact: 'आपातकालीन संपर्क',
        medicalHistory: 'चिकित्सा इतिहास',
        medicalHistoryPlaceholder: 'कोई भी पिछली चिकित्सा स्थिति, सर्जरी, या एलर्जी...',
        currentMedications: 'वर्तमान दवाएं',
        medicationsPlaceholder: 'आप वर्तमान में जो भी दवाएं ले रहे हैं उन्हें सूचीबद्ध करें...',
        insuranceAndPayment: 'बीमा और भुगतान',
        insuranceProvider: 'बीमा प्रदाता',
        insuranceProviderPlaceholder: 'जैसे HDFC ERGO, Star Health',
        insuranceNumber: 'बीमा नंबर',
        insuranceNumberPlaceholder: 'आपका बीमा पॉलिसी नंबर',
        specialRequests: 'विशेष अनुरोध',
        specialRequestsPlaceholder: 'कोई विशेष सुविधा या अनुरोध...',
        appointmentSummary: 'अपॉइंटमेंट सारांश',
        doctor: 'डॉक्टर',
        type: 'प्रकार',
        date: 'तारीख',
        time: 'समय',
        estimatedCost: 'अनुमानित लागत',
        previous: 'पिछला',
        next: 'अगला',
        cancel: 'रद्द करें',
        confirmBooking: 'बुकिंग की पुष्टि करें',
        booking: 'बुकिंग हो रही है...',
        loginRequired: 'अपॉइंटमेंट बुक करने के लिए कृपया लॉगिन करें',
        appointmentBooked: 'अपॉइंटमेंट सफलतापूर्वक बुक हो गया!',
        bookingFailed: 'अपॉइंटमेंट बुक करने में विफल',
        bookingError: 'बुकिंग के दौरान एक त्रुटि हुई'
      },
      
      // Virtual Tour
      tour: {
        title: 'MedicalQ वर्चुअल टूर',
        subtitle: 'हमारे प्लेटफॉर्म का अन्वेषण करें और जानें कि हम आपकी कैसे मदद कर सकते हैं',
        share: 'साझा करें',
        openInNewTab: 'नए टैब में खोलें',
        loading: 'वर्चुअल टूर लोड हो रहा है...',
        aboutTitle: 'इस टूर के बारे में',
        aboutDescription: 'MedicalQ प्लेटफॉर्म का एक व्यापक दौरा करें और जानें कि हमारी नवाचार सुविधाएं आपके स्वास्थ्य को बेहतर तरीके से प्रबंधित करने में कैसे मदद कर सकती हैं।',
        featuresTitle: 'आप क्या देखेंगे',
        feature1: 'डॉक्टर परामर्श इंटरफेस',
        feature2: 'समुदाय प्लेटफॉर्म सुविधाएं',
        feature3: 'अपॉइंटमेंट बुकिंग सिस्टम',
        feature4: 'स्वास्थ्य ट्रैकिंग उपकरण',
        watchFullVideo: 'पूरा वीडियो देखें',
        getStarted: 'शुरू करें'
      },
      
      // Community
      community: {
        title: 'चिकित्सा समुदाय',
        subtitle: 'दुनिया भर के मरीजों और स्वास्थ्य पेशेवरों से जुड़ें',
        searchPlaceholder: 'समुदाय, पोस्ट, या विषय खोजें...',
        allCommunities: 'सभी समुदाय',
        communities: 'समुदाय',
        trending: 'ट्रेंडिंग',
        recent: 'हाल ही में',
        popular: 'लोकप्रिय',
        createPost: 'पोस्ट बनाएं',
        members: 'सदस्य',
        online: 'ऑनलाइन',
        daysAgo: 'दिन पहले',
        hoursAgo: 'घंटे पहले',
        justNow: 'अभी',
        doctor: 'डॉक्टर',
        patient: 'मरीज़',
        share: 'साझा करें',
        createNewPost: 'नई पोस्ट बनाएं',
        postTitle: 'पोस्ट शीर्षक',
        postTitlePlaceholder: 'आप किस बारे में चर्चा करना चाहते हैं?',
        community: 'समुदाय',
        selectCommunity: 'एक समुदाय चुनें',
        content: 'सामग्री',
        contentPlaceholder: 'अपने विचार, अनुभव, या प्रश्न साझा करें...',
        tags: 'टैग',
        tagsPlaceholder: 'जैसे मधुमेह, हृदय, रिकवरी (कॉमा से अलग)',
        publishPost: 'पोस्ट प्रकाशित करें',
        loginRequired: 'पोस्ट बनाने के लिए कृपया लॉगिन करें',
        fillRequired: 'कृपया शीर्षक और सामग्री भरें',
        
        // Community names
        cardiology: 'हृदय रोग विज्ञान',
        cardiologyDesc: 'हृदय स्वास्थ्य और हृदय देखभाल चर्चा',
        neurology: 'न्यूरोलॉजी',
        neurologyDesc: 'मस्तिष्क स्वास्थ्य और न्यूरोलॉजिकल स्थितियां',
        orthopedics: 'आर्थोपेडिक्स',
        orthopedicsDesc: 'हड्डी, जोड़ और मांसपेशी स्वास्थ्य',
        diabetes: 'मधुमेह देखभाल',
        diabetesDesc: 'रक्त शर्करा प्रबंधन और जीवनशैली',
        pediatrics: 'बाल चिकित्सा',
        pediatricsDesc: 'बच्चों का स्वास्थ्य और विकास',
        mentalHealth: 'मानसिक स्वास्थ्य',
        mentalHealthDesc: 'मानसिक कल्याण और सहायता'
      },
      
      // Search
      search: {
        placeholder: 'डॉक्टर, विभाग, सेवाएं खोजें...',
        searching: 'खोजा जा रहा है...',
        results: 'खोज परिणाम',
        noResults: 'कोई परिणाम नहीं मिला',
        tryDifferent: 'अलग कीवर्ड के साथ खोजने का प्रयास करें',
        recent: 'हाल की खोजें',
        clearAll: 'सभी साफ़ करें',
        trending: 'ट्रेंडिंग खोजें'
      }
    }
  },
  
  pa: {
    translation: {
      ...footerTranslations.pa,
      // Header
      header: {
        tagline: 'ਸਮਾਰਟ ਸਿਹਤ ਇੱਥੇ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ',
        searchPlaceholder: 'ਡਾਕਟਰ, ਵਿਭਾਗ, ਸੇਵਾਵਾਂ ਖੋਜੋ...',
        emergency: 'ਐਮਰਜੈਂਸੀ',
        communities: 'ਕਮਿਊਨਿਟੀਆਂ',
        profile: 'ਪ੍ਰੋਫਾਈਲ',
        settings: 'ਸੈਟਿੰਗਾਂ',
        help: 'ਮਦਦ',
        privacy: 'ਗੁਪਤਤਾ',
        signOut: 'ਸਾਈਨ ਆਊਟ',
        signIn: 'ਸਾਈਨ ਇਨ',
        getStarted: 'ਸ਼ੁਰੂ ਕਰੋ',
        user: 'ਮਰੀਜ਼',
        doctor: 'ਡਾਕਟਰ',
        admin: 'ਪ੍ਰਬੰਧਕ'
      },
      
      // Hero Section
      hero: {
        smart: 'ਸਮਾਰਟ',
        health: 'ਸਿਹਤ',
        starts: 'ਸ਼ੁਰੂ',
        here: 'ਇੱਥੇ',
        subtitle: 'ਭਰੋਸੇਮੰਦ ਮੈਡੀਕਲ ਗਿਆਨ ਲਈ ਇੱਕ ਆਧੁਨਿਕ ਕੇਂਦਰ, ਡਾਕਟਰਾਂ ਅਤੇ AI ਦੁਆਰਾ ਸੰਚਾਲਿਤ',
        bookAppointment: 'ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ',
        virtualTour: 'ਵਰਚੁਅਲ ਟੂਰ'
      },
      
      // Authentication
      auth: {
        welcomeBack: 'ਵਾਪਸ ਜੀ ਆਇਆਂ ਨੂੰ',
        joinMedicalQ: 'MedicalQ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
        signInToAccount: 'ਆਪਣੇ ਖਾਤੇ ਵਿੱਚ ਸਾਈਨ ਇਨ ਕਰੋ',
        createAccount: 'ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਆਪਣਾ ਖਾਤਾ ਬਣਾਓ',
        signIn: 'ਸਾਈਨ ਇਨ',
        signUp: 'ਸਾਈਨ ਅੱਪ',
        email: 'ਈਮੇਲ',
        password: 'ਪਾਸਵਰਡ',
        enterEmail: 'ਆਪਣਾ ਈਮੇਲ ਦਾਖਲ ਕਰੋ',
        enterPassword: 'ਆਪਣਾ ਪਾਸਵਰਡ ਦਾਖਲ ਕਰੋ',
        signingIn: 'ਸਾਈਨ ਇਨ ਹੋ ਰਿਹਾ ਹੈ...',
        creatingAccount: 'ਖਾਤਾ ਬਣਾਇਆ ਜਾ ਰਿਹਾ ਹੈ...',
        iAmA: 'ਮੈਂ ਹਾਂ'
      },
      
      // Booking
      booking: {
        bookAppointment: 'ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ',
        with: 'ਨਾਲ',
        appointmentDetails: 'ਅਪਾਇੰਟਮੈਂਟ ਵੇਰਵੇ',
        appointmentType: 'ਅਪਾਇੰਟਮੈਂਟ ਕਿਸਮ',
        consultation: 'ਸਲਾਹ',
        followUp: 'ਫਾਲੋ-ਅੱਪ',
        emergency: 'ਐਮਰਜੈਂਸੀ',
        preferredDate: 'ਪਸੰਦੀਦਾ ਤਾਰੀਖ',
        preferredTime: 'ਪਸੰਦੀਦਾ ਸਮਾਂ',
        selectTime: 'ਸਮਾਂ ਚੁਣੋ',
        preferredLanguage: 'ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ',
        reasonForVisit: 'ਮੁਲਾਕਾਤ ਦਾ ਕਾਰਨ',
        reasonPlaceholder: 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਲੱਛਣ ਜਾਂ ਮੁਲਾਕਾਤ ਦਾ ਕਾਰਨ ਦੱਸੋ...',
        symptoms: 'ਮੌਜੂਦਾ ਲੱਛਣ',
        symptomsPlaceholder: 'ਤੁਸੀਂ ਜੋ ਵੀ ਲੱਛਣ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ ਉਨ੍ਹਾਂ ਦਾ ਵਰਣਨ ਕਰੋ...',
        personalInformation: 'ਨਿੱਜੀ ਜਾਣਕਾਰੀ',
        fullName: 'ਪੂਰਾ ਨਾਮ',
        phoneNumber: 'ਫੋਨ ਨੰਬਰ',
        emailAddress: 'ਈਮੇਲ ਪਤਾ',
        emergencyContact: 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ',
        medicalHistory: 'ਮੈਡੀਕਲ ਇਤਿਹਾਸ',
        medicalHistoryPlaceholder: 'ਕੋਈ ਵੀ ਪਿਛਲੀ ਮੈਡੀਕਲ ਸਥਿਤੀ, ਸਰਜਰੀ, ਜਾਂ ਐਲਰਜੀ...',
        currentMedications: 'ਮੌਜੂਦਾ ਦਵਾਈਆਂ',
        medicationsPlaceholder: 'ਤੁਸੀਂ ਵਰਤਮਾਨ ਵਿੱਚ ਜੋ ਵੀ ਦਵਾਈਆਂ ਲੈ ਰਹੇ ਹੋ ਉਨ੍ਹਾਂ ਦੀ ਸੂਚੀ ਬਣਾਓ...',
        insuranceAndPayment: 'ਬੀਮਾ ਅਤੇ ਭੁਗਤਾਨ',
        insuranceProvider: 'ਬੀਮਾ ਪ੍ਰਦਾਤਾ',
        insuranceProviderPlaceholder: 'ਜਿਵੇਂ HDFC ERGO, Star Health',
        insuranceNumber: 'ਬੀਮਾ ਨੰਬਰ',
        insuranceNumberPlaceholder: 'ਤੁਹਾਡਾ ਬੀਮਾ ਪਾਲਿਸੀ ਨੰਬਰ',
        specialRequests: 'ਵਿਸ਼ੇਸ਼ ਬੇਨਤੀਆਂ',
        specialRequestsPlaceholder: 'ਕੋਈ ਵਿਸ਼ੇਸ਼ ਸਹੂਲਤ ਜਾਂ ਬੇਨਤੀ...',
        appointmentSummary: 'ਅਪਾਇੰਟਮੈਂਟ ਸਾਰ',
        doctor: 'ਡਾਕਟਰ',
        type: 'ਕਿਸਮ',
        date: 'ਤਾਰੀਖ',
        time: 'ਸਮਾਂ',
        estimatedCost: 'ਅਨੁਮਾਨਿਤ ਲਾਗਤ',
        previous: 'ਪਿਛਲਾ',
        next: 'ਅਗਲਾ',
        cancel: 'ਰੱਦ ਕਰੋ',
        confirmBooking: 'ਬੁਕਿੰਗ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
        booking: 'ਬੁਕਿੰਗ ਹੋ ਰਹੀ ਹੈ...',
        loginRequired: 'ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰਨ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਲਾਗਇਨ ਕਰੋ',
        appointmentBooked: 'ਅਪਾਇੰਟਮੈਂਟ ਸਫਲਤਾਪੂਰਵਕ ਬੁੱਕ ਹੋ ਗਈ!',
        bookingFailed: 'ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰਨ ਵਿੱਚ ਅਸਫਲ',
        bookingError: 'ਬੁਕਿੰਗ ਦੌਰਾਨ ਇੱਕ ਗਲਤੀ ਹੋਈ'
      },
      
      // Virtual Tour
      tour: {
        title: 'MedicalQ ਵਰਚੁਅਲ ਟੂਰ',
        subtitle: 'ਸਾਡੇ ਪਲੇਟਫਾਰਮ ਦੀ ਖੋਜ ਕਰੋ ਅਤੇ ਜਾਣੋ ਕਿ ਅਸੀਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ',
        share: 'ਸਾਂਝਾ ਕਰੋ',
        openInNewTab: 'ਨਵੀਂ ਟੈਬ ਵਿੱਚ ਖੋਲ੍ਹੋ',
        loading: 'ਵਰਚੁਅਲ ਟੂਰ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
        aboutTitle: 'ਇਸ ਟੂਰ ਬਾਰੇ',
        aboutDescription: 'MedicalQ ਪਲੇਟਫਾਰਮ ਦਾ ਇੱਕ ਵਿਆਪਕ ਦੌਰਾ ਕਰੋ ਅਤੇ ਜਾਣੋ ਕਿ ਸਾਡੀਆਂ ਨਵੀਨਤਾ ਸੁਵਿਧਾਵਾਂ ਤੁਹਾਡੀ ਸਿਹਤ ਨੂੰ ਬਿਹਤਰ ਤਰੀਕੇ ਨਾਲ ਪ੍ਰਬੰਧਿਤ ਕਰਨ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੀਆਂ ਹਨ।',
        featuresTitle: 'ਤੁਸੀਂ ਕੀ ਦੇਖੋਗੇ',
        feature1: 'ਡਾਕਟਰ ਸਲਾਹ ਇੰਟਰਫੇਸ',
        feature2: 'ਕਮਿਊਨਿਟੀ ਪਲੇਟਫਾਰਮ ਸੁਵਿਧਾਵਾਂ',
        feature3: 'ਅਪਾਇੰਟਮੈਂਟ ਬੁਕਿੰਗ ਸਿਸਟਮ',
        feature4: 'ਸਿਹਤ ਟਰੈਕਿੰਗ ਟੂਲਸ',
        watchFullVideo: 'ਪੂਰਾ ਵੀਡੀਓ ਦੇਖੋ',
        getStarted: 'ਸ਼ੁਰੂ ਕਰੋ'
      },
      
      // Community
      community: {
        title: 'ਮੈਡੀਕਲ ਕਮਿਊਨਿਟੀ',
        subtitle: 'ਦੁਨੀਆ ਭਰ ਦੇ ਮਰੀਜ਼ਾਂ ਅਤੇ ਸਿਹਤ ਪੇਸ਼ੇਵਰਾਂ ਨਾਲ ਜੁੜੋ',
        searchPlaceholder: 'ਕਮਿਊਨਿਟੀਆਂ, ਪੋਸਟਾਂ, ਜਾਂ ਵਿਸ਼ੇ ਖੋਜੋ...',
        allCommunities: 'ਸਾਰੀਆਂ ਕਮਿਊਨਿਟੀਆਂ',
        communities: 'ਕਮਿਊਨਿਟੀਆਂ',
        trending: 'ਟਰੈਂਡਿੰਗ',
        recent: 'ਹਾਲ ਹੀ ਵਿੱਚ',
        popular: 'ਪ੍ਰਸਿੱਧ',
        createPost: 'ਪੋਸਟ ਬਣਾਓ',
        members: 'ਮੈਂਬਰ',
        online: 'ਔਨਲਾਈਨ',
        daysAgo: 'ਦਿਨ ਪਹਿਲਾਂ',
        hoursAgo: 'ਘੰਟੇ ਪਹਿਲਾਂ',
        justNow: 'ਹੁਣੇ',
        doctor: 'ਡਾਕਟਰ',
        patient: 'ਮਰੀਜ਼',
        share: 'ਸਾਂਝਾ ਕਰੋ',
        createNewPost: 'ਨਵੀਂ ਪੋਸਟ ਬਣਾਓ',
        postTitle: 'ਪੋਸਟ ਸਿਰਲੇਖ',
        postTitlePlaceholder: 'ਤੁਸੀਂ ਕਿਸ ਬਾਰੇ ਚਰਚਾ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
        community: 'ਕਮਿਊਨਿਟੀ',
        selectCommunity: 'ਇੱਕ ਕਮਿਊਨਿਟੀ ਚੁਣੋ',
        content: 'ਸਮੱਗਰੀ',
        contentPlaceholder: 'ਆਪਣੇ ਵਿਚਾਰ, ਤਜਰਬੇ, ਜਾਂ ਸਵਾਲ ਸਾਂਝੇ ਕਰੋ...',
        tags: 'ਟੈਗ',
        tagsPlaceholder: 'ਜਿਵੇਂ ਸ਼ੂਗਰ, ਦਿਲ, ਰਿਕਵਰੀ (ਕਾਮੇ ਨਾਲ ਵੱਖ)',
        publishPost: 'ਪੋਸਟ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰੋ',
        loginRequired: 'ਪੋਸਟ ਬਣਾਉਣ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਲਾਗਇਨ ਕਰੋ',
        fillRequired: 'ਕਿਰਪਾ ਕਰਕੇ ਸਿਰਲੇਖ ਅਤੇ ਸਮੱਗਰੀ ਭਰੋ',
        
        // Community names
        cardiology: 'ਦਿਲ ਦੀ ਬਿਮਾਰੀ',
        cardiologyDesc: 'ਦਿਲ ਦੀ ਸਿਹਤ ਅਤੇ ਦਿਲ ਦੀ ਦੇਖਭਾਲ ਚਰਚਾ',
        neurology: 'ਨਿਊਰੋਲੋਜੀ',
        neurologyDesc: 'ਦਿਮਾਗ ਦੀ ਸਿਹਤ ਅਤੇ ਨਿਊਰੋਲੋਜੀਕਲ ਸਥਿਤੀਆਂ',
        orthopedics: 'ਹੱਡੀਆਂ ਦਾ ਇਲਾਜ',
        orthopedicsDesc: 'ਹੱਡੀ, ਜੋੜ ਅਤੇ ਮਾਸਪੇਸ਼ੀ ਦੀ ਸਿਹਤ',
        diabetes: 'ਸ਼ੂਗਰ ਦੀ ਦੇਖਭਾਲ',
        diabetesDesc: 'ਖੂਨ ਵਿੱਚ ਸ਼ੂਗਰ ਦਾ ਪ੍ਰਬੰਧਨ ਅਤੇ ਜੀਵਨਸ਼ੈਲੀ',
        pediatrics: 'ਬੱਚਿਆਂ ਦਾ ਇਲਾਜ',
        pediatricsDesc: 'ਬੱਚਿਆਂ ਦੀ ਸਿਹਤ ਅਤੇ ਵਿਕਾਸ',
        mentalHealth: 'ਮਾਨਸਿਕ ਸਿਹਤ',
        mentalHealthDesc: 'ਮਾਨਸਿਕ ਤੰਦਰੁਸਤੀ ਅਤੇ ਸਹਾਇਤਾ'
      },
      
      // Search
      search: {
        placeholder: 'ਡਾਕਟਰ, ਵਿਭਾਗ, ਸੇਵਾਵਾਂ ਖੋਜੋ...',
        searching: 'ਖੋਜ ਰਹੇ ਹਾਂ...',
        results: 'ਖੋਜ ਨਤੀਜੇ',
        noResults: 'ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ ਮਿਲਿਆ',
        tryDifferent: 'ਵੱਖਰੇ ਕੀਵਰਡਾਂ ਨਾਲ ਖੋਜਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ',
        recent: 'ਹਾਲ ਦੀਆਂ ਖੋਜਾਂ',
        clearAll: 'ਸਭ ਸਾਫ਼ ਕਰੋ',
        trending: 'ਟਰੈਂਡਿੰਗ ਖੋਜਾਂ'
      }
    }
  },
  
  ur: {
    translation: {
      ...footerTranslations.ur,
      // Header
      header: {
        tagline: 'سمارٹ صحت یہاں شروع ہوتی ہے',
        searchPlaceholder: 'ڈاکٹر، شعبہ، خدمات تلاش کریں...',
        emergency: 'ایمرجنسی',
        communities: 'کمیونٹیز',
        profile: 'پروفائل',
        settings: 'سیٹنگز',
        help: 'مدد',
        privacy: 'رازداری',
        signOut: 'سائن آؤٹ',
        signIn: 'سائن ان',
        getStarted: 'شروع کریں',
        user: 'مریض',
        doctor: 'ڈاکٹر',
        admin: 'منتظم'
      },
      
      // Hero Section
      hero: {
        smart: 'سمارٹ',
        health: 'صحت',
        starts: 'شروع',
        here: 'یہاں',
        subtitle: 'قابل اعتماد طبی علم کے لیے ایک جدید مرکز، ڈاکٹروں اور AI کے ذریعے چلایا جاتا ہے',
        bookAppointment: 'اپائنٹمنٹ بک کریں',
        virtualTour: 'ورچوئل ٹور'
      },
      
      // Authentication
      auth: {
        welcomeBack: 'واپس خوش آمدید',
        joinMedicalQ: 'MedicalQ میں شامل ہوں',
        signInToAccount: 'اپنے اکاؤنٹ میں سائن ان کریں',
        createAccount: 'شروع کرنے کے لیے اپنا اکاؤنٹ بنائیں',
        signIn: 'سائن ان',
        signUp: 'سائن اپ',
        email: 'ای میل',
        password: 'پاس ورڈ',
        enterEmail: 'اپنا ای میل درج کریں',
        enterPassword: 'اپنا پاس ورڈ درج کریں',
        signingIn: 'سائن ان ہو رہا ہے...',
        creatingAccount: 'اکاؤنٹ بنایا جا رہا ہے...',
        iAmA: 'میں ہوں'
      },
      
      // Booking
      booking: {
        bookAppointment: 'اپائنٹمنٹ بک کریں',
        with: 'کے ساتھ',
        appointmentDetails: 'اپائنٹمنٹ کی تفصیلات',
        appointmentType: 'اپائنٹمنٹ کی قسم',
        consultation: 'مشاورت',
        followUp: 'فالو اپ',
        emergency: 'ایمرجنسی',
        preferredDate: 'پسندیدہ تاریخ',
        preferredTime: 'پسندیدہ وقت',
        selectTime: 'وقت منتخب کریں',
        preferredLanguage: 'پسندیدہ زبان',
        reasonForVisit: 'ملاقات کی وجہ',
        reasonPlaceholder: 'براہ کرم اپنی علامات یا ملاقات کی وجہ بتائیں...',
        symptoms: 'موجودہ علامات',
        symptomsPlaceholder: 'آپ جو بھی علامات محسوس کر رہے ہیں ان کا بیان کریں...',
        personalInformation: 'ذاتی معلومات',
        fullName: 'پورا نام',
        phoneNumber: 'فون نمبر',
        emailAddress: 'ای میل ایڈریس',
        emergencyContact: 'ایمرجنسی رابطہ',
        medicalHistory: 'طبی تاریخ',
        medicalHistoryPlaceholder: 'کوئی بھی پچھلی طبی حالت، سرجری، یا الرجی...',
        currentMedications: 'موجودہ ادویات',
        medicationsPlaceholder: 'آپ فی الوقت جو بھی ادویات لے رہے ہیں ان کی فہرست بنائیں...',
        insuranceAndPayment: 'انشورنس اور ادائیگی',
        insuranceProvider: 'انشورنس فراہم کنندہ',
        insuranceProviderPlaceholder: 'جیسے HDFC ERGO, Star Health',
        insuranceNumber: 'انشورنس نمبر',
        insuranceNumberPlaceholder: 'آپ کا انشورنس پالیسی نمبر',
        specialRequests: 'خصوصی درخواستیں',
        specialRequestsPlaceholder: 'کوئی خصوصی سہولت یا درخواست...',
        appointmentSummary: 'اپائنٹمنٹ کا خلاصہ',
        doctor: 'ڈاکٹر',
        type: 'قسم',
        date: 'تاریخ',
        time: 'وقت',
        estimatedCost: 'تخمینی لاگت',
        previous: 'پچھلا',
        next: 'اگلا',
        cancel: 'منسوخ کریں',
        confirmBooking: 'بکنگ کی تصدیق کریں',
        booking: 'بکنگ ہو رہی ہے...',
        loginRequired: 'اپائنٹمنٹ بک کرنے کے لیے براہ کرم لاگ ان کریں',
        appointmentBooked: 'اپائنٹمنٹ کامیابی سے بک ہو گئی!',
        bookingFailed: 'اپائنٹمنٹ بک کرنے میں ناکام',
        bookingError: 'بکنگ کے دوران ایک خرابی ہوئی'
      },
      
      // Virtual Tour
      tour: {
        title: 'MedicalQ ورچوئل ٹور',
        subtitle: 'ہمارے پلیٹ فارم کو دیکھیں اور جانیں کہ ہم آپ کی کیسے مدد کر سکتے ہیں',
        share: 'شیئر کریں',
        openInNewTab: 'نئے ٹیب میں کھولیں',
        loading: 'ورچوئل ٹور لوڈ ہو رہا ہے...',
        aboutTitle: 'اس ٹور کے بارے میں',
        aboutDescription: 'MedicalQ پلیٹ فارم کا ایک جامع دورہ کریں اور جانیں کہ ہماری جدید خصوصیات آپ کی صحت کو بہتر طریقے سے منظم کرنے میں کیسے مدد کر سکتی ہیں۔',
        featuresTitle: 'آپ کیا دیکھیں گے',
        feature1: 'ڈاکٹر مشاورت انٹرفیس',
        feature2: 'کمیونٹی پلیٹ فارم کی خصوصیات',
        feature3: 'اپائنٹمنٹ بکنگ سسٹم',
        feature4: 'صحت کی نگرانی کے ٹولز',
        watchFullVideo: 'مکمل ویڈیو دیکھیں',
        getStarted: 'شروع کریں'
      },
      
      // Community
      community: {
        title: 'طبی کمیونٹی',
        subtitle: 'دنیا بھر کے مریضوں اور صحت کے پیشہ ور افراد سے جڑیں',
        searchPlaceholder: 'کمیونٹیز، پوسٹس، یا موضوعات تلاش کریں...',
        allCommunities: 'تمام کمیونٹیز',
        communities: 'کمیونٹیز',
        trending: 'ٹرینڈنگ',
        recent: 'حالیہ',
        popular: 'مقبول',
        createPost: 'پوسٹ بنائیں',
        members: 'ممبرز',
        online: 'آن لائن',
        daysAgo: 'دن پہلے',
        hoursAgo: 'گھنٹے پہلے',
        justNow: 'ابھی',
        doctor: 'ڈاکٹر',
        patient: 'مریض',
        share: 'شیئر کریں',
        createNewPost: 'نئی پوسٹ بنائیں',
        postTitle: 'پوسٹ کا عنوان',
        postTitlePlaceholder: 'آپ کس بارے میں بات کرنا چاہتے ہیں؟',
        community: 'کمیونٹی',
        selectCommunity: 'ایک کمیونٹی منتخب کریں',
        content: 'مواد',
        contentPlaceholder: 'اپنے خیالات، تجربات، یا سوالات شیئر کریں...',
        tags: 'ٹیگز',
        tagsPlaceholder: 'جیسے ذیابیطس، دل، بحالی (کاما سے الگ)',
        publishPost: 'پوسٹ شائع کریں',
        loginRequired: 'پوسٹ بنانے کے لیے براہ کرم لاگ ان کریں',
        fillRequired: 'براہ کرم عنوان اور مواد بھریں',
        
        // Community names
        cardiology: 'دل کی بیماری',
        cardiologyDesc: 'دل کی صحت اور دل کی دیکھ بھال کی بحث',
        neurology: 'نیورولوجی',
        neurologyDesc: 'دماغ کی صحت اور نیورولوجیکل حالات',
        orthopedics: 'ہڈیوں کا علاج',
        orthopedicsDesc: 'ہڈی، جوڑ اور پٹھوں کی صحت',
        diabetes: 'ذیابیطس کی دیکھ بھال',
        diabetesDesc: 'خون میں شکر کا انتظام اور طرز زندگی',
        pediatrics: 'بچوں کا علاج',
        pediatricsDesc: 'بچوں کی صحت اور نشوونما',
        mentalHealth: 'ذہنی صحت',
        mentalHealthDesc: 'ذہنی تندرستی اور مدد'
      },
      
      // Search
      search: {
        placeholder: 'ڈاکٹر، شعبہ، خدمات تلاش کریں...',
        searching: 'تلاش کر رہے ہیں...',
        results: 'تلاش کے نتائج',
        noResults: 'کوئی نتیجہ نہیں ملا',
        tryDifferent: 'مختلف کلیدی الفاظ کے ساتھ تلاش کرنے کی کوشش کریں',
        recent: 'حالیہ تلاشیں',
        clearAll: 'سب صاف کریں',
        trending: 'ٹرینڈنگ تلاشیں'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'medicalq-language',
    },
  });

export default i18n;