import React from 'react'
import EmptyView from "./template_code/views/app-views/EmptyView";
const Login = React.lazy(() => import('./features/login/Login'))
const UploadData= React.lazy(() => import('./features/process/upload-data'))
const ExploreResults= React.lazy(() => import('./features/process/explore-results'))
const MyProcesses= React.lazy(() => import('./features/setup/list-processes/list-processes.component'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Overview', element: EmptyView },
  { path: '/claims', name: 'My Claims', element: EmptyView, exact: true },
  { path: '/claims/bulk-billing-csv', name: 'bulk-billing-csv', element: EmptyView },
  { path: '/claims/bulk-voiding-csv', name: 'bulk-voiding-csv', element: EmptyView },
  { path: '/claims/bulk-approve', name: 'bulk-approve', element: EmptyView },
  { path: '/claims/bulk-writeoff', name: 'bulk-writeoff', element: EmptyView },
  { path: '/configuration/hl7-tester', exact: true, name: 'hl7-tester' , element: EmptyView},
  { path: '/configuration/insurance-carriers', name: 'insurance-carriers', element: EmptyView },
  { path: '/configuration/referring-providers', name: 'referring-providers', element: EmptyView, exact: true },
  { path: '/configuration/processing-rules', name: 'processing-rules', element: EmptyView },
  { path: '/configuration/correction-rules', name: 'correction-rules', element: EmptyView },
  { path: '/configuration/rejection-rules', name: 'rejection-rules', element: EmptyView },
  { path: '/configuration/templates', name: 'templates', element: EmptyView },
  { path: '/configuration/my-team', name: 'my-team', element: EmptyView },
  { path: '/analytics/overview', name: 'correction-rules', element: EmptyView },
  { path: '/analytics/claims', name: 'rejection-rules', element: EmptyView },
  { path: '/analytics/payments', name: 'templates', element: EmptyView },
  { path: '/analytics/denials', name: 'my-team', element: EmptyView },

  // Setup
  { path: '/configure/my-processes', name: 'my-processes', element: MyProcesses, exact: true },

  // Process
  { path: '/process/upload-data', name: 'upload-data', element: UploadData, exact: true },
  { path: '/process/explore-results', name: 'explore-results', element: ExploreResults, exact: true },


  { path: '/login', name: 'login', element: Login },
]

export default routes

