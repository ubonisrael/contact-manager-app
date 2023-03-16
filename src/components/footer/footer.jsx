import React from 'react'
import './footer.css'

export const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <footer >
      
      <a href="https://github.com/ubonisrael">Developed by Ubonisrael Akpanudoh {currentYear}</a> </footer>
  )
}
