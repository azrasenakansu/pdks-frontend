import { RoleEnum } from "./role-enum";

export class MenuItem {
    public name : string;
    public icon : string;
    public route : string;
    public requiredPermission : RoleEnum | null;

    constructor(name:string, icon:string, route:string, requiredPermission: RoleEnum | null){
        this.name = name;
        this.icon = icon;
        this.route = route;
        this.requiredPermission = requiredPermission;
    }

    public isAvailable(userPermission : RoleEnum) : boolean {
        return this.requiredPermission === null || userPermission === this.requiredPermission;
    }

    public isSelected(currentPath : string) : boolean{
        return currentPath === this.route;
    }
}

export const menuItems : MenuItem[] = [
    //new MenuItem("Ana Sayfa", "pi-home", "/dashboard", null),
    new MenuItem("Çalışma Raporu", "pi-chart-bar", "/reports", null),
    new MenuItem("Ek Çalışmalarım", "pi-book", "/externals", null),
    new MenuItem("Ek Çalışma Onayları", "pi-list-check", "/approvals", RoleEnum.ADMIN),
    new MenuItem("Kullanıcılar", "pi pi-user", "/users", RoleEnum.ADMIN),
    new MenuItem("PDKS Veri Yükleme", "pi-file-arrow-up", "/import", RoleEnum.ADMIN),
];