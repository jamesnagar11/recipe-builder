import { prisma } from "@repo/db";

export default async function Landing() {
    const user = await prisma.user.findMany();
    return (
        <div>
            <h1>Landing Page</h1>
            <ul>
                {user.map((u) => (
                    <li key={u.id}>{u.name + " - " + u.email}</li>
                ))}
            </ul>
        </div>
    );
}
