import { useTranslation } from 'react-i18next'

const LanguageToggle = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en'
    i18n.changeLanguage(newLang)
  }

  const currentLanguage = i18n.language === 'en' ? 'Español' : 'English'

  return (
    <button
      className="flex shrink items-center gap-3 px-4 py-2 bg-gray-800 hover:bg-slate-600 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm text-slate-200"
      onClick={toggleLanguage}>
      {currentLanguage}
    </button>
  )
}

export default LanguageToggle
