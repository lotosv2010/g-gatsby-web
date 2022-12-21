import * as React from "react"
import { HeadFC, PageProps } from "gatsby"
import Article from "../templates/article"

const NotFoundPage: React.FC<PageProps> = ({ location: {pathname} }: any) => {
  if(pathname.startsWith('/article')) {
    const slug = pathname.substr(9)
    return <Article slug={slug} />
  }
  return (
    <main>
      <p>Not found</p>
    </main>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
