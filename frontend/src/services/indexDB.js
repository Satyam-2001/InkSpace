import { openDB, deleteDB, wrap, unwrap } from 'idb';
import default_pages from '../data/pages';

const validId = (id) => isNaN(Number(id)) ? id : Number(id)


// Function to add default pages
async function addDefaultPages(db) {
    for (const page of default_pages) {
        await db.add('pages', page);
    }

}

let dbPromise;

async function setupDatabase() {
    if (!dbPromise) {
        dbPromise = await openDB('ink-space', 2, {
            upgrade(db) {
                if (!db.objectStoreNames.contains('pages')) {
                    db.createObjectStore('pages', { keyPath: 'id', autoIncrement: true });
                }
            },
        });
        if (dbPromise.objectStoreNames.contains('pages') && !(await dbPromise.count('pages'))) {
            await addDefaultPages(dbPromise);
        }
    }

    return dbPromise;
}


export async function getAllPages() {
    try {
        const db = await setupDatabase();
        // Retrieve all records from the 'pages' object store
        const pages = await db.getAll('pages');
        return pages;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}



// Create (Add) a new page
export async function createPage(pageData) {
    try {
        const db = await setupDatabase();
        const result = await db.add('pages', pageData);
        return result;
    } catch (error) {
        console.error('Validation or database error:', error);
        throw error;
    }
}

// Read (Get) a page by ID
export async function getPage(id) {
    try {
        const db = await setupDatabase();
        const page = await db.get('pages', validId(id));
        return page;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

// Update a page by ID
export async function updatePage(id, updatedData) {
    try {

        const db = await setupDatabase();
        // Fetch the existing data
        const existingPage = await db.get('pages', validId(id));

        if (!existingPage) {
            throw new Error('Page not found');
        }

        // Merge existing data with updated data
        const updatedPage = { ...existingPage, ...updatedData };

        // Update the page
        await db.put('pages', updatedPage);
        return updatedPage;
    } catch (error) {
        console.error('Validation or database error:', error);
        throw error;
    }
}

// Delete a page by ID
export async function deletePage(id) {
    try {
        const db = await setupDatabase();
        await db.delete('pages', validId(id));
        return { success: true };
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}