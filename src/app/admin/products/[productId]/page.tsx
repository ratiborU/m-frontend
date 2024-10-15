import React from 'react';

const page = ({ params }: { params: { productId: string } }) => {
    // console.log(params)
    return (
        <div>
            продукт {params.productId}
        </div>
    );
};

export default page;