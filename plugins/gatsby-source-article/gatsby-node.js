exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    query {
      allArticlesList {
        nodes {
          slug
        }
      }
    }
  `)
  const articles = data.allArticlesList.nodes
  // Create your paginated pages
  articles.forEach((article, index) => {
    createPage({
      path: `/article/${article.slug}`,
      component: require.resolve('../../src/templates/article.tsx'),
      context: {
        slug: article.slug
      }
    })
  })
}