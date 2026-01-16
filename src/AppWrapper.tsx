import { useNavigate, useLocation } from 'react-router-dom';
import ActivityJar from './App';
import TermsAndConditions from './components/TermsAndConditions';

export default function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/terms') {
    return <TermsAndConditions onBack={() => navigate(-1)} />;
  }

  return <ActivityJar />;
}
