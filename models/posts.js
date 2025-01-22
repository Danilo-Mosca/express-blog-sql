const tags = [
    { id: 1, title: "storia" },
    { id: 2, title: "arte" },
    { id: 3, title: "sport" },
    { id: 4, title: "attualità" },
    { id: 5, title: "musica" },
    { id: 6, title: "informatica" },
];

const posts = [
    {
        id: 1,
        title: "Post Roma",
        image: '../img/Rome.jpg',
        content:
            "Lorem ipsum inventore corporis deserunt hic. dolor sit amet consectetur, officiis veritatis magni blanditiis possimus nobis cum id  adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate",
        published: true,
        tags: ["storia, arte, musica"],
    },
    {
        id: 2,
        title: "Post Amsterdam",
        image: '../img/Amsterdam.jpg',
        content:
            "Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        published: true,
        tags: ["attualità, informatica, musica"],
    },
    {
        id: 3,
        title: "Post Athens",
        image: '../img/Athens.jpg',
        content:
            "Lorem ipsum inventore corporis deserunt hic. Sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id.",
        published: true,
        tags: ["sport, arte"],
    },
    {
        id: 4,
        title: "Post Londra",
        image: '../img/Londra.jpg',
        content:
            "Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
        published: true,
        tags: ["informatica, musica"],
    },
];

export { posts, tags };