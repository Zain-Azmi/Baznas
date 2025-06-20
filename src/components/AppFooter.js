import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a>
          BaznasCare
        </a>
        <span className="ms-1">&copy; 2025 Golden Minds.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
