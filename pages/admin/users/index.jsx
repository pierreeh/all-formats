import { useRouter } from "next/router"
import { PrismaClient } from "@prisma/client"
import { useForm } from "react-hook-form"

const prisma = new PrismaClient()

export default function Users({ users }) {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { role: users.role },
    mode: "onChange",
  })
  
  async function handleUserRole(data) {
    try {
      const body = JSON.stringify({
        id: data.id,
        role: data.role
      })

      const res = await(await fetch(`/api/admin/users/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body
      })).json()
      
      router.reload()
      return res
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section>
      <h1>Users</h1>

      <article>
        <ul>
          {users.map((u, i) => (
            <li key={u.id}>
              <h2>{u.name}</h2>
              <form onSubmit={handleSubmit(handleUserRole)}>
                <select {...register('role', {required: true})}>
                  <option value="USER">user</option>
                  <option value="ADMIN">admin</option>
                </select>
                {errors.role && <span>Please select a role</span>}

                <input type="hidden" {...register('id')} defaultValue={u.id} />

                <button type='submit'>Change</button>
              </form>
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}

export async function getServerSideProps() {
  try {
    const users = await prisma.user.findMany()

    return {
      props: { 
        users: JSON.parse(JSON.stringify(users))
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}