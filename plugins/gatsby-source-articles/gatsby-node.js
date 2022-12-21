const { createNodeHelpers } = require("gatsby-node-helpers")
const { paginate } =  require("gatsby-awesome-pagination")

const loadArticles = async (apiUrl) => {
  const limit = 100
  let offset = 0
  const result = []
  await load()
  async function load() {
    const url = `${apiUrl}/articles?limit=${limit}&offset=${offset}`
    const response = await fetch(url)
    const data = await response.json()
    result.push(...data.articles)
    if(result.length < data.articlesCount) {
      offset += limit
      await load()
    }
  }
  return result
}

async function sourceNodes({ actions, createNodeId, createContentDigest }, configOptions) {
  const { createNode } = actions
  const { apiUrl } = configOptions
  const articles = await loadArticles(apiUrl)
  // 1. 构建数据节点对象
  const { createNodeFactory } = createNodeHelpers({
    typePrefix: 'articles', // 数据类型前缀 即 数据节点的名字
    createNodeId,
    createContentDigest,
  })
  // 数据类型前缀和数据节点名称共同构成数据层节点的名称
  // allArticlesList
  const createNodeObject = createNodeFactory("list") // 数据节点名称

  // 2. 根据数据节点对象创建节点
  articles.forEach((article, index) => {
    // TODO 解决id问题  https://blog.csdn.net/u012961419/article/details/119041724
    createNode(createNodeObject({ ...article, id: createNodeId(article.slug) }))
  })
}

const createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    query {
      allArticlesList {
        totalCount
        nodes {
          slug
        }
      }
    }
  `)
  // Create your paginated pages
  paginate({
    createPage, // The Gatsby `createPage` function
    items: data.allArticlesList.nodes, // An array of objects
    itemsPerPage: 10, // How many items you want per page
    pathPrefix: '/', // Creates pages like `/blog`, `/blog/2`, etc
    component: require.resolve('../../src/templates/list.tsx'), // Just like `createPage()`
  })
}

module.exports = {
  sourceNodes,
  createPages
}