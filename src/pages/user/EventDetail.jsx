import React from 'react';
import { useParams } from 'react-router-dom';

function EventDetail() {
  const { eventId } = useParams();

  return <div>
    Details for Event ID: {eventId}<br />
    from this page, let user to create website for this particular event
  </div>;
}

export default EventDetail