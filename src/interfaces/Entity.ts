//Entity.ts

interface Organization {
    name: string;
    representative: string;
    phone: string;
}

interface Room {
    name: string;
    location: string;
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

export type { Entity, Room, Organization }; 