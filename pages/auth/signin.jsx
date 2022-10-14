import { getProviders, signIn } from 'next-auth/react'

export default function SignIn({ providers }) {
  return (
    <section>
      {Object.values(providers).map(provider => {
        return (
          <article key={provider.id}>
            <button type='button' onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
              Sign in with {provider.name}
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