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
            icon: 'icon-pencil',
        },
        {
            name: 'Buku',
            url: '/buku',
            icon: 'icon-pencil',
        },
        {
            name: 'Sewa',
            icon: 'icon-pencil',
            children: [
                {
                    name: 'View',
                    url: '/sewa',
                    icon: 'icon-pencil',
                },
                {
                    name: 'Add',
                    url: '/sewa/add',
                    icon: 'icon-pencil',
                },
                {
                    name: 'Edit',
                    url: '/sewa/edit',
                    icon: 'icon-pencil',
                },
            ]
        },
    ],
};
