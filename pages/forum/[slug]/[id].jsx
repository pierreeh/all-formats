import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { PrismaClient } from "@prisma/client"
import dayjs from 'dayjs'

import Breadcrumb from 'components/commons/breadcrumb/Breadcrumb'
import Title from 'components/commons/title/Title'
import ButtonLink from 'components/commons/buttonLink/ButtonLink'
import Links from "components/commons/links/Links"
import Text from 'components/commons/text/Text'
import { SubCategoryHeader, IndexDescriptions, IndexSubCategories } from 'styles/Forum.style'
import { jsonify } from 'utils/utils'
import slugify from 'utils/slugify'
import { rem } from 'styles/GlobalStyle.style'
import { primaryColorsAlpha } from 'components/commons/Theme'

const prisma = new PrismaClient()

export default function Category({ category }) {
  const { data: session } = useSession()
  
  return (
    <section>
      <Breadcrumb
        links={[{ href: '/', name: 'Home' }, { href: '/forum', name: 'Forum' }]}
        currentPage={category.name}
      />

      <SubCategoryHeader>
        <Title as='h1' textSize={rem(32)} margins={`0 0 ${rem(4)}`}>{category.name}</Title>
        {!!session && <ButtonLink href={`/forum/${category.slug}/create`}>New topic</ButtonLink>}
      </SubCategoryHeader>
      
      <article>
        <IndexDescriptions>
          <Text textSize={rem(12)} textUppercase>Topics</Text>
          <Text textSize={rem(12)} textUppercase alignText='center'>Answers</Text>
          <Text textSize={rem(12)} textUppercase>Last contribution</Text>
        </IndexDescriptions>
        <ul>
          {category.forumTopics.map(f => (
            <IndexSubCategories key={f.id}>
              <div>
                <Links href={`/forum/${category.slug}/topic/${f.slug}/${f.id}`}>{f.name}</Links>
                <Text textSize={rem(12)} textColor={primaryColorsAlpha.primaryText64}>by <Links href={`/user/${slugify(f.user.name)}/${f.user.id}`}>{f.user.name}</Links>, {dayjs(f.createdAt).format('DD/MM/YYYY')}</Text>
              </div>

              <Text alignText='center'>{f.forumComments.length}</Text>
              {!!f.forumComments &&
                <Text textSize={rem(12)} textColor={primaryColorsAlpha.primaryText64}><Links href={`/user/${slugify(f.forumComments[0].user.name)}/${f.forumComments[0].user.id}`}>{f.forumComments[0].user.name}</Links>, {dayjs(f.forumComments[0].createdAt).format('DD/MM/YYYY')}</Text>
              }
            </IndexSubCategories>
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
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            user: true,
            forumComments: {
              orderBy: {
                createdAt: 'desc'
              },
              include: {
                user: true
              }
            }
          }
        }
      },
      where: { id: query.id }
    })

    return {
      props: {
        category: jsonify(category),
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}