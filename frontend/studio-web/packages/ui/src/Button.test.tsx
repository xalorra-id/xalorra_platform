import { render } from '@testing-library/react'
import { Button } from './Button'

test('Button renders children', () => {
  const { getByText } = render(<Button>Test</Button>)
  expect(getByText('Test')).toBeInTheDocument()
})
