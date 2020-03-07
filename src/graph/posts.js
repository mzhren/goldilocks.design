import { graphql } from 'gatsby'

export const query = graphql`
  fragment PostFrontmatter on MarkdownRemarkFrontmatter {
    id
    author
    title
    description
    website
    githubUrl
    createdAt
    updatedAt
    authorImg {
      childImageSharp {
        fluid(maxWidth: 128, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    badge {
      childImageSharp {
        fluid(maxHeight: 64, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    hero {
      childImageSharp {
        fluid(maxWidth: 1280, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }

  fragment Post on MarkdownRemark {
    id
    fields {
      slug
    }
    excerpt
    timeToRead
    html
  }
`
