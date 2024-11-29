/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticatedDashboardImport } from './routes/_authenticated/dashboard'
import { Route as authLoginImport } from './routes/(auth)/login'
import { Route as AuthenticatedWorkflowWorkflowIdImport } from './routes/_authenticated/workflow/$workflowId'

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedDashboardRoute = AuthenticatedDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const authLoginRoute = authLoginImport.update({
  id: '/(auth)/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedWorkflowWorkflowIdRoute =
  AuthenticatedWorkflowWorkflowIdImport.update({
    id: '/workflow/$workflowId',
    path: '/workflow/$workflowId',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/login': {
      id: '/(auth)/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/dashboard': {
      id: '/_authenticated/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthenticatedDashboardImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/workflow/$workflowId': {
      id: '/_authenticated/workflow/$workflowId'
      path: '/workflow/$workflowId'
      fullPath: '/workflow/$workflowId'
      preLoaderRoute: typeof AuthenticatedWorkflowWorkflowIdImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedDashboardRoute: typeof AuthenticatedDashboardRoute
  AuthenticatedWorkflowWorkflowIdRoute: typeof AuthenticatedWorkflowWorkflowIdRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedDashboardRoute: AuthenticatedDashboardRoute,
  AuthenticatedWorkflowWorkflowIdRoute: AuthenticatedWorkflowWorkflowIdRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRouteWithChildren
  '/login': typeof authLoginRoute
  '/dashboard': typeof AuthenticatedDashboardRoute
  '/workflow/$workflowId': typeof AuthenticatedWorkflowWorkflowIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRouteWithChildren
  '/login': typeof authLoginRoute
  '/dashboard': typeof AuthenticatedDashboardRoute
  '/workflow/$workflowId': typeof AuthenticatedWorkflowWorkflowIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/(auth)/login': typeof authLoginRoute
  '/_authenticated/dashboard': typeof AuthenticatedDashboardRoute
  '/_authenticated/workflow/$workflowId': typeof AuthenticatedWorkflowWorkflowIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/login' | '/dashboard' | '/workflow/$workflowId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/login' | '/dashboard' | '/workflow/$workflowId'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/(auth)/login'
    | '/_authenticated/dashboard'
    | '/_authenticated/workflow/$workflowId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  authLoginRoute: typeof authLoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  authLoginRoute: authLoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/(auth)/login"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/dashboard",
        "/_authenticated/workflow/$workflowId"
      ]
    },
    "/(auth)/login": {
      "filePath": "(auth)/login.tsx"
    },
    "/_authenticated/dashboard": {
      "filePath": "_authenticated/dashboard.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/workflow/$workflowId": {
      "filePath": "_authenticated/workflow/$workflowId.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
