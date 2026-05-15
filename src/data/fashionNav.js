/** Maps storefront “shops” to DummyJSON-style category slugs for filtering */
export const SHOP_SEGMENTS = {
    men: ['mens-shirts', 'mens-shoes', 'mens-watches'],
    women: ['womens-dresses', 'womens-shoes', 'womens-bags', 'womens-jewellery'],
    kids: ['tops', 'sunglasses'],
    beauty: ['beauty', 'fragrances'],
    'home-living': ['furniture', 'home-decoration'],
    studio: ['mens-shirts', 'womens-dresses', 'beauty', 'tops', 'fragrances'],
};

export const NAV_ITEMS = [
    { label: 'Men', shop: 'men' },
    { label: 'Women', shop: 'women' },
    { label: 'Kids', shop: 'kids' },
    { label: 'Beauty', shop: 'beauty' },
    { label: 'Home & Living', shop: 'home-living' },
    { label: 'Studio', shop: 'studio' },
];
