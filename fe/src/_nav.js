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
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
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
  {
    component: CNavGroup,
    name: 'Rules',
    to: '/rules/',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon"/>,
    items: [
      {
        component: CNavItem,
        name: 'My Rules',
        to: '/rules/my-rules',
      },
      {
        component: CNavItem,
        name: 'My Actions',
        to: '/rules/my-actions',
      },
      {
        component: CNavItem,
        name: 'My Conditions',
        to: '/rules/my-conditions',
      }
    ],
  },
  {
    component: CNavItem,
    name: 'Bots',
    to: '/bots/my-bots',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon"/>,

  },
]

export default _nav

// {
//   component: CNavTitle,
//     name: 'Tools',
// },
// {
//   component: CNavGroup,
//     name: 'Tools',
//   to: '/tools',
//   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon"/>,
//   items: [
//   {
//     component: CNavItem,
//     name: 'HL7 test tool',
//     to: '/tools/hl7-test-tool',
//   },
// ],
// },
// {
//   component: CNavGroup,
//     name: 'Tools',
//   to: '/tools',
//   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon"/>,
//   items: [
//   {
//     component: CNavItem,
//     name: 'HL7 test tool',
//     to: '/tools/hl7-test-tool',
//   },
// ],
// },
