import Link from "next/link"
import { PrismaClient } from "@prisma/client"

import { jsonify } from "utils/utils"

const prisma = new PrismaClient()

export default function Forum({ forumCategories }) {
  console.log(forumCategories)
  return (
    <section>
      <aside>
        <ul>
          <li><Link href='/'><a>Home</a></Link></li>
          <li>Forum</li>
        </ul>
      </aside>

      <article>
        <ul>
          {forumCategories.map(f => (
            <li key={f.id} style={{ marginTop: "3rem" }}>
              <h1>{f.name}</h1>
              <ul>
                {f.forumSubCategories.map(s => (
                  <li key={s.id}>
                    <Link href={`/forum/${s.slug}/${s.id}`}><a>{s.name}</a></Link>
                    <p>{s.description}</p>
                    <p>{s.forumTopics.length}</p>
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
        forumSubCategories: {
          include: {
            forumTopics: true,
          }
        },
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