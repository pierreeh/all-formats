import { getSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client"

import { dateFormated } from "utils/utils"

const prisma = new PrismaClient()

export default async function ForumPatchCategory(req, res) {
  const session = await getSession({ req })

  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, slug } = req.body

    if (!name || !name.replace(/\s/g, '').length) {
      return res.status(400).json({ message: 'Invalid fields' })
    }

    let unixTimestamp = Date.now()
    let date = new Date(unixTimestamp)

    const forumCategory = await prisma.forumCategory.update({ 
      where: { id: req.query.id }, 
      data: { name, slug, userId: session.user.id, updatedAt: dateFormated } 
    })
    res.status(201).json(forumCategory)
  } catch (e) {
    return res.status(500).json({ message: new Error(e).message })
  }

  res.end()
}