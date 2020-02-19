import React, { useState } from 'react'
import { graphql } from 'gatsby'
import moment from 'moment'

import Layout, { Container } from '../components/Layout'
import Header from '../components/Header'
import Form from '../components/Form'
import Group from '../components/Group'
import { RowSmall } from '../components/LinkRowSmall'
import { Back } from '../components/Link'
 
const Project = ({ frontmatter: { title, logo, status, github }}) => status ? (
  <Group title="Project">
    <RowSmall
      title={title}
      badge={logo.childImageSharp.fluid}
      detail={moment(github.committedAt).format("MMM YYYY")}
    />
  </Group>
) : null

const Post = ({ frontmatter: { title, badge, createdAt }}) => createdAt ? (
  <Group title="Post">
    <RowSmall
      title={title}
      badge={badge.childImageSharp.fluid}
      detail={moment(createdAt).format("MMM YYYY")}
    />
  </Group>
) : null

export default ({
  data: { project, post },
  pageContext: { from },
  navigate
}) => {
  const [submitButton, setSubmitButton] = useState(null)
  
  return (
    <Layout>
      <Header
        title="Feedback"
        primary={<Back to={from} />}
        secondary={submitButton}
      />
      <Container>
        <Project {...project} />
        <Post {...post} />
        <Form
          action={from}
          setSubmitButton={setSubmitButton} 
          navigate={navigate}
        />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query FeedbackByFrom($from: String!) {
    project: markdownRemark(fields: { slug: { eq: $from } }) {
      ...Project
      frontmatter {
        ...ProjectFrontmatter
      }
    }

    post: markdownRemark(fields: { slug: { eq: $from } }) {
      ...Post
      frontmatter {
        ...PostFrontmatter
      }
    }
  }
`
