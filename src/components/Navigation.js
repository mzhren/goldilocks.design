import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Search } from './Input'
import NavigationRow from './NavigationRow'

const Navigation = styled.nav``

export default props => {
  const data = useStaticQuery(graphql`
    query NavigationQuery {
      site {
        siteMetadata {
          content {
            id
            icon
            slug
            title
            color
          }
        }
      }
      projects: allMarkdownRemark(
        filter: { fields: { collection: { eq: "projects" } } }
      ) {
        edges {
          node {
            id
          }
        }
      }
      posts: allMarkdownRemark(
        filter: { fields: { collection: { eq: "posts" } } }
      ) {
        edges {
          node {
            id
          }
        }
      }
      tools: allMarkdownRemark(
        filter: { fields: { collection: { eq: "tools" } } }
      ) {
        edges {
          node {
            id
          }
        }
      }
    }
  `)

  const [search, setSearch] = useState("")

  const badges = {
    "Projects": data.projects.edges.length,
    "Posts": data.posts.edges.length,
    "Tools": data.tools.edges.length
  }

  return (
    <Navigation>
      <Search
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      
      {data.site.siteMetadata.content.map(item => (
        <NavigationRow
          key={item.id}
          icon={item.icon}
          color={item.color}
          title={item.title}
          to={item.slug}
          badge={badges[item.title]}
        />
      ))}
    </Navigation>
  )
}
