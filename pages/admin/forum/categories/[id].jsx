import { useState } from "react"
import { useRouter } from "next/router"
import { PrismaClient } from "@prisma/client"
import { useForm } from "react-hook-form"
import useTranslation from 'next-translate/useTranslation'

import slugify from "utils/slugify"
import { jsonify } from "utils/utils"

const prisma = new PrismaClient()

export default function ForumEditCategory({ forumCategory, forumCategories }) {
  const router = useRouter()
  const [error, setError] = useState({})
  const { t } = useTranslation('adminCategories')
  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: forumCategory.name },
    mode: "onChange",
  })

  async function handlePatchCategory(data) {
    const duplicate = forumCategories.find(f => f.name === data.name)
    if (duplicate) {
      setError({ type: 'error', message: t('editDuplicate')})
      return
    }

    if (!data.name.replace(/\s/g, '').length) {
      setError({ type: 'error', message: t('editEmpty') })
      return
    }

    const body = JSON.stringify({
      name: data.name,
      slug: slugify(data.name)
    })

    const res = await(await fetch(`/api/admin/forum/categories/${forumCategory.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body
    })).json()
    
    router.push('/admin/forum/categories')
    return res
  }

  return (
    <section>
      <h1>{t('editName')} {forumCategory.name}</h1>

      <form onSubmit={handleSubmit(handlePatchCategory)}>
        {!!error.type &&
          <div>
            <p>{error.message}</p>
            <button 
              type="button"
              onClick={() => {
                reset()
                setError({})
              }}
            >
              {t('editCloseAlert')}
            </button>
          </div>
        }

        <div>
          <label htmlFor="name">{t('editLabel')}</label>
          <input 
            type="text" 
            id="name"
            aria-invalid={errors.name ? "true" : "false"}
            {...register('name', { required: true })}
          />
          {errors.name && <span>{t('editError')}</span>}
        </div>

        <button type="submit">{t('editSubmit')}</button>
      </form>
    </section>
  )
}

export async function getServerSideProps(context) {
  const { query } = context

  try {
    const forumCategory = await prisma.forumCategory.findUnique({
      where: { id: query.id }
    })
    const forumCategories = await prisma.forumCategory.findMany()

    return {
      props: {
        forumCategory: jsonify(forumCategory),
        forumCategories: jsonify(forumCategories)
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}