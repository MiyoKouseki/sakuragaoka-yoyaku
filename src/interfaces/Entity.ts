//Entity.ts

interface Organization {
    name: string;
    representative: string;
    phone: string;
}

interface Room {
    id: string;
    name: string;
    location: string;
    category: string;
    owner: string;
}

interface Reservation {
    id: string;
    roomName: string;
    organizationName: string;
    startTime: string;
    endTime: string;
}

interface Event {
    id?: string;
    title: string;
    color?: string;
    roomName: string;
    start: Date;
    end: Date;
}

export interface SubmitDataParams<T> {
    collectionName: string;
    data: T;
    validateData: (data: T) => boolean;
    navigatePath: string;
}


type Entity = Organization | Room;

export function isRoom(entity: Entity): entity is Room {
    return 'location' in entity;
}

export function isOrganization(entity: Entity): entity is Organization {
    return 'representative' in entity;
}

export type { Entity, Room, Organization, Reservation, Event }; 