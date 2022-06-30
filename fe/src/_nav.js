import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import {CNavGroup, CNavItem, CNavTitle} from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Configure',
    to: '/configure/',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon"/>,
    items: [
      {
        component: CNavItem,
        name: 'My Processes',
        to: '/configure/my-processes',
      },
      {
        component: CNavItem,
        name: 'Actions',
        to: '/configure/my-actions',
      },
      {
        component: CNavItem,
        name: 'Conditions',
        to: '/configure/my-conditions',
      }
    ],
  },
  {
    component: CNavItem,
    name: 'Bots',
    to: '/bots/my-bots',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon"/>,

  },
  {
    component: CNavGroup,
    name: 'Process',
    to: '/process',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon"/>,
    items: [
      {
        component: CNavItem,
        name: 'Upload batch',
        to: '/process/upload-data',
      },
      {
        component: CNavItem,
        name: 'Explore Results',
        to: '/process/explore-results',
      }
    ],
  },
]

export default _nav
