import styled from 'styled-components'

const isPrimary = (is, isNot) => props =>
  props.type === 'primary' ? is : isNot

const getBackgroundColor = props => isPrimary(
  props.theme.colors.blue,
  props.theme.colors.black[200],
)

const getTextColor = props => isPrimary(
  'white',
  props.theme.colors.black[900],
)

const Bubble = styled.p`
  display: flex;
  position: relative;
  padding: ${props => props.theme.size[250]} ${props => props.theme.size[350]};
  margin-bottom: 0;
  align-items: center;
  border-radius: ${props => props.theme.size[350]};
  background-color: ${getBackgroundColor};
  color: ${getTextColor};
  min-height: ${props => props.theme.size[450]};
  line-height: 1.25;
  will-change: border-radius;
  transition: border-radius 0.1s ease-out;

  ${props => props.theme.media.tabletHorizontal`
    padding: ${props => props.theme.size[300]} ${props => props.theme.size[400]};
    min-height: ${props => props.theme.size[500]};
    border-radius: ${props => props.theme.size[500]};
  `}

  ${props => props.theme.media.tabletVertical`
    padding: ${props => props.theme.size[350]} ${props => props.theme.size[450]};
    min-height: ${props => props.theme.size[550]};
    border-radius: ${props => props.theme.size[550]};
  `}

  ${props => props.theme.media.phone`
    padding: ${props => props.theme.size[400]} ${props => props.theme.size[500]};
    min-height: ${props => props.theme.size[650]};
    border-radius: ${props => props.theme.size[650]};
  `}
`

export default Bubble
