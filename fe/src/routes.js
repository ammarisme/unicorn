import React from 'react'
import EmptyView from "./views/app-views/EmptyView";
import ClaimReview from "./features/claim-review/ClaimReview";
import RecievedClaims from "./features/claim-review/Recieved";
const Login = React.lazy(() => import('./features/login/Login'))
const HL7Summary = React.lazy(() => import('./features/reports/Hl7SummaryReport'))
const UploadData= React.lazy(() => import('./features/process/upload-data'))
const ExploreResults= React.lazy(() => import('./features/process/explore-results'))
const MyBotsView= React.lazy(() => import('./features/bots/my-bots-view'))
const MyRules= React.lazy(() => import('./features/rules/my-rules'))
const MyConditions= React.lazy(() => import('./features/rules/my-conditions'))
const MyActions= React.lazy(() => import('./features/rules/my-actions'))


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
  { path: '/reports/received-claims-summary', name: 'received-claims-summary', element: HL7Summary, exact: true },

  // Claim Review
  { path: '/claims/claim-review/:id', name: 'claim-review', element: ClaimReview, exact: true },
  { path: '/claims/claim-review/received', name: 'claim-review-received', element: RecievedClaims, exact: true },

  // Rules Engine
  { path: '/rules/my-rules', name: 'my-rules', element: MyRules, exact: true },
  { path: '/rules/my-conditions', name: 'my-conditions', element: MyConditions, exact: true },
  { path: '/rules/my-actions', name: 'my-actions', element: MyActions, exact: true },

  // Process
  { path: '/process/upload-data', name: 'upload-data', element: UploadData, exact: true },
  { path: '/process/explore-results', name: 'explore-results', element: ExploreResults, exact: true },

  // Bots
  { path: '/bots/my-bots', name: 'my-bots', element: MyBotsView, exact: true },

  { path: '/login', name: 'login', element: Login },
]

export default routes

