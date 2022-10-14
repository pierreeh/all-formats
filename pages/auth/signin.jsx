import { getProviders, signIn } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'

export default function SignIn({ providers }) {
  const { t } = useTranslation('signin')

  return (
    <section>
      {Object.values(providers).map(provider => {
        return (
          <article key={provider.id}>
            <button type='button' onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
              {t('button')} {provider.name}
            </button>
          </article>
        )
      })}
    </section>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders(context)

  return {
    props: { providers }
  }
}