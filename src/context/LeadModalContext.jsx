import React, { createContext, useContext, useState, useCallback } from 'react'

const LeadModalContext = createContext({
  isOpen: false,
  modalType: 'build-product', // 'build-product' | 'convertleads-demo' | 'rtmnu-demo' | 'echaii-demo' | 'innovexa-demo' | 'contact'
  contextMeta: {},
  openLeadModal: () => {},
  closeLeadModal: () => {},
})

export function LeadModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState('build-product')
  const [contextMeta, setContextMeta] = useState({})

  const openLeadModal = useCallback((type = 'build-product', meta = {}) => {
    setModalType(type)
    setContextMeta(meta)
    setIsOpen(true)
  }, [])

  const closeLeadModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <LeadModalContext.Provider
      value={{
        isOpen,
        modalType,
        contextMeta,
        openLeadModal,
        closeLeadModal,
      }}
    >
      {children}
    </LeadModalContext.Provider>
  )
}

export function useLeadModal() {
  const context = useContext(LeadModalContext)
  if (!context) {
    throw new Error('useLeadModal must be used within a LeadModalProvider')
  }
  return context
}
