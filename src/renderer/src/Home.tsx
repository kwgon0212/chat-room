import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './components/ui/button'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={() => navigate('/about')}>About으로</Button>
    </div>
  )
}

export default Home
