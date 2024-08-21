import { Role } from "./role";

export class MenuItem {
    public name : string;
    public icon : string;
    public route : string;
    public requiredPermission : Role | null;

    constructor(name:string, icon:string, route:string, requiredPermission: Role | null){
        this.name = name;
        this.icon = icon;
        this.route = route;
        this.requiredPermission = requiredPermission;
    }

    public isAvailable(userPermission : Role) : boolean {
        return this.requiredPermission === null || userPermission === this.requiredPermission;
    }

    public isSelected(currentPath : string) : boolean{
        return currentPath === this.route;
    }
}

export const menuItems : MenuItem[] = [
    new MenuItem("Ana Sayfa", "pi-home", "/dashboard", null),
    new MenuItem("Etiketler", "pi-tags", "/exercise-tags", Role.ADMIN),
];