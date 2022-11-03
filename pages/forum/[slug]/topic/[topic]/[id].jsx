import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client"
import dayjs from 'dayjs'
import { useState } from "react"
import { useForm } from "react-hook-form"

import Breadcrumb from "components/commons/breadcrumb/Breadcrumb"
import { jsonify } from "utils/utils"
import slugify from "utils/slugify"

const prisma = new PrismaClient()

export default function Topic({ forumTopic, forumMessages }) {
  const { data: session } = useSession()
  const [error, setError] = useState({})
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const router = useRouter()

  async function handleCreateComment(data) {
    try {
      if (!data.message || !data.message.replace(/\s/g, '').length) {
        setError({ type: 'error', message: 'This field is required' })
        return
      }

      const body = JSON.stringify({
        message: data.message.trim(),
        forumTopicId: router.query.id
      })
  
      const res = await(await fetch('/api/forum/comments/post', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body
      })).json()
      
      router.reload()
      return res
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section>
      <Breadcrumb
        links={[{ href: '/', name: 'Home' }, { href: '/forum', name: 'Forum' }, { href: `/forum/${forumTopic.forumSubCategory.slug}/${forumTopic.forumSubCategory.id}`, name: forumTopic.forumSubCategory.name }]}
        currentPage={forumTopic.name}
      />

      <article>
        <h1>{forumTopic.name}</h1>
        <p>By <Link href={`/user/${slugify(forumTopic.user.name)}/${forumTopic.user.id}`}><a>{forumTopic.user.name}</a></Link>, {dayjs(forumTopic.createdAt).format('DD/MM/YYYY')}</p>
        <p>{forumTopic.message}</p>
        <hr />
      </article>

      {!!forumMessages ?
        <ul>
          {forumMessages.map(m => (
            <li key={m.id}>
              <article>
                <p>By <Link href={`/user/${slugify(m.user.name)}/${m.user.id}`}><a>{m.user.name}</a></Link>, {dayjs(m.createdAt).format('DD/MM/YYYY')}</p>
                <p>{m.message}</p>
                <hr />
              </article>
            </li>
          ))}
        </ul>
        : <p>Be the first to comment</p>
      }

      {!!session &&
        <form onSubmit={handleSubmit(handleCreateComment)}>
          {!!error.type &&
          <div>
            <p>{error.message}</p>
            <button 
              type="button"
              onClick={() => {
                reset()
                setError({})
              }
              }
            >
              Close
            </button>
          </div>
        }

          <div>
            <label htmlFor="message">Message</label>
            <textarea {...register('message', { required: true })} />
            {errors.message && <span>This field is required</span>}
          </div>

          <button type="submit">Send</button>
        </form>
      }
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

    const forumMessages = await prisma.forumComment.findMany({
      where: { forumTopicId: {
        contains: query.id
      } },
      include: {
        user: true
      }
    })

    return {
      props: {
        forumTopic: jsonify(forumTopic),
        forumMessages: jsonify(forumMessages)
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}