import { redirect } from 'next/navigation'

export default function HomePage() {
  // Automatically send visitors directly to the client dashboard
  redirect('/client')
}