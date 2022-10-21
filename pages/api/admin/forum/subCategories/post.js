import { getSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function post(req, res) {
  const session = await getSession({ req })

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { name, description, slug, forumCategoryId } = req.body

    if (
      !name || !name.replace(/\s/g, '').length ||
      !description || !description.replace(/\s/g, '').length ||
      !forumCategoryId
    ) {
      return res.status(400).json({ message: 'Invalid fields' })
    }
    
    const forumSubCategory = await prisma.forumSubCategory.create({ data: { name, description, slug, forumCategoryId, userId: session.user.id } })
    res.status(201).json(forumSubCategory)
  } catch (e) {
    return res.status(500).json({ message: new Error(e).message })
  }

  res.end()
}