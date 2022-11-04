import { PrismaClient } from "@prisma/client"
import dayjs from 'dayjs'

import Breadcrumb from "components/commons/breadcrumb/Breadcrumb"
import Title from "components/commons/title/Title"
import Links from "components/commons/links/Links"
import Text from "components/commons/text/Text"
import { jsonify } from "utils/utils"
import { rem } from "styles/GlobalStyle.style"
import { IndexCategories, IndexSubCategories, IndexDescriptions } from 'styles/Forum.style'
import slugify from "utils/slugify"
import { primaryColorsAlpha } from "components/commons/Theme"

const prisma = new PrismaClient()

export default function Forum({ forumCategories }) {
  return (
    <section>
      <Breadcrumb 
        links={[{ href: '/', name: 'Home' }]}
        currentPage='Forum'
      />

      <article>
        <ul>
          {forumCategories.map(f => (
            <IndexCategories key={f.id}>
              <Title as='h1' textSize={rem(32)} margins={`0 0 ${rem(4)}`}>{f.name}</Title>
              <IndexDescriptions>
                <Text textSize={rem(12)} textUppercase>Forums</Text>
                <Text textSize={rem(12)} textUppercase alignText='center'>Topics</Text>
                <Text textSize={rem(12)} textUppercase>Last contribution</Text>
              </IndexDescriptions>
              <ul>
                {f.forumSubCategories.map(s => (
                  <IndexSubCategories key={s.id}>
                    <div>
                      <Links href={`/forum/${s.slug}/${s.id}`} margins={`0 0 ${rem(8)}`}>{s.name}</Links>
                      <Text textColor={primaryColorsAlpha.primaryText64}>{s.description}</Text>
                    </div>
                    <Text alignText='center'>{s.forumTopics.length}</Text>
                    {!!s.forumTopics.length &&
                      <div>
                        <Links href={`/forum/${s.slug}/topic/${s.forumTopics[0].slug}/${s.forumTopics[0].id}`}>{s.forumTopics[0].name}</Links>
                        <Text textSize={rem(12)} textColor={primaryColorsAlpha.primaryText64}>By <Links href={`/user/${slugify(s.forumTopics[0].user.name)}/${s.forumTopics[0].user.id}`}>{s.forumTopics[0].user.name}</Links>, {dayjs(s.forumTopics[0].createdAt).format('DD/MM/YYYY')}</Text>
                      </div>
                    }
                  </IndexSubCategories>
                ))}
              </ul>
            </IndexCategories>
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
            forumTopics: {
              orderBy: {
                createdAt: 'desc',
              },
              include: {
                user: true
              }
            },
          }
        },
      },
    })

    return {
      props: {
        forumCategories: jsonify(forumCategories),
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}