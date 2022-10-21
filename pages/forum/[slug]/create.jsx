import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { PrismaClient } from "@prisma/client"

import slugify from "utils/slugify"
import { jsonify } from "utils/utils"

const prisma = new PrismaClient()

export default function CreateTopic({ category }) {
  const router = useRouter()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  
  async function handleCreateTopic(data) {
    try {
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
      <h1>Create a new topic</h1>

      <form onSubmit={handleSubmit(handleCreateTopic)}>
        <div>
          <label htmlFor="name">Name</label>
          <input {...register('name', { required: true })} type="text" />
          {errors.name && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea {...register('message', { required: true })} />
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