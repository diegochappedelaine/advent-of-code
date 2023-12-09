type Time = number;
type Distance = number;

export interface Race {
  time: Time;
  distance: Distance;
}
export type Races = Race[];

const calculateDistance = (holdDuration: Time, raceDuration: Time): Distance => (raceDuration - holdDuration) * holdDuration;

const getHoldOptions = (raceDuration: Time): Time[] => Array.from({ length: raceDuration + 1 }, (_, i) => i);

export const getWinningHoldDurationsCount = ({ distance, time }: Race): number => {
  const holdOptions = getHoldOptions(time);

  const results = holdOptions.map((holdDuration) => ({
    holdDuration,
    distance: calculateDistance(holdDuration, time),
  }));

  return results.filter((result) => result.distance > distance).length;
};
