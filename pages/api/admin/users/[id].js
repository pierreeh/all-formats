import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function PatchRole(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { role } = req.body
    
    if (!role) {
      return res.status(400).json({ message: 'Invalid fields' })
    }

    const user = await prisma.user.update({
      where: { id: req.query.id },
      data: { role }
    })
    res.status(204).json(user)
  } catch (e) {
    return res.status(500).json({ message: new Error(e).message })
  }

  res.end()
}