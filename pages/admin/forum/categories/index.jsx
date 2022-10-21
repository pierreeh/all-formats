import Link from "next/link"
import { PrismaClient } from "@prisma/client"
import dayjs from 'dayjs'
import useTranslation from 'next-translate/useTranslation'

import { jsonify } from "utils/utils"

const prisma = new PrismaClient()

export default function ForumCategories({ forumCategories }) {
  const { t } = useTranslation('adminCategories')
  
  return (
    <section>
      <h1>{forumCategories.length} {t('getTitle')}</h1>
      <Link href='/admin/forum/categories/create'><a>{t('getCreateCatLink')}</a></Link>
      <Link href='/admin/forum/sub-categories/create'><a>{t('getCreateSubCatLink')}</a></Link>

      <article>
        <ul>
          {forumCategories.map(f => (
            <li key={f.id}>
              <h2>{f.name}</h2>
              <p>{t('getCreatedAt')} {dayjs(f.createdAt).format('DD/MM/YYYY')} {t('getAuthor')} {f.user.name}</p>
              <Link href={`/admin/forum/categories/${f.id}`}><a>{t('getEditLink')}</a></Link>

              <ul>
                {f.forumSubCategories.map(s => (
                  <li key={s.id}>
                    <h3>{s.name}</h3>
                    <p>{s.description}</p>
                    <Link href={`/admin/forum/sub-categories/${s.id}`}><a>Edit</a></Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}

export async function getServerSideProps() {
  try {
    const forumCategories = await prisma.forumCategory.findMany({
      include: {
        user: true,
        forumSubCategories: true
      },
    })
  
    return {
      props: { 
        forumCategories: jsonify(forumCategories)
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}