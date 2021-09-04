export const getCurrentYear: string = String(new Date().getFullYear());
const monthIndex: number = new Date().getMonth();
const months: Array<string> = ['January','February','March','April','May','June','July','August','September','October','November','December']
export const getCurrentMonth: string = months[monthIndex];