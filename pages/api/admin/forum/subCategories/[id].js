import { getSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client"

import { dateFormated } from "utils/utils"

const prisma = new PrismaClient()

export default async function patch(req, res) {
  const session = await getSession({ req })

  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, slug, description, forumCategoryId } = req.body

    if (
      !name || !name.replace(/\s/g, '').length ||
      !description || !description.replace(/\s/g, '').length ||
      !forumCategoryId
    ) {
      return res.status(400).json({ message: 'Invalid fields' })
    }

    const forumSubCategory = await prisma.forumSubCategory.update({
      where: { id: req.query.id },
      data: {
        name,
        slug,
        description,
        forumCategoryId,
        userId: session.user.id,
        updatedAt: dateFormated
      }
    })
    res.status(201).json(forumSubCategory)
  } catch (e) {
    return res.status(500).json({ message: new Error(e).message })
  }

  res.end()
}