import React from 'react'

export default function AccomodationDetails() {
  const { accommodationId: accommodationIdParam } = useParams<{ accommodationId: string }>();
  const accommodationId = accommodationIdParam ? parseInt(accommodationIdParam, 10) : undefined;
  const [liked, setLiked] = useState(false);
  const { accommodationId: accommodationIdParam } = useParams<{
    accommodationId: string;
  }>();
  const accommodationId = accommodationIdParam
    ? parseInt(accommodationIdParam, 10)
    : undefined;
  const [liked, setLiked] = useState(false);

  const onLiked = () => {
    setLiked(!liked);
  };

  const onShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Blue Lagoon Hotel",
          text: "Check out this beautiful hotel!",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      alert("Sharing not supported on this browser.");
    }
  };
  return (
    <div>
      
    </div>
  )
}
