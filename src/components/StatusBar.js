import React from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import Battery from './Battery'
import Time from './Time'

const StatusBar = styled.div`
  display: grid;
  grid-area: statusbar;
  padding: 0 5vh;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  align-self: end;
  height: 10vh;
  font-size: 2.25vh;
  font-weight: 700;
  background-color: white;
  border-bottom: 0.25vh solid ${props => props.theme.colors.black[100]};
  user-select: none;
  color: ${props => props.theme.colors.black[200]};
  border-top-left-radius: 5vh;
  border-top-right-radius: 5vh;
  pointer-events: auto;
  z-index: 1;
`

const StatusLogo = styled(Logo)`
  width: 8vh;
`

const StatusTime = styled(Time)`
  justify-self: start;
`

const StatusBattery = styled(Battery)`
  justify-self: end;
`
export default props => {
  return (
    <StatusBar>
      <StatusTime />
      <StatusLogo />
      <StatusBattery />
    </StatusBar>
  )
}
