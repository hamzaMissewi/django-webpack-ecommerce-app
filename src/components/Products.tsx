import React, {useMemo} from 'react';

interface Products {
    id: number;
    name: string;
    averageReview: number
}

interface Props {
    products: Products[];
}

const Products: React.FC<Props> = ({products}) => {

    return (
        <div>
            <h1>Welcome to My eCommerce Store</h1>
            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.averageReview < 0.5 ? "low" : product.averageReview < 1.5 ? "medium" : "5 stars"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const getStaticProps = async () => {
    // Fetch data from an API or database
    const res = await fetch('https://localhost:8080/graphql/products');
    const products: Products[] = await res.json();

    return {
        props: {
            products,
        },
    };
};

export default Products