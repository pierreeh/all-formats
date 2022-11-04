import { useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { PrismaClient } from "@prisma/client"

import Breadcrumb from "components/commons/breadcrumb/Breadcrumb"
import Title from "components/commons/title/Title"
import Notif from "components/commons/notif/Notif"
import Label from "components/commons/form/label/Label"
import slugify from "utils/slugify"
import { jsonify } from "utils/utils"
import { rem } from "styles/GlobalStyle.style"

const prisma = new PrismaClient()

export default function CreateTopic({ category }) {
  const router = useRouter()
  const [error, setError] = useState({})
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  
  async function handleCreateTopic(data) {
    try {
      if (!data.name.replace(/\s/g, '').length || !data.message.replace(/\s/g, '').length) {
        setError({ type: 'error', message: 'Invalid fields' })
        return
      }

      const body = JSON.stringify({
        name: data.name.trim(),
        slug: slugify(data.name.trim()),
        message: data.message,
        forumSubCategoryId: category.id
      })

      const res = await(await fetch('/api/forum/topic/post', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body
      })).json()

      router.push(`/forum/${category.slug}/${category.id}`)
      return res
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section>
      <Breadcrumb 
        links={[{ href: '/', name: 'Home' }, { href: '/forum', name: 'Forum' }, { href: `/forum/${category.slug}/${category.id}`, name: category.name }]}
        currentPage='Create a new topic'
      />

      <Title as='h1' textSize={rem(32)} margins={`0 0 ${rem(4)}`}>Create a new topic</Title>

      <form onSubmit={handleSubmit(handleCreateTopic)}>
        {!!error.type &&
          <Notif
            notifType={error.type}
            onClick={() => {
              reset()
              setError({})
            }}
            margins={`${rem(24)} 0`}
          >
            <p>{error.message}</p>
          </Notif>
        }

        <Label htmlFor="name" errors={errors.name}>
          Name
          <input {...register('name', { required: true })} id="name" />
          {errors.name && <span>This field is required</span>}
        </Label>

        <div>
          <label htmlFor="message">Message</label>
          <textarea {...register('message', { required: true })} id="message" error={errors.message} />
          {errors.message && <span>This field is required</span>}
        </div>

        <button type="submit">Create</button>
      </form>
    </section>
  )
}

export async function getServerSideProps(context) {
  try {
    const { query } = context
    
    const category = await prisma.forumSubCategory.findFirst({
      where: { slug: query.slug }
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