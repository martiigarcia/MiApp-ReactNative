class Location {
    constructor(location: Partial<Location>) {
        if (location) {
            Object.assign(this, location);
        }
    }
    id: number;
    name: string;
    contact: string;
    linkInfo: string;
    latitude: number;
    longitude: number;
}
export default Location;