import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { PrismaClient } from "@prisma/client"
import dayjs from 'dayjs'

import Breadcrumb from 'components/commons/breadcrumb/Breadcrumb'
import { jsonify } from 'utils/utils'
import slugify from 'utils/slugify'

const prisma = new PrismaClient()

export default function Category({ category }) {
  const { data: session } = useSession()

  return (
    <section>
      <Breadcrumb
        links={[{ href: '/', name: 'Home' }, { href: '/forum', name: 'Forum' }]}
        currentPage={category.name}
      />

      <h1>{category.name}</h1>
      {!!session && <Link href={`/forum/${category.slug}/create`}><a>Create a new topic</a></Link>}

      <article>
        <ul>
          {category.forumTopics.map(f => (
            <li key={f.id}>
              <Link href={`/forum/${category.slug}/topic/${f.slug}/${f.id}`}><a>{f.name}</a></Link>
              <p>by <Link href={`/user/${slugify(f.user.name)}/${f.user.id}`}><a>{f.user.name}</a></Link>, {dayjs(f.createdAt).format('DD/MM/YYYY')}</p>
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}

export async function getServerSideProps(context) {
  try {
    const { query } = context

    const category = await prisma.forumSubCategory.findUnique({
      include: {
        forumTopics: {
          include: {
            user: true,
          }
        },
      },
      where: { id: query.id }
    })
    return {
      props: {
        category: jsonify(category)
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}