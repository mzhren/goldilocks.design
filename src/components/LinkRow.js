import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import Link from './Link'
import Icon from './Icon'

export const Container = styled.div`
  padding: 0 ${props => props.theme.size[900]};
`

const LinkRow = styled(Link)`
  display: grid;
  margin: ${props => props.theme.size[500]} 0;
  padding: ${props => props.theme.size[500]};
  background-color: ${props => props.theme.isDarkMode ? props.theme.grayscale[800] : props.theme.grayscale[200]};
  border-radius: ${props => props.theme.size[500]};
  grid-template-areas: 
    "badge title detail arrow"
    "badge description detail arrow";
  grid-template-columns: ${props => props.theme.size[900]} auto auto ${props => props.theme.size[600]};
  grid-template-rows: ${props => props.theme.size[700]} ${props => props.theme.size[700]};
  grid-column-gap: ${props => props.theme.size[500]};
  color: inherit;

  &:hover {
    color: inherit;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const Badge = styled(Img)`
  width: ${props => props.theme.size[900]};
  height: ${props => props.theme.size[900]};
  border-radius: ${props => props.theme.size[400]};
  grid-area: badge;
`

const Title = styled.span`
  grid-area: title;
  font-weight: 700;
`

const Description = styled.span`
  grid-area: description;
  font-size: ${props => props.theme.size[500]};
  color: ${props => props.theme.grayscale[500]};
`

const Detail = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  grid-area: detail;
  font-size: ${props => props.theme.size[500]};
  color: ${props => props.theme.grayscale[500]};
`

const Arrow = styled(Icon).attrs({
  name: 'chevron-right',
  size: 600
})`
  margin: auto 0;
  grid-area: arrow;
  color: ${props => props.theme.grayscale[400]};
`

export default props => (
  <LinkRow to={props.to}>
    <Badge fluid={props.badge} />
    <Title>{props.title}</Title>
    <Description>{props.description}</Description>
    <Detail>{props.detail}</Detail>
    <Arrow />
  </LinkRow>
)
