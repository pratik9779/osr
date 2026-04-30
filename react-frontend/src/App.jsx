import './App.css';

import { LanguageProvider, useLanguage } from './components/LanguageProvider';
import LanguageSwitcher from './components/LanguageSwitcher';
import PremiumServices from './components/PremiumServices';
import Features from './components/Features';


function OSRAppContent() {
  const { t } = useLanguage();
  return (
    <div className="osr-app">
      <header className="osr-header">
        <div className="osr-header-row">
          <h1 className="osr-title">{t.title}</h1>
          <LanguageSwitcher />
        </div>
      </header>
      <main>
        <Features />
        <PremiumServices />
        <section className="osr-contact-section">
          <div className="osr-contact-box">
            <div className="osr-contact-label">{t.contact}</div>
            <div className="osr-contact-location">{t.location}</div>
            <div className="osr-contact-phone">{t.phone}</div>
          </div>
        </section>
      </main>
      <footer className="osr-footer">
        <div>© {new Date().getFullYear()} {t.title}. All rights reserved.</div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <OSRAppContent />
    </LanguageProvider>
  );
}

export default App;
