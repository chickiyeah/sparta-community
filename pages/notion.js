const { Client } = require('@notionhq/client');

const client = new Client({ auth: process.env.secret_yzPQlULfdwQDfGVWAUoX1hMYQZHFGyXU9J0Omc7ZRUB });

export default async function notion () {
    const pageId = '59833787-2cf9-4fdf-8782-e53db20768a5';
    const response = await client.pages.retrieve({ page_id: pageId });
    console.log(response);
  };