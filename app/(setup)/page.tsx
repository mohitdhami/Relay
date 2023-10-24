import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";


//test--
import { UserButton } from "@clerk/nextjs";

const SetupPage = async () => {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if(server) {
        return redirect(`/servers/${server.id}`)
    }

    return (
        <div>
            <div>
            <UserButton afterSignOutUrl="/"/>
            </div>
        <p>Create a Server</p>
        </div>
    );
}

export default SetupPage;