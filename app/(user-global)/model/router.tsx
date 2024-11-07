// models/Route.ts
export class Route {
    route_id: number|string;
    name_route: string;
    img_route: string;
    description_route: string;
    status: 'default' | 'customize';


    constructor(
        route_id: number|string,
        name_route: string,
        img_route: string,
        description_route: string,
        status: 'default' | 'customize' = 'default'

    ) {
        this.route_id = route_id;
        this.name_route = name_route;
        this.img_route = img_route;
        this.description_route = description_route;
        this.status = status;

    }


    displayInfo() {
        return `${this.name_route} - Mô tả: ${this.description_route} - Trạng thái: ${this.status}`;
    }
}
