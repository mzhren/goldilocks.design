import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import SEO from '../components/SEO'
import { Body } from '../components/Layout'
import Header from '../components/Header'
import Container from '../components/Container'
import Group from '../components/Group'
import LinkRowSmall from '../components/LinkRowSmall'
import PostIndicators from '../components/PostIndicators'
import Social from '../components/Social'
import { ButtonLink } from '../components/Button'
import { formatNumber, formatDate } from '../components/Repository'

const Logo = styled(Img)`
  width: ${props => props.theme.size[700]};
  height: ${props => props.theme.size[700]};
`

const MobileOnly = styled.div`
  display: none;

  ${props => props.theme.media.tabletVertical`
    display: block;
  `}
`

const HomePage = ({ data }) => {
  const logo = data.brand.frontmatter.logo
  const posts = data.posts.edges.map(edge => edge.node)
  const projects = data.projects.edges.map(edge => edge.node)
  const tools = data.tools.edges.map(edge => edge.node)

  return (
    <>
      <SEO />
      <Header title={<Logo fluid={logo.childImageSharp.fluid} />} />
      <Body>
        <Container>
          <Group title="Recent Posts" detail={
            <ButtonLink to="/posts" color="yellow">More</ButtonLink>
          }>
            {posts.map(({
              timeToRead,
              fields: { slug },
              frontmatter: { title, badge, createdAt }
            }) => (
              <LinkRowSmall
                to={slug}
                key={slug}
                badge={badge.childImageSharp.fluid}
                title={title}
                indicators={<PostIndicators post={{ timeToRead }} />}
                detail={formatDate(createdAt)}
              />
            ))}
          </Group>
    
          <Group title="Recent Projects" detail={
            <ButtonLink to="/projects" color="blue">More</ButtonLink>
          }>
            {projects.map(({
              fields: { slug },
              frontmatter: { title, description, logo, github }
            }) => (
              <LinkRowSmall
                to={slug}
                key={slug}
                badge={logo.childImageSharp.fluid}
                title={title}
                description={description}
                detail={formatDate(github.committedAt || github.createdAt)}
              />
            ))}
          </Group>
    
          <Group title="Tools by Weekly Downloads" detail={
            <ButtonLink to="/tools" color="orange">More</ButtonLink>
          }>
            {tools.map(({
              fields: { slug },
              frontmatter: { title, badge, npm, github }
            }) => (
              <LinkRowSmall
                to={slug}
                key={slug}
                badge={badge.childImageSharp.fluid}
                title={title}
                detail={formatNumber(npm && npm.downloadsWeekly)}
              />
            ))}
          </Group>

          <MobileOnly>
            <Social />
          </MobileOnly>
        </Container>
      </Body>
    </>
  )
}

export default HomePage

export const pageQuery = graphql`
  query HomePageQuery {
    brand: mdx(frontmatter: { id: { eq: "goldilocks-design" } }) {
      frontmatter {
        logo {
          childImageSharp {
            fluid(maxWidth: 64, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
    posts: allMdx(
      filter: { fields: { collection: { eq: "posts" } } }
      sort: { fields: [frontmatter___createdAt], order: DESC }
      limit: 5
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
    projects: allMdx(
      filter: { fields: { collection: { eq: "projects" } } }
      sort: { fields: [frontmatter___github___committedAt, frontmatter___github___createdAt], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          ...Project
          frontmatter {
            ...ProjectFrontmatter
          }
        }
      }
    }
    tools: allMdx(
      filter: { fields: { isPackage: { eq: true } } }
      sort: { fields: [frontmatter___npm___downloadsWeekly], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          ...Tool
          frontmatter{
            ...ToolFrontmatter
          }
        }
      }
    }
  }
`
