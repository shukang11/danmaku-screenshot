import { Icons } from "@/components/icons";
import { LucideIcon } from "lucide-react";

export const MAIN_APP = {
    root: "/",
};

export const SETTING_ROOT = "/setting";

export const siteConfig = {
    title: "人员管理",
    description: "这是一个用于管理公司员工的工具",
    url: "http://localhost:3000",
    author: {
        name: "Shu Kang",
        email: "2332532718@qq.com",
        github: "https://github.com/shukang11",
    },
};

type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: MAIN_APP.root,
                    label: "看板",
                    active: pathname === MAIN_APP.root,
                    icon: Icons.layoutGrid,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: "",
            menus: [
                {
                    href: SETTING_ROOT,
                    label: "设置",
                    active: pathname.includes(SETTING_ROOT),
                    icon: Icons.squarePen,
                    submenus: [],
                },
            ],
        },
    ];
}
