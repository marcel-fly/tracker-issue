import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addIssue } from '../store/actions/issues-actions'
import './InputLabel.css'
interface Props {}

type Issue = {
  title: string
  description: string
}

export const InputLabel: React.FC<Props> = () => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Issue>()

  const onSubmit = handleSubmit((issueData) => {
    const d = new Date()
    console.log(d.getTime())
    dispatch(addIssue(issueData.title, issueData.description, d.getTime()))
  })

  useEffect(() => {
    reset({ description: '', title: '' })
  }, [isSubmitSuccessful, reset])

  return (
    <form className="inputLabel-form" onSubmit={onSubmit}>
      <div className="inputLabel-title">
        <input
          className="inputLabel-input"
          placeholder="Title"
          {...register('title', { required: true })}
          type="text"
          name="title"
          id="title"
        />
        {errors.title && (
          <div className="inputLabel-error">
            <p className="inputLabel-error-prapgraph">Enter title</p>
          </div>
        )}
      </div>
      <div className="inputLabel-description">
        <input
          className="inputLabel-input"
          placeholder="Description"
          {...register('description', { required: true })}
          type="text"
          name="description"
          id="description"
        />
        {errors.description && (
          <div className="inputLabel-error">
            <p className="inputLabel-error-prapgraph">Enter description</p>
          </div>
        )}
      </div>
      <button type="submit">ADD ISSUE</button>
    </form>
  )
}
