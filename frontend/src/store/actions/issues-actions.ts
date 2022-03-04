export const ADD_ISSUE = 'ADD_ISSUE'
export const DELETE_ISSUE = 'DELETE_ISSUE'
export const ADD_TO_PENDING = 'ADD_TO_PENDING'
export const ADD_TO_CLOSED = 'ADD_TO_CLOSED'
export const GET_ISSUES = 'GET_ISSUES'

export const addIssue =
  (title: string, description: string, id: number) =>
  async (dispatch: Function) => {
    await fetch('/issues', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        id,
        title,
        description,
        status: 'open',
      }),
    })

    dispatch({ type: ADD_ISSUE, title: title, description, id })
    dispatch({ type: GET_ISSUES })
  }

export const addToPening = (id: number) => async (dispatch: Function) => {
  await fetch('/issues', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      id,
      status: 'pending',
    }),
  })

  dispatch({ type: ADD_TO_PENDING, id })
  dispatch({ type: GET_ISSUES })
}

export const addToClosed = (id: number) => async (dispatch: Function) => {
  await fetch('/issues', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      id,
      status: 'closed',
    }),
  })

  dispatch({ type: ADD_TO_CLOSED, id })
  dispatch({ type: GET_ISSUES })
}

export const deleteIssue = (id: number) => async (dispatch: Function) => {
  await fetch('/issues', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify({
      id,
    }),
  })

  dispatch({ type: DELETE_ISSUE, id })
  dispatch({ type: GET_ISSUES })
}

export const getIssues = () => async (dispatch: Function) => {
  const issues = await fetch('/issues').then((res) => res.json())

  dispatch({ type: GET_ISSUES, issues })
}
