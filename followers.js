import { getSession } from 'next-auth/react'
import axios from 'axios'

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const response = await axios.get('https://api.github.com/user/followers', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching followers' })
  }
}
