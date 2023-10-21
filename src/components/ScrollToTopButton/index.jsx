import { UpOutline } from 'antd-mobile-icons'
import './index.scss'
import { useState, useEffect } from 'react'
import throttle from '@/utils/throttle'

function ScrollToTopButton({ color, fontSize }) {
  const [isVisible, setIsVisible] = useState(false)

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    setIsVisible(scrollTop > 0)
  }

  const throlledHandleScroll = throttle(handleScroll, 600)

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', throlledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throlledHandleScroll)
    }
  }, [])

  return (
    <button
      style={{ backgroundColor: color }}
      className={isVisible ? 'scroll-to-top visible' : 'scroll-to-top'}
      onClick={scrollToTop}
    >
      <UpOutline color="#fff" fontSize={fontSize} />
    </button>
  )
}

export default ScrollToTopButton
