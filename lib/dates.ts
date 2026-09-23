export function dateOnly(value:string|Date) { const d=typeof value==='string'?new Date(`${value}T00:00:00.000Z`):new Date(value); return new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())); }
export function nights(start:Date,end:Date) { const out:Date[]=[]; for(let d=new Date(start); d<end; d.setUTCDate(d.getUTCDate()+1)) out.push(new Date(d)); return out; }
export function nepalDate(value:Date) { return new Intl.DateTimeFormat('en-NP',{dateStyle:'medium',timeZone:'Asia/Kathmandu'}).format(value); }
