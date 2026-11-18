const PRODUCTS = [
    {
        id: 1,
        name: "Unique Necklace",
        category: "Necklaces",
        price: 7000,
        image: "./public/images/store/WhatsApp%20Image%202026-10-30%20at%2015.46.31.jpeg",
        tag: "Standout style",
        description:
            "A distinctive beaded necklace made to add personality to your look. Wear it on its own or layer it with your favourite pieces.",
    },
    {
        id: 2,
        name: "Amethyst",
        category: "Necklaces",
        price: 30000,
        image: "./public/images/store/WhatsApp%20Image%202026-10-30%20at%2014.44.26.jpeg",
        tag: "Amethyst tones",
        description:
            "A bracelet set inspired by amethyst tones, with a rich beaded look that adds a colourful finishing touch to your style.",
    },
    {
        id: 3,
        name: "WHIMSY",
        category: "Bracelets",
        price: 6000,
        image: "./public/images/store/WhatsApp%20Image%202026-10-30%20at%2015.16.08.jpeg",
        tag: "Delicate design",
        description:
            "A beaded bracelet with a delicate design look and a hint of glow. Wear it solo or stack it with your other favourites.",
    },
    {
        id: 4,
        name: "White and black vancleef waistbeads (with chain)",
        category: "Waistbeads",
        price: 25000,
        image: "./public/images/store/WhatsApp Image 2026-10-30 at 15.45.05.jpeg",
        tag: "With chain detail",
        description:
            "Black and white waistbeads finished with a delicate chain detail. A striking mix of colour and texture for your waistbead collection.",
    },
    {
        id: 5,
        name: "Sugar waistbead set",
        category: "Waistbeads",
        price: 10000,
        image: "./public/images/store/WhatsApp%20Image%202026-10-30%20at%2015.18.35.jpeg",
        tag: "Waistbead set",
        description:
            "A sweet waistbead set with a soft, playful look. Wear the set together or style the strands to suit your outfit.",
    },
    {
        id: 6,
        name: "Fierce Male bracelet set",
        category: "Bracelets",
        price: 20000,
        image: "./public/images/store/WhatsApp%20Image%202026-10-30%20at%2015.48.25.jpeg",
        tag: "Men's bracelet set",
        description:
            "A bold bracelet set designed for a confident look. Wear the pieces together for a coordinated stack or separately for a simpler style.",
    },
    {
        id: 7,
        name: "Purple heart necklace",
        category: "Necklaces",
        price: 7000,
        image: "./public/images/store/WhatsApp%20Image%202026-10-30%20at%2015.45.42.jpeg",
        tag: "Purple heart",
        description:
            "A necklace featuring a purple heart detail for a sweet pop of colour. Pair it with a simple neckline to let the pendant stand out.",
    },
    {
        id: 8,
        name: "Brown and gold Vancleef waistbeads",
        category: "Waistbeads",
        price: 15000,
        image: "./public/images/store/WhatsApp%20Image%202026-10-30%20at%2015.47.16.jpeg",
        tag: "Brown & gold",
        description:
            "Brown waistbeads accented with gold-toned details for a warm, polished look. Style them on their own or alongside your favourites.",
    },
    {
        id: 9,
        name: "Red and Gold waistbead set",
        category: "Waistbeads",
        price: 14000,
        image: "./public/images/store/WhatsApp Image 2026-10-30 at 14.45.36.jpeg",
        tag: "Red & gold set",
        description:
            "A red and gold waistbead set that brings a bold, warm colour combination to your look. Wear the strands together for a coordinated finish.",
    },
    {
        id: 10,
        name: "Cross Custom Breaded Necklace",
        category: "Necklaces",
        price: 20000,
        image: "./public/images/store/WhatsApp Image 2026-10-30 at 15.25.42.jpeg",
        tag: "Cross detail",
        description:
            "A custom-style beaded necklace featuring a cross detail. A meaningful accent to wear every day or give as a thoughtful gift.",
    },
    {
        id: 11,
        name: "Wish bracelet set",
        category: "Bracelets",
        price: 7000,
        image: "./public/images/store/WhatsApp Image 2026-10-30 at 15.50.32.jpeg",
        tag: "Bracelet set",
        description:
            "A set of wish bracelets with a simple, easy-to-layer look. Wear one at a time or stack them together.",
    },
    {
        id: 12,
        name: "Blush",
        category: "Necklaces",
        price: 15000,
        image: "./public/images/store/WhatsApp Image 2026-11-05 at 11.18.39.jpeg",
        tag: "Blush tones",
        description:
            "A soft blush-toned beaded piece with a delicate charm detail. Add a gentle touch of colour to your everyday look.",
    },
    {
        id: 13,
        name: "Star waistbead set",
        category: "Waistbeads",
        price: 7000,
        image: "./public/images/store/WhatsApp Image 2026-10-30 at 15.52.32.jpeg",
        tag: "Star detail",
        description:
            "A waistbead set finished with star details for a playful, celestial touch. Wear the strands together or mix them with other waistbeads.",
    },
    {
        id: 14,
        name: "One bracelet stack",
        category: "Bracelets",
        price: 7000,
        image: "./public/images/store/WhatsApp Image 2026-10-30 at 15.52.33.jpeg",
        tag: "Bracelet stack",
        description:
            "A ready-to-wear bracelet stack that makes layering effortless. Wear the bracelets together for a coordinated look.",
    },
    {
        id: 15,
        name: "Candy waistbeads",
        category: "Waistbeads",
        price: 8000,
        image: "./public/images/store/WhatsApp Image 2026-10-30 at 19.01.38.jpeg",
        tag: "Candy colours",
        description:
            "Candy-coloured waistbeads that bring a bright, playful accent to your look. Wear them alone or pair them with other strands.",
    },
    {
        id: 16,
        name: "Velvet",
        category: "Anklets",
        price: 5000,
        image: "./public/images/store/WhatsApp Image 2026-11-07 at 13.55.06.jpeg",
        tag: "Soft sparkle",
        description:
            "A lightweight velvet anklet with a soft, feminine finish. It is easy to style for everyday wear and adds a subtle touch of elegance to any outfit.",
    }, {
        id: 17,
        name: "Pink Glow in the dark waistbead set",
        category: "Waistbeads",
        price: 15000,
        image: "./public/images/store/WhatsApp Image 2026-10-30 at 15.11.42.jpeg",
        tag: "Glow-in-the-dark",
        description:
            "A pink waistbead set with glow-in-the-dark beads for a playful look that stands out after dark.",
    }, {
        id: 18,
        name: "Sugar",
        category: "Anklets",
        price: 1000,
        image: "./public/images/store/WhatsApp Image 2026-11-07 at 13.55.06(1).jpeg",
        description:
            "A playful sugar anklet with a clean, delicate design. It adds a sweet finishing touch to your look without feeling heavy or overdone.",
    }, {
        id: 19,
        name: "Dove Anklet",
        category: "Anklets",
        price: 4000,
        image: "./public/images/store/WhatsApp Image 2026-11-07 at 13.55.07.jpeg",
        tag: "Dove detail",
        description:
            "A refined anklet with a dove-inspired detail that brings a graceful, soft statement to your everyday style. It is light, elegant, and easy to wear.",
    },
];