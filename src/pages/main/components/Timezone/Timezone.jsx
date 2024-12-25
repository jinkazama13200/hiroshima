import { useState, useEffect } from "react";

const Timezone = () => {
  const [timeZone, setTimeZone] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeZone(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeZone]);

  return (
    <div className="pointer-events-none select-none rounded-md bg-secondary-default px-4 py-2">
      <span>{timeZone.toLocaleString()}</span>
    </div>
  );
};

export default Timezone;
