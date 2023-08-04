export const getCurrentDate = () => {                                                
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
}

export const extractDates = (str: string) => {                                                    
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
    const datesFound = Array.from(str.matchAll(dateRegex)).map(match => match[0]);
    return datesFound.join(', ') || '';
}

export const capitalize = (str: string) => str.replace(/(^\w|\s\w)/g, m => m.toUpperCase());

export const formatCategoryName = (str: string) => capitalize(str.includes('-') ? str.replace(/-/g, ' ') : str);