import {
  ADD_ISSUE,
  ADD_TO_CLOSED,
  ADD_TO_PENDING,
  DELETE_ISSUE,
  GET_ISSUES,
} from '../actions/issues-actions'

interface issue {
  title: string
  description: string
  id: number
}

interface issuesState {
  openIssues: Array<issue>
  pendingIssues: Array<issue>
  closedIssues: Array<issue>
}

const initialState: issuesState = {
  openIssues: [],
  pendingIssues: [],
  closedIssues: [],
}

export const issuesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ISSUES:
      const newState = {
        openIssues: action.issues.filter(
          (issue: { status: string }) => issue.status === 'open',
        ),
        pendingIssues: action.issues.filter(
          (issue: { status: string }) => issue.status === 'pending',
        ),
        closedIssues: action.issues.filter(
          (issue: { status: string }) => issue.status === 'closed',
        ),
      }
      return newState

    case ADD_ISSUE:
      const newIssue = {
        title: action.title,
        description: action.description,
        id: action.id,
      }
      return {
        ...state,
        openIssues: state.openIssues.concat(newIssue),
      }

    case ADD_TO_PENDING:
      const removingOpenIssueIndex = state.openIssues.findIndex(
        (openIssue) => openIssue.id === action.id,
      )
      return {
        ...state,
        pendingIssues: state.pendingIssues.concat(
          state.openIssues.splice(removingOpenIssueIndex, 1),
        ),
      }

    case ADD_TO_CLOSED:
      const removingPendingIssueIndex = state.pendingIssues.findIndex(
        (openIssue) => openIssue.id === action.id,
      )
      return {
        ...state,
        closedIssues: state.closedIssues.concat(
          state.pendingIssues.splice(removingPendingIssueIndex, 1),
        ),
      }

    case DELETE_ISSUE:
      return {
        ...state,
        closedIssues: state.closedIssues.filter(
          (closedIssue) => closedIssue.id !== action.id,
        ),
      }

    default:
      return state
  }
}
