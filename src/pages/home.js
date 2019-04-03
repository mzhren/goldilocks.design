import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import AppIcon from '../components/AppIcon'

const Apps = styled.div`
  display: grid;
  margin: auto;
  padding: 0 ${props => props.theme.size[350]};
  grid-auto-columns: 20%;
  grid-auto-rows: auto;
  grid-auto-flow: column;
  grid-row-gap: ${props => props.theme.size[400]};
  grid-column-gap: ${props => props.theme.size[500]};
  width: ${props => props.theme.size[850]};
  justify-self: center;
  align-items: center;
  justify-content: center;

  ${props => props.theme.media.tabletVertical`
    grid-auto-columns: 40%;
  `}

  ${props => props.theme.media.phone`
    grid-auto-columns: 50%;
  `}
`

const HomePage = props => (
  <Apps>
    {props.data.apps.edges.map(edge => {
      const app = edge.node
      return (
        <AppIcon
          key={app.id}
          title={app.title}
          icon={app.icon}
          to={app.slug}
          color={app.color}
          colorWeight={app.colorWeight}
        />
      )
    })}
  </Apps>
)

HomePage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object,
    apps: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default HomePage

export const query = graphql`
  fragment AppInfo on AppsYaml {
    id
    icon
    slug
    title
    color
    colorWeight
  }
`

export const pageQuery = graphql`
  query {
    page: screensYaml(id: { eq: "home" }) {
      ...ScreenInfo
    }
    apps: allAppsYaml {
      edges {
        node {
          ...AppInfo
        }
      }
    }
  }
`