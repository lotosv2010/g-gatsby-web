import React, { useEffect } from "react"
import { graphql, HeadFC, PageProps, Link } from "gatsby"
import Banner from "../components/Banner"
import Toggle from "../components/Toggle"
import Sidebar from "../components/Sidebar"
import { useDispatch, useSelector } from "react-redux"
import { LOADARTICLES } from "../store/const/article.conts"

const Articles = ({ data }: any) => {
  return data.map(({ id, slug, title, description, favoritesCount, createdAt, author: { image, username } }: any) => (<div className="article-preview" key={slug}>
    <div className="article-meta">
      <a href="profile.html"><img src={image} /></a>
      <div className="info">
        <a className="author">{username}</a>
        <span className="date">{createdAt}</span>
      </div>
      <button className="btn btn-outline-primary btn-sm pull-xs-right">
        <i className="ion-heart" /> {favoritesCount}
      </button>
    </div>
    <Link to={`/article/${slug}`} className="preview-link">
      <h1>{title}</h1>
      <p>{description}</p>
      <span>Read more...</span>
    </Link>
  </div>))
}

const List: React.FC<PageProps> = ({ data, pageContext }: any) => {
  const dispatch = useDispatch()
  const articles = useSelector((state: any) => state.articles)

  const { skip: offset, limit } = pageContext
  useEffect(() => {
    // dispatch({
    //   type: LOADARTICLES,
    //   payload: {
    //     limit,
    //     offset
    //   }
    // })
  }, [])
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Toggle />
            {/* TOOD 默认用服务端的数据，客户端数据获取到之后用客户端数据 */}
            <Articles data={articles ?? data.allArticlesList.nodes} />
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>

  )
}

export default List

export const Head: HeadFC = () => <title>Home Page</title>

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allArticlesList(
      skip: $skip 
      limit: $limit
    ) {
      nodes {
        slug
        id
        author {
          username
          image
        }
        createdAt
        description
        favoritesCount
        title
      }
    }
  }
`
