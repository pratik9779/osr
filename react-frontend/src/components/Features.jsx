import React from "react";
import { useLanguage } from "./LanguageProvider";

const Features = () => {
  const { t } = useLanguage();
  return (
    <section className="osr-features-section">
      <ul className="osr-features-list">
        {t.features.map((feature, idx) => (
          <li key={idx} className="osr-feature-item">
            <span className="osr-feature-icon">✔</span> {feature}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Features;
