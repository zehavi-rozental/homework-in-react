const books = [
    { id: 1, title: "book1", author: "author1" },
    { id: 2, title: "book2", author: "author2" },
    { id: 3, title: "book3", author: "author3" },
];
// מחזירים עותק של המערך ומדמים איחור של קריאת רשת
export const getBooks = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...books]), 250); // 250ms לדוגמה
    });
}

// מוסיפים ספר (במקום ה״שרת״) ומחזירים את המערך המעודכן
export const addNewBook = (newBook) => {
    return new Promise((resolve) => {
        // שמירה ב"DB" המקומי (המערך)
        books.push(newBook);
        // מדמים עיבוד/אחסון בצד השרת
        setTimeout(() => resolve([...books]), 250);
    });
}