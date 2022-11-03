import { getSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function post(req, res) {
  const session = await getSession({ req })

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { message, forumTopicId } = req.body 

    if (!forumTopicId || !message || !message.replace(/\s/g, '').length) {
      return res.status(400).json({ message: 'Invalid fields' })
    }

    const forumComment = await prisma.forumComment.create({
      data: { message, forumTopicId, userId: session.user.id }
    })
    res.status(201).json(forumComment)
  } catch (e) {
    return res.status(500).json({ message: new Error(e).message })
  }

  res.end()
}