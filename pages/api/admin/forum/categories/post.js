import { getSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function post(req, res) {
  const session = await getSession({ req })

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, slug } = req.body

    if (!name || !name.replace(/\s/g, '').length) {
      return res.status(400).json({ message: 'Invalid fields' })
    }

    const forumCategory = await prisma.forumCategory.create({ data: { name, slug, userId: session.user.id } })
    res.status(201).json(forumCategory)
  } catch (e) {
    return res.status(500).json({ message: new Error(e).message })
  }

  res.end()
}