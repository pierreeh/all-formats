import Link from "next/link"
import { PrismaClient } from "@prisma/client"
import dayjs from 'dayjs'
import useTranslation from 'next-translate/useTranslation'

const prisma = new PrismaClient()

export default function ForumCategories({ forumCategories }) {
  const { t } = useTranslation('adminCategories')

  return (
    <section>
      <h1>Categories</h1>
      <Link href='/admin/forum/categories/create'><a>Create</a></Link>

      <article>
        <ul>
          {forumCategories.map(f => (
            <li key={f.id}>
              <h2>{f.name}</h2>
              <p>{t('getCreatedAt')} {dayjs(f.createdAt).format('DD/MM/YYYY')}</p>
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}

export async function getServerSideProps() {
  try {
    const forumCategories = await prisma.forumCategory.findMany()
  
    return {
      props: { 
        forumCategories: JSON.parse(JSON.stringify(forumCategories))
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}