import Link from "next/link"
import { PrismaClient } from "@prisma/client"
import dayjs from 'dayjs'

import { jsonify } from "utils/utils"
import slugify from "utils/slugify"

const prisma = new PrismaClient()

export default function Topic({ forumTopic }) {
  return (
    <section>
      <aside>
        <ul>
          <li><Link href='/'><a>Home</a></Link></li>
          <li><Link href='/forum'><a>Forum</a></Link></li>
          <li><Link href={`/forum/${forumTopic.forumSubCategory.slug}/${forumTopic.forumSubCategory.id}`}><a>{forumTopic.forumSubCategory.name}</a></Link></li>
          <li>{forumTopic.name}</li>
        </ul>
      </aside>

      <article>
        <h1>{forumTopic.name}</h1>
        <p>By <Link href={`/user/${slugify(forumTopic.user.name)}/${forumTopic.user.id}`}><a>{forumTopic.user.name}</a></Link>, {dayjs(forumTopic.createdAt).format('DD/MM/YYYY')}</p>
        <p>{forumTopic.message}</p>
      </article>
    </section>
  )
}

export async function getServerSideProps(context) {
  try {
    const { query } = context

    const forumTopic = await prisma.forumTopic.findUnique({ 
      where: { id: query.id },
      include: {
        forumSubCategory: true,
        user: true
      }
    })
    return {
      props: {
        forumTopic: jsonify(forumTopic)
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}