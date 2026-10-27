import { useEffect, useState } from 'react'
import BotDetail from './pages/BotDetail'
import ChatFullscreen from './pages/ChatFullscreen'
import ChatLogs from './pages/ChatLogs'
import ChatView from './pages/ChatView'
import CreateBot from './pages/CreateBot'
import Home from './pages/Home'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import OnboardingDetails from './pages/OnboardingDetails'
import Settings from './pages/Settings'
import Support from './pages/Support'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AdminSettingsEmail from './pages/admin/AdminSettingsEmail'
import AdminSettingsGeneral from './pages/admin/AdminSettingsGeneral'
import AdminSettingsLimits from './pages/admin/AdminSettingsLimits'
import AdminSubscription from './pages/admin/AdminSubscription'
import AdminUser from './pages/admin/AdminUser'
import SupportTickets from './pages/admin/SupportTickets'
import TicketView from './pages/admin/TicketView'

// Simple hash routing (#/home, #/chatlogs ...) so no router library is needed.
const routes = {
  '/': Login,
  '/onboarding': Onboarding,
  '/onboarding-2': OnboardingDetails,
  '/home': Home,
  '/create-bot': CreateBot,
  '/bot-detail': BotDetail,
  '/chatlogs': ChatLogs,
  '/chat-view': ChatView,
  '/support': Support,
  '/support/new': () => <Support showNewRequest />,
  '/settings': Settings,
  '/chat': ChatFullscreen,
  '/admin/login': AdminLogin,
  '/admin': AdminDashboard,
  '/admin/user': AdminUser,
  '/admin/subscription': AdminSubscription,
  '/admin/tickets': SupportTickets,
  '/admin/tickets/view': TicketView,
  '/admin/settings': AdminSettingsGeneral,
  '/admin/settings/email': AdminSettingsEmail,
  '/admin/settings/limits': AdminSettingsLimits,
}

const currentPath = () => window.location.hash.slice(1) || '/'

function App() {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    const onHashChange = () => {
      setPath(currentPath())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const Page = routes[path] ?? Login
  return <Page />
}

export default App
