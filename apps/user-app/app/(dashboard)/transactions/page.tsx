import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { P2ppasttxn } from "../../../components/p2ppasttxn";
async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}
async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}
async function getPastTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {OR:[{fromUserId: Number(session?.user?.id)},{toUserId: Number(session?.user?.id)}] }});
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        to: t.toUserId
    }))
}
const session = await getServerSession(authOptions);
    const userdetails = await prisma.user.findFirst({
        where: {
            id: Number(session?.user?.id)
        }
    });
export default async function() {
    const balance = await getBalance();
    const onramptransactions = await getOnRampTransactions();
    const p2ptransactions = await getPastTransactions();
    return <div className="w-screen">
        <div className=" flex m-1">
        <div className="w-[50%] text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">{userdetails?.name?.toUpperCase()} you can see your all transactions and balance here..</div>
        <div className="w-[50%]"><BalanceCard amount={balance.amount} locked={balance.locked} /></div>
        </div>
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">All Transactions</div>
        <div className="flex m-1">
            <div className="w-[50%]"><OnRampTransactions transactions={onramptransactions} /></div>
            <div className="w-[50%]"><P2ppasttxn pastTransactions={p2ptransactions}/></div>
            
        </div>
                
    </div>
}