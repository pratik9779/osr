# i18next Translation System Documentation

## Overview
The OSR Tours and Travels website now uses **i18next**, a professional open-source internationalization framework, for managing translations instead of hardcoded translation dictionaries.

## Features
- **Automatic Language Loading**: Translations are loaded from JSON files asynchronously
- **Persistent Language Selection**: User's language choice is saved in localStorage
- **Dynamic Translation**: Page content updates instantly when language is changed
- **Fallback Support**: English is the fallback language if a translation is missing
- **Framework-Based**: Uses industry-standard i18next library used by millions of developers

## File Structure

```
d:\code\OSR\
├── locales/
│   ├── en.json      # English translations
│   ├── hi.json      # Hindi translations
│   └── mr.json      # Marathi translations
├── index.html       # Main HTML file
├── script.js        # Translation logic using i18next
├── style.css        # Styling
└── ...
```

## How It Works

### 1. Translation Files (locales/*.json)
Each language has a JSON file organized by sections:

```json
{
  "nav": {
    "home": "होम",
    "about": "हमारे बारे में",
    ...
  },
  "about": {
    "title": "ओएसआर टूर एंड ट्रैवल्स के बारे में",
    ...
  },
  ...
}
```

### 2. HTML Integration
Use the `data-translate` attribute to mark elements for translation:

```html
<li><a href="#about" data-translate="About">About</a></li>
<h2 data-translate="Who We Are">Who We Are</h2>
```

### 3. JavaScript Integration
The translation system is initialized automatically:

```javascript
// Load translations from JSON files
loadTranslationResources();

// Change language when user selects it
changeLanguage('hi');  // Switch to Hindi

// Translate page content
translatePageContent();
```

## API Functions

### `loadTranslationResources()`
Asynchronously loads all language resources from the locales folder.

### `changeLanguage(lang)`
Changes the active language and re-translates the page.
```javascript
changeLanguage('en');  // English
changeLanguage('hi');  // हिंदी (Hindi)
changeLanguage('mr');  // मराठी (Marathi)
```

### `translatePageContent()`
Translates all elements with `data-translate` or `data-i18n` attributes.

### `updateLanguageButtonState()`
Updates the visual state of language selection buttons to show the active language.

## Adding New Translations

1. **Add to translation files:**
   ```json
   // In locales/en.json
   {
     "mySection": {
       "newKey": "English Text"
     }
   }

   // In locales/hi.json
   {
     "mySection": {
       "newKey": "हिंदी पाठ"
     }
   }

   // In locales/mr.json
   {
     "mySection": {
       "newKey": "मराठी पाठ"
     }
   }
   ```

2. **Add to HTML:**
   ```html
   <element data-translate="English Text">English Text</element>
   ```

3. **Or use the key directly:**
   ```html
   <element data-i18n="mySection.newKey">English Text</element>
   ```

Then call `translatePageContent()` to apply the translations.

## Benefits Over Hardcoded Translations

1. **Scalability**: Easy to add more languages without modifying code
2. **Maintenance**: Translations are centralized in JSON files
3. **Industry Standard**: i18next is used by major companies and projects
4. **Flexibility**: Supports namespaces, pluralization, and interpolation
5. **Performance**: Only loads the required language resources
6. **Community**: Extensive documentation and active community support

## Supported Languages

- 🇬🇧 **English** (en)
- 🇮🇳 **हिंदी** - Hindi (hi)
- 🇮🇳 **मराठी** - Marathi (mr)

## Browser Compatibility

Works with all modern browsers that support:
- Fetch API
- Promise
- ES6 features

## Troubleshooting

### Translations not appearing
1. Check browser console for errors
2. Verify JSON files are in the `locales/` folder
3. Ensure `data-translate` attributes match the keys in JSON files
4. Clear browser cache and localStorage

### Language not persisting
- Check if localStorage is enabled in browser settings

### Missing translations
- They will display the English default value
- Add the missing key to the appropriate JSON file

## Resources

- **i18next Documentation**: https://www.i18next.com/
- **GitHub**: https://github.com/i18next/i18next
- **CDN**: https://cdnjs.com/libraries/i18next
