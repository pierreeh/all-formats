import useTranslation from 'next-translate/useTranslation'

export default function Home() {
  const { t } = useTranslation('home')

  return (
    <section>{t('title')}</section>
  )
}
