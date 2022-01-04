import React from 'react'

import { store } from '~/store'

const Home = React.lazy(() => import('~/pages/Home'))
const DevHub = React.lazy(() => import('~/pages/Dev'))
const SignIn = React.lazy(() => import('~/pages/Auth/SignIn'))
const Profile = React.lazy(() => import('~/pages/Auth/Profile'))
const MyClasses = React.lazy(() => import('~/pages/MyClasses'))
const TermsOfUse = React.lazy(() => import('~/pages/TermsOfUse'))
const PrivacyPolicy = React.lazy(() => import('~/pages/PrivacyPolicy'))
const PrivacyStatement = React.lazy(() => import('~/pages/PrivacyStatement'))
const ForgotFail = React.lazy(() => import('~/pages/Auth/ForgotFail'))
const ExpiredToken = React.lazy(() => import('~/pages/Auth/ExpiredToken'))
const ChangePassword = React.lazy(() => import('~/pages/Auth/ChangePassword'))
const ForgotPassword = React.lazy(() => import('~/pages/Auth/ForgotPassword'))
const Solutions = React.lazy(() => import('~/pages/Solutions'))
const NoBreakAccess = React.lazy(() => import('~/pages/NoBreakAccess'))
const PDF = React.lazy(() => import('~/pages/PDF'))

const { guid } = store.getState().profile

export default [
  { path: '/', isPrivate: true, exact: true, component: Home },
  { path: '/login', isPrivate: false, exact: false, component: SignIn },
  { path: '/perfil', isPrivate: false, exact: false, component: Profile },
  {
    path: '/solucao/literatura-ctpm',
    isPrivate: true,
    exact: true,
    component: PDF
  },
  {
    path: '/esqueci-minha-senha',
    isPrivate: false,
    exact: false,
    component: ForgotPassword
  },
  {
    path: '/esqueci-minha-senha/falhou',
    isPrivate: false,
    exact: false,
    component: ForgotFail
  },
  {
    path: '/alterar-senha',
    isPrivate: false,
    exact: false,
    component: ChangePassword
  },
  {
    path: '/token-expirado',
    isPrivate: false,
    exact: false,
    component: ExpiredToken
  },
  {
    path: '/dev',
    isPrivate: true,
    component: DevHub,
    active: process.env.REACT_APP_NODE_ENV === 'development'
  },
  {
    path: '/minhas-turmas',
    isPrivate: true,
    component: MyClasses,
    active: guid === 'PROFESSOR'
  },
  {
    path: '/solucao/literatura-ctpm',
    isPrivate: true,
    exact: true,
    component: PDF
  },
  {
    path: ['/solucao/:solution/:subpath+', '/solucao/:solution'],
    isPrivate: true,
    component: Solutions
  },
  {
    path: '/termos-de-uso',
    byPass: true,
    component: TermsOfUse
  },
  {
    path: '/aviso-de-privacidade',
    byPass: true,
    component: PrivacyStatement
  },
  {
    path: '/politica-de-privacidade',
    byPass: true,
    component: PrivacyPolicy
  },
  {
    path: '/acesso-alternativo',
    byPass: true,
    component: NoBreakAccess
  }
]
