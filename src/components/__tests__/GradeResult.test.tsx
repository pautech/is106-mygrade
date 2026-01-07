import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'

import { GradeResult } from '../GradeResult'

describe('GradeResult', () => {
  it('renders Passed layout', () => {
    const student = {
      status: 'Passed',
      displayGrade: '1.25',
      name: 'Alice',
      course: 'Math 101',
      instructor: 'Prof. X'
    }

    render(<GradeResult student={student} />)

    expect(screen.getByText('Congratulations, you have passed!')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('1.25')).toBeInTheDocument()
  })

  it('renders Intervention layout', () => {
    const student = {
      status: 'Intervention',
      displayGrade: 'INC',
      name: 'Bob',
      course: 'Science',
      instructor: 'Dr. Y'
    }

    render(<GradeResult student={student} />)

    expect(screen.getByText('Needs Intervention')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('INC')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Join Group Chat/i })).toBeInTheDocument()
  })

  it('renders fallback for unknown status', () => {
    const student = {
      status: 'WeirdStatus',
      displayGrade: 'N/A',
      name: 'Charlie',
      course: 'Art',
      instructor: 'Ms. Z'
    }

    render(<GradeResult student={student} />)

    expect(screen.getByText(/Status Unknown:/)).toHaveTextContent('Status Unknown: WeirdStatus')
  })
})
