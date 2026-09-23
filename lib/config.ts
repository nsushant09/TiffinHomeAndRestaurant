export const site = { name:'Tiffin Home & Restaurant', email:'tiffinhousesauraha@gmail.com', phone:'9845160919', location:'Sauraha, Chitwan, Nepal', primary:'#186131' };
export function requiredEnv(name: string): string { const value = process.env[name]; if (!value) throw new Error(`Missing required environment variable: ${name}`); return value; }
