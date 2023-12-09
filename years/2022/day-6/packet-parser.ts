type DataStream = string[];
type Packet = string[];

const getPacket = (dataStreamSequence: DataStream, index: number, packetSize: number): Packet => dataStreamSequence.slice(index - packetSize, index);
const isPacketSequenceUnique = (packet: Packet): boolean => new Set(packet).size === packet.length;

export const getMarkerFromDataStream = (dataStreamSequence: DataStream, packetSize: number): number =>
  dataStreamSequence.findIndex((_, index) => {
    if (packetSize > index) return false;
    const packet = getPacket(dataStreamSequence, index, packetSize);
    return isPacketSequenceUnique(packet);
  });
