import { useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import useTranslation from 'next-translate/useTranslation'
import { PrismaClient } from "@prisma/client"

import slugify from "utils/slugify"
import { jsonify } from "utils/utils"

const prisma = new PrismaClient()

export default function ForumCreateCategory({ forumCategories }) {
  const { t } = useTranslation('adminCategories')
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const router = useRouter()
  const [error, setError] = useState({})

  async function onSubmit(data) {
    try {
      const duplicate = forumCategories.find(f => f.name === data.name)
      if (duplicate) {
        setError({ type: 'error', message: t('createDuplicate') })
        return
      }

      if (!data.name.replace(/\s/g, '').length) {
        setError({ type: 'error', message: t('createEmpty') })
        return
      }

      const body = JSON.stringify({
        name: data.name,
        slug: slugify(data.name)
      })

      const res = await(await fetch('/api/admin/forum/categories/post', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body
      })).json()
      
      router.push('/admin/forum/categories')
      return res
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section>
      <h1>{t('createTitle')}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
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
              {t('createCloseAlert')}
            </button>
          </div>
        }

        <div>
          <label htmlFor="name">{t('createLabel')}</label>
          <input 
            type="text" 
            id="name"
            aria-invalid={errors.name ? "true" : "false"}
            {...register('name', { required: true })}
          />
          {errors.name && <span>{t('createError')}</span>}
        </div>

        <button type="submit">{t('createSubmit')}</button>
      </form>
    </section>
  )
}

export async function getServerSideProps() {
  try {
    const forumCategories = await prisma.forumCategory.findMany()

    return {
      props: {
        forumCategories: jsonify(forumCategories)
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}