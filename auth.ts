import NextAuth from 'next-auth'
// import { z } from 'zod'
import { compare } from 'bcryptjs'
import credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
// import { getUser } from './lib/actions/user.actions'
import { users } from './lib/placeholder-data'

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     credentials({
//       async authorize(credentials) {
//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials)

//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data
//           const user = await getUser(email)
//           if (!user) return null
//           const passwordsMatch = await compare(password, user.password)
//           if (passwordsMatch) return user
//         }
//         console.log('Invalid credentials')
//         return null
//       },
//     }),
//   ],
// })

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      async authorize(credentials) {
        const user = users.find((x) => x.email === credentials.email)
        if (!user) return null
        const passwordsMatch = await compare(
            credentials.password as string,
            user.password
        )
        if (passwordsMatch) return user
        
        console.log('Invalid credentials')
        return null
      },
    }),
  ],
})

