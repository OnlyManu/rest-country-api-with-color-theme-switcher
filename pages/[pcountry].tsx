import { useRouter } from 'next/router'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring';

export default function Country() {
  const router = useRouter()
  const { pcountry }: ParsedUrlQuery = router.query

  return (
    <p>
      Post: { pcountry }
    </p>
  )
}
