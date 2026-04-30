import React from "react";
import { useLanguage } from "./LanguageProvider";
import "../App.css";

const PremiumServices = () => {
  const { t } = useLanguage();
  return (
    <section className="osr-services-section">
      <h2 className="osr-section-title">{t.services.heading}</h2>
      <ul className="osr-services-list">
        {t.services.list.map((service, idx) => (
          <li key={idx} className="osr-service-item">
            <span className="osr-service-icon">★</span> {service}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PremiumServices;
