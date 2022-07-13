import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPuzzle
} from '@coreui/icons'
import {CNavGroup, CNavItem, CNavTitle} from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Setup',
    to: '/configure/my-processes',
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
