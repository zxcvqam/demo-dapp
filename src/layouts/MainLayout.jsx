import React from 'react';

import './layout.scss'

const MainLayout = ({ children }) => {

  return (
    <div className="main-layout">
      {children}
    </div>
  )
}

export default MainLayout;