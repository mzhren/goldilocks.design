import React from 'react'
import { useSettings, useDevice } from '../hooks/state'
import styled from 'styled-components'

import { BlobAnimated } from './Blob'

const Background = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-top: ${props => props.theme.size.layout[100]} solid ${props => props.isOff || props.isDarkMode
    ? props.theme.colors.black[800] 
    : props.theme.colors[props.color][props.colorWeight]
  };
  background-color: ${props => props.isOff || props.isDarkMode
    ? props.theme.colors.black[900] 
    : props.theme.colors.black[100]
  };
  will-change: border-top, background-color;
  transition: border-top .2s ease-out, background-color .2s ease-out;
`

const BackgroundBlob = styled(BlobAnimated).attrs({
  color: props => props.isOff
    ? props.theme.colors.black[800] 
    : props.theme.colors[props.color][props.colorWeight]
})`
  height: ${props => props.theme.size.layout[600]};
`

export default ({ color, colorWeight}) => {
  const [{ isDarkMode }] = useSettings()
  const [{ isOff }] = useDevice()
  const backgroundProps = {
    color,
    colorWeight,
    isDarkMode,
    isOff
  }

  return (
    <Background {...backgroundProps}>
      <BackgroundBlob {...backgroundProps} />
    </Background>
  )
}
