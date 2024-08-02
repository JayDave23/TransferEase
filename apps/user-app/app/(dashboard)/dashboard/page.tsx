import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
// import Testimonialcards from "../../../components/testimonialcards";

export default async function() {
    const session = await getServerSession(authOptions);
    const userdetails = await prisma.user.findFirst({
        where: {
            id: Number(session?.user?.id)
        }
    });
    return <div className="w-screen">
    <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Welcome back,&nbsp;{userdetails?.name?.toUpperCase()}!!
    </div>
    <div className="flex w-full">
        <p className="w-[40vw] font-semibold">
            &ensp;&ensp;&ensp;As a valued member of our community, we're here to make your digital payment experience even more personalized and convenient.
        </p>
    </div>
    <div className="text-2xl text-[#6a51a6] align-middle text-center pt-8 mb-8 font-bold">
        Services we have for you
    </div>
    <div className="flex Service-1">
    <p className="text-xl text-[#6a51a6] align-middle  font-bold">
        Direct Bank Transfers -
    </p > 
    <p className=" mt-1 ">&ensp;You can now transfer funds direct from your bank account to our wallet.</p>
    

    </div>
    <br />
    <div className="flex Service-2">
    <p className="text-xl text-[#6a51a6] align-middle  font-bold">
        P2P Transfers -
    </p > 
    <p className=" mt-1 ">&ensp;You can transfer funds from your account to other authorised users.</p>
    

    </div>
    <br />
    <br />
    <br />
    <br />
    </div>
}