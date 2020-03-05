import React from 'react'
import { graphql } from 'gatsby'
import { Container } from '../components/Layout'
import Layout from '../components/Layout'
import Group from '../components/Group'
import Card from '../components/Card'
import Header from '../components/Header'
import { Back } from '../components/Link'
import PostIndicators from '../components/PostIndicators'
import moment from 'moment'

const PostsPage = ({ data: { posts } }) => (
  <Layout>
    <Header
      title="Posts"
      primary={<Back to='/' />}
    />
    <Container>
        {posts.edges.map(({node: post}) => (
          <Card
            to={post.fields.slug}
            key={post.fields.slug}
            badge={post.frontmatter.authorImg.childImageSharp.fluid}
            card={post.frontmatter.badge.childImageSharp.fluid}
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            indicators={<PostIndicators post={{...post.frontmatter, timeToRead: post.timeToRead}} />}
            detail={moment(post.frontmatter.createdAt).format("MMM YYYY")}
            badgeCircle
          />
        ))}
    </Container>
  </Layout>
)

export default PostsPage

export const pageQuery = graphql`
  query {
    posts: allMarkdownRemark(
        filter: { fields: { collection: { eq: "posts" } } }
        sort: { fields: [frontmatter___createdAt], order: DESC }
      ) {
        edges {
          node {
            ...Post
            frontmatter {
              ...PostFrontmatter
            }
          }
        }
    }
  }
`
