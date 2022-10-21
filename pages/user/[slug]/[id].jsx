import { getSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client"

import { jsonify } from "utils/utils"
import Avatar from "components/commons/avatar/Avatar"

const prisma = new PrismaClient()

export default function User({ user }) {
  return (
    <section>
      <Avatar 
        src={user.image}
        alt={user.name}
        fill
        sizes="100%"
      />
      <h1>{user.name}</h1>
    </section>
  )
}

export async function getServerSideProps(context) {
  try {
    const { query, req } = context
    const session = await getSession({ req })
    
    if (session.id === query.id) {
      return {
        redirect: {
          permanent: true,
          destination: '/user/me',
        },
      }
    }

    const user = await prisma.user.findUnique({
      where: { id: query.id }
    })

    return {
      props: {
        user: jsonify(user)
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}