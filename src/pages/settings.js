import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import Header from '../components/Header'
import { Body } from '../components/Layout'
import Container from '../components/Container'
import Subscribe from '../components/Subscribe'
import ActivityList from '../components/ActivityList'
import { DarkModeRow } from '../components/DarkMode'
import { Back } from '../components/Link'

const SettingsPage = ({ data: { source }, location: { pathname } }) => (
  <>
    <SEO />
    <Header title="Settings" primary={<Back to='/' />} />
    <Body>
      <Container>
        <DarkModeRow />
        <Subscribe context={pathname} />
        <ActivityList
          updatedAt={source.frontmatter.github.updatedAt}
          version={source.frontmatter.github.version}
        />
      </Container>
    </Body>
  </>
)

export default SettingsPage

export const pageQuery = graphql`
  query SettingsQuery {
    source: mdx(frontmatter: { id: { eq: "goldilocks-design" } }) {
      frontmatter {
        ...ProjectFrontmatter
      }
    }
  }
`
