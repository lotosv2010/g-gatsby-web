import axios from 'axios'
import { graphql, HeadFC } from 'gatsby'
import React, { useEffect, useState } from 'react'

export default function Article({ data, slug }: any) {
  const [article, setArticle] = useState<any>({})
  // const { articlesList: article } = data
  useEffect(() => {
    if(data) {
      setArticle(data.articlesList)
      return
    }
    (async function () {
      const { data } =  await axios.get(`/articles/${slug}`)
      setArticle(data.article)
    })()
  }, [])
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <a><img src={article.author?.image} /></a>
            <div className="info">
              <a className="author">{article.author?.username}</a>
              <span className="date">{article.createdAt}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round" />
              &nbsp; {article.author?.username} <span className="counter">({article.author?.following ?? 0})</span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart" />
              &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p dangerouslySetInnerHTML={{__html: article.body}}></p>
            <h2 id="introducing-ionic">Introducing RealWorld.</h2>
            <p>{article.description}</p>
          </div>
        </div>
        <hr />
        <div className="article-actions">
          <div className="article-meta">
            <a href="profile.html"><img src="https://www.realworld.how/img/realworld-logo.png" /></a>
            <div className="info">
              <a className="author">Eric Simons</a>
              <span className="date">January 20th</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round" />
              &nbsp; Follow Eric Simons
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart" />
              &nbsp; Favorite Post <span className="counter">(29)</span>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea className="form-control" placeholder="Write a comment..." rows={3} defaultValue={""} />
              </div>
              <div className="card-footer">
                <img src="https://www.realworld.how/img/realworld-logo.png" className="comment-author-img" />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>
            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional content.
                </p>
              </div>
              <div className="card-footer">
                <a className="comment-author">
                  <img src="https://www.realworld.how/img/realworld-logo.png" className="comment-author-img" />
                </a>
                &nbsp;
                <a className="comment-author">Jacob Schmidt</a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>
            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional content.
                </p>
              </div>
              <div className="card-footer">
                <a className="comment-author">
                  <img src="https://www.realworld.how/img/realworld-logo.png" className="comment-author-img" />
                </a>
                &nbsp;
                <a className="comment-author">Jacob Schmidt</a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-edit" />
                  <i className="ion-trash-a" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Head: HeadFC = () => <title>Article Page</title>

export const pageQuery = graphql`
  query ($slug: String) {
    articlesList(slug: {eq: $slug}) {
      author {
        image
        username
        following
      }
      body
      createdAt(formatString: "YYYY-MM-DD HH:mm:ss")
      description
      favoritesCount
      title
      id
    }
  }
`