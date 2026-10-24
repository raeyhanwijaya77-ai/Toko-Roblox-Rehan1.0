import { sql, init } from '@/lib/db';
import { getUser, isAdmin } from '@/lib/auth';
const no = () => Response.json({ error: 'forbidden' }, { status: 403 });
export async function GET() {
  if (!isAdmin(await getUser())) return no();
  await init();
  const r = await sql`select k,v from meta where k in ('pk_slug','pk_key')`;
  const m = Object.fromEntries(r.map((x) => [x.k, x.v]));
  const [h] = await sql`select v from meta where k='hold_min'`;
  return Response.json({ slug: m.pk_slug || '', hasKey: !!m.pk_key, hold: parseInt(h?.v) || 15 });
}
export async function POST(req) {
  if (!isAdmin(await getUser())) return no();
  await init();
  const { slug, key, hold } = await req.json();
  if (hold !== undefined) {
    const n = parseInt(hold);
    if (!(n >= 5 && n <= 120)) return Response.json({ error: 'Isi 5 sampai 120 menit' }, { status: 400 });
    await sql`insert into meta(k,v) values('hold_min',${String(n)}) on conflict(k) do update set v=excluded.v`;
  }
  if (slug && slug.trim()) await sql`insert into meta(k,v) values('pk_slug',${slug.trim()}) on conflict(k) do update set v=excluded.v`;
  if (key && key.trim()) await sql`insert into meta(k,v) values('pk_key',${key.trim()}) on conflict(k) do update set v=excluded.v`;
  return Response.json({ ok: 1 });
}
