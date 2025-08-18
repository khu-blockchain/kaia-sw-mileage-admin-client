export type SidebarMenu = {
	name: string;
	path?: string;
	subMenu?: SubMenu[];
};

export type SubMenu = {
	name: string;
	path: string;
};

export const SIDEBAR_MENU: SidebarMenu[] = [
	{
		name: "마일리지 토큰",
		subMenu: [
			{
				name: "토큰 배포",
				path: "/create-token",
			},
			{
				name: "토큰 관리",
				path: "/manage-token",
			},
		],
	},
	{
		name: "마일리지 배점 항목",
		path: "/manage-rubric",
	},
	{
		name: "학생 관리",
		path: "/student",
	},
	{
		name: "신청 내역",
		path: "/request",
	},
	{
		name: "지급 및 회수 내역",
		path: "/point-histories",
	},
	{
		name: "지갑 분실 요청",
		path: "/wallet-change",
	},
];
