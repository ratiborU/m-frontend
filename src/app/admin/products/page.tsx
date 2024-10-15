import React from 'react';
import { productsData } from '@/services/mock/mockProducts';
import { productColumns } from './model/columns';
import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
// import Button from '@/components/UI/Button/Button';

// const requestFetch = async () => {
//     'use server'
//     const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//     const products = await response.json();
//     return products;
// }

const page = async () => {
    return (
        <div>
            {/* <Button text='кнопка' size='s' onClick={requestFetch}/> */}
            <BaseGrid columns={productColumns} data={productsData}/>
            
        </div>
    );
};

export default page;