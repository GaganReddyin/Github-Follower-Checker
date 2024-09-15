import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    if (session) {
      fetchFollowers()
    }
  }, [session])

  const fetchFollowers = async () => {
    const res = await fetch('/api/followers')
    const data = await res.json()
    setFollowers(data)
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">GitHub Follower Checker</h1>
        <p className="mb-4">Not signed in</p>
        <button
          onClick={() => signIn('github')}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Sign in with GitHub
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">GitHub Follower Checker</h1>
      <p className="mb-4">Signed in as {session.user.email}</p>
      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors mb-8"
      >
        Sign out
      </button>
      <h2 className="text-2xl font-semibold mb-4">Your Followers:</h2>
      <ul className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        {followers.map((follower) => (
          <li key={follower.id} className="mb-2 p-2 hover:bg-gray-100 rounded">
            <a
              href={follower.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <img
                src={follower.avatar_url}
                alt={`${follower.login}'s avatar`}
                className="w-8 h-8 rounded-full mr-2"
              />
              {follower.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
