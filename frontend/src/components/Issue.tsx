import React from 'react'
import { useDispatch } from 'react-redux'
import {
  addToPening,
  addToClosed,
  deleteIssue,
} from '../store/actions/issues-actions'
import './Issue.css'
interface Props {
  title: string
  description: string
  type: string
  id: number
  color: string
}

export const Issue: React.FC<Props> = ({ title, description, type, id, color }) => {
  const dispatch = useDispatch()

  let buttonTitle = ''

  switch (type) {
    case 'open': {
      buttonTitle = 'TO PENDING'
      break
    }
    case 'pending': {
      buttonTitle = 'TO CLOSED'
      break
    }
    case 'closed': {
      buttonTitle = 'DELETE'
      break
    }
  }

  return (
    <div style={ {borderColor: color} } className="issue-wraper">
      <h3 className="issue-header">{title}</h3>
      <p className="issue-description">{description}</p>
      <button
        className="issue-button"
        onClick={() => {
          if (type === 'open') {
            dispatch(addToPening(id))
          }
          if (type === 'pending') {
            dispatch(addToClosed(id))
          }
          if (type === 'closed') {
            dispatch(deleteIssue(id))
          }
        }}
      >
        {buttonTitle}
      </button>
    </div>
  )
}
