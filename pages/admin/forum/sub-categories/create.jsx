import { useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { PrismaClient } from "@prisma/client"
import useTranslation from 'next-translate/useTranslation'

import { jsonify } from "utils/utils"
import slugify from "utils/slugify"

const prisma = new PrismaClient()

export default function Create({ forumCategories, forumSubCategories }) {
  const router = useRouter()
  const [error, setError] = useState({})
  const { t } = useTranslation('adminSubCategories')
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  async function handleCreateSubCat(data) {
    try {
      const duplicate = forumSubCategories.find(f => f.name === data.name)
      if (duplicate) {
        setError({ type: 'error', message: t('createDuplicate') })
        return
      }

      if (!data.name.replace(/\s/g, '').length || !data.description.replace(/\s/g, '').length || !data.forumCategoryId) {
        setError({ type: 'error', message: t('createEmptyField') })
        return
      }

      const body = JSON.stringify({
        name: data.name,
        description: data.description,
        slug: slugify(data.name),
        forumCategoryId: data.forumCategoryId
      })

      const res = await(await fetch('/api/admin/forum/subCategories/post', {
        method: "POST",
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
      <h1>{t('createPageTitle')}</h1>

      <form onSubmit={handleSubmit(handleCreateSubCat)}>
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
              {t('createAlertClose')}
            </button>
          </div>
        }

        <div>
          <label htmlFor="name">{t('createLabelName')}</label>
          <input {...register('name', { required: true })} aria-invalid={errors.name ? "true" : "false"} type="text" />
          {errors.name && <span>{t('createRequiredField')}</span>}
        </div>

        <div>
          <label htmlFor="description">{t('createLabelDescription')}</label>
          <textarea {...register('description', { required: true })} aria-invalid={errors.name ? "true" : "false"} />
          {errors.description && <span>{t('createRequiredField')}</span>}
        </div>

        <div>
          <label htmlFor="forumCategoryId">{t('createLabelCategory')}</label>
          <select {...register('forumCategoryId', { required: true })}>
            {forumCategories.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
          {errors.forumCategoryId && <span>{t('createRequiredField')}</span>}
        </div>

        <button type="submit">{t('createSubmit')}</button>
      </form>
    </section>
  )
}

export async function getServerSideProps() {
  try {
    const forumCategories = await prisma.forumCategory.findMany()
    const forumSubCategories = await prisma.forumSubCategory.findMany()
    
    return {
      props: {
        forumCategories: jsonify(forumCategories),
        forumSubCategories: jsonify(forumSubCategories)
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}