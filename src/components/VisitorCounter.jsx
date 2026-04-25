import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch visitor count from Vercel Analytics API
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitors');
        const data = await response.json();

        if (data.error) {
          console.error('Analytics API error:', data.error);
          setIsLoading(false);
          return;
        }

        setVisitorCount(data.visitors);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch visitor count:', error);
        setIsLoading(false);
      }
    };

    fetchVisitorCount();

    // Update every 60 seconds to show live changes
    const interval = setInterval(() => {
      fetchVisitorCount();
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          color: '#E8E8E3',
        }}
      >
        <Eye size={16} color="#E8E8E3" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        color: '#E8E8E3',
      }}
    >
      <Eye size={16} color="#E8E8E3" />
      <span>
        {visitorCount?.toLocaleString() || '---'} visitors
      </span>
    </div>
  );
}

export default VisitorCounter;
