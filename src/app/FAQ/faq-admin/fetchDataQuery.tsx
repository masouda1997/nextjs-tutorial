import React from 'react'

const fetchDataQuery =async (url: string) => {
      try {
         const res = await fetch(url);
         if (!res.ok) {
            throw new Error('Failed to fetch data');
         }
         return res.json();
      } catch (err) {
         console.error(err);
      }

}

export default fetchDataQuery
