import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'

import Logo from './Logo'

const BlogBar = styled.div`
  display: grid;
  grid-area: blogbar;
  padding: 0 5vh;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  align-self: end;
  height: 10vh;
  font-size: 2.25vh;
  background-color: white;
  border-bottom: 0.25vh solid ${props => props.theme.colors.black[100]};
  user-select: none;
  color: ${props => props.theme.colors.black[800]};
  border-top-left-radius: 5vh;
  border-top-right-radius: 5vh;
  pointer-events: auto;
  z-index: 1;
`

const BrandLogo = styled(Logo)`
  width: 6vh;
`

const BrandHome = styled(Link).attrs({
  to: '/'
})`
  padding: 1em 1em 1em 0;
  justify-self: start;
  /* font-weight: 700; */
  color: inherit;

  &:hover {
    color: inherit;
  }
`

const BrandHomeIcon = styled(FontAwesomeIcon).attrs({
  icon: 'angle-left'
})`
  transform: scale(1.5);
  margin-right: 1em;
  color: ${props => props.theme.colors.black[200]};
`

const PostTitle = styled.span`
  font-weight: 700;
  color: ${props => props.theme.colors.black[900]};
`

const PostDate = styled.span`
  justify-self: end;
`

export default ({
    siteTitle,
    title,
    date,
    timeToRead,
    isSticky,
    ...props
  }) => {
  return (
    <BlogBar {...props}>
      <BrandHome>
        <BrandHomeIcon />
        {siteTitle}
      </BrandHome>

      {isSticky ? (
        <PostTitle children={title} />
      ) : (
        <BrandLogo />
      )}

      <PostDate>
        {moment(date).format('MMMM DDDo, YYYY')}
      </PostDate>
    </BlogBar>
  )
}
