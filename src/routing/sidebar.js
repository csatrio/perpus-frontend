export default {
    items: [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'icon-speedometer',
            badge: {
                variant: 'info',
                text: 'NEW',
            },
        },
        {
            name: 'Anggota',
            url: '/anggota',
            icon: 'icon-user-follow',
        },
        {
            name: 'Input Form Sample',
            url: '/input',
            icon: 'icon-user-follow',
        },
        {
            name: 'Buku',
            url: '/buku',
            icon: 'icon-note',
        },
        {
            name: 'Sewa',
            url: '/sewa',
            icon: 'icon-chart',
            children: [
                {
                    name: 'View',
                    url: '/sewa',
                    icon: 'icon-star',
                },
                {
                    name: 'Add',
                    url: '/sewa/add',
                    icon: 'icon-pencil',
                },
            ]
        },
    ],
};
