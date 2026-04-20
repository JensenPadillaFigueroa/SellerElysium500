import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AppShell } from './components/layout/AppShell'
import { HomeScreen } from './screens/HomeScreen'
import { DiscoverScreen } from './screens/DiscoverScreen'
import { CreateRequestScreen } from './screens/CreateRequestScreen'
import { RequestDetailScreen } from './screens/RequestDetailScreen'
import { MessagesScreen } from './screens/MessagesScreen'
import { ChatScreen } from './screens/ChatScreen'
import { DashboardScreen } from './screens/DashboardScreen'
import { ProfileScreen } from './screens/ProfileScreen'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/discover" element={<DiscoverScreen />} />
          <Route path="/create" element={<CreateRequestScreen />} />
          <Route path="/request/:id" element={<RequestDetailScreen />} />
          <Route path="/messages" element={<MessagesScreen />} />
          <Route path="/chat/:id" element={<ChatScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<HomeScreen />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <AppShell>
      <AnimatedRoutes />
    </AppShell>
  )
}

export default App
