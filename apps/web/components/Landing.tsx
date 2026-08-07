import { prisma } from "@repo/db";

export default async function Landing() {
    type User = Awaited<ReturnType<typeof prisma.user.findMany>>[number];
    let user: User[] = [];
    try {
        user = await prisma.user.findMany();
    } catch (error) {
        console.warn("Database is unreachable during pre-rendering. Falling back to empty users list.", error);
    }

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
