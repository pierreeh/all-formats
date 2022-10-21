import { useState } from "react"
import { useRouter } from "next/router"
import { PrismaClient } from "@prisma/client"
import { useForm } from "react-hook-form"
import useTranslation from 'next-translate/useTranslation'

import { jsonify } from "utils/utils"
import slugify from "utils/slugify"

const prisma = new PrismaClient()

export default function EditSubCategory({ forumSubCategory, forumSubCategories, forumCategories }) {
  const router = useRouter()
  const { t } = useTranslation('adminSubCategories')
  const [error, setError] = useState({})
  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { 
      name: forumSubCategory.name,
      description: forumSubCategory.description,
      forumCategoryId: forumSubCategory.forumCategory.id
    },
    mode: "onChange",
  })

  async function handlePatchSubCat(data) {
    const duplicate = forumSubCategories.find(f => f.name === data.name)
    if (duplicate) {
      setError({ type: 'error', message: t('editDuplicate') })
      return
    }

    if (!data.name.replace(/\s/g, '').length || !data.description.replace(/\s/g, '').length || !data.forumCategoryId) {
      setError({ type: 'error', message: t('editEmptyField') })
      return
    }

    const body = JSON.stringify({
      name: data.name,
      slug: slugify(data.name),
      description: data.description,
      forumCategoryId: data.forumCategoryId
    })
    
    const res = await(await fetch(`/api/admin/forum/subCategories/${forumSubCategory.id}`, {
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
      <h1>{t('editPageTitle')} {forumSubCategory.name}</h1>

      <form onSubmit={handleSubmit(handlePatchSubCat)}>
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
          <label htmlFor="name">{t('editLabelName')}</label>
          <input {...register('name', { required: true })} aria-invalid={errors.name ? "true" : "false"} type="text" />
          {errors.name && <span>{t('editRequiredField')}</span>}
        </div>

        <div>
          <label htmlFor="description">{t('editLabelDescription')}</label>
          <textarea {...register('description', { required: true })} aria-invalid={errors.name ? "true" : "false"} />
          {errors.description && <span>{t('editRequiredField')}</span>}
        </div>

        <div>
          <label htmlFor="forumCategoryId">{t('editLabelCategory')}</label>
          <select {...register('forumCategoryId', { required: true })}>
            {forumCategories.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
          {errors.forumCategoryId && <span>{t('editRequiredField')}</span>}
        </div>

        <button type="submit">{t('editSubmit')}</button>
      </form>
    </section>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  try {
    const forumSubCategories = await prisma.forumSubCategory.findMany()
    const forumSubCategory = await prisma.forumSubCategory.findUnique({
      include: {
        forumCategory: true
      },
      where: { id: query.id }
    })
    const forumCategories = await prisma.forumCategory.findMany()

    return {
      props: {
        forumSubCategory: jsonify(forumSubCategory),
        forumSubCategories: jsonify(forumSubCategories),
        forumCategories: jsonify(forumCategories)
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}