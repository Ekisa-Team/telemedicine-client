const getParticipantName = identity => {
  const name = identity.split('-')[0];
  return name;
};

export const RoomUtils = {getParticipantName};
