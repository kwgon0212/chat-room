import { Button } from '@renderer/components/ui/button'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const AboutPage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={() => navigate('/')}>Home으로</Button>
    </div>
  )
}

export default AboutPage
