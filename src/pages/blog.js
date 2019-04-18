import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Card, { Cards } from '../components/Card'

const BlogPage = ({ data: { posts }}) => (
  <Cards>
    {posts.edges.map(post => (
      <Card
        key={post.node.frontmatter.date}
        badge={<Img fluid={post.node.frontmatter.badge.childImageSharp.fluid} />}
        title={post.node.frontmatter.title}
        detail={`${post.node.timeToRead} min read`}
        date={post.node.frontmatter.date}
        to={post.node.fields.slug}
      />
    ))}
  </Cards>
)

BlogPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape(PropTypes.object),
    page: PropTypes.shape({
      edges: PropTypes.array,
    }),
    apps: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default BlogPage

export const query = graphql`
  fragment Post on MarkdownRemark {
    fields {
      slug
    }
    timeToRead
    frontmatter {
      author
      title
      intro
      twitter
      github
      date
      badge {
        childImageSharp {
          fluid(maxWidth: 900) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

export const pageQuery = graphql`
  query {
    page: appsYaml(id: { eq: "blog" }) {
      ...AppInfo
    }
    posts: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            ...Post
          }
        }
    }
  }
`
