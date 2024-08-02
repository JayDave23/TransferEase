import { Card } from "@repo/ui/card"

export const P2ppasttxn = ({
    pastTransactions
}: {
    pastTransactions: {
        time: Date,
        amount: number,
        to: number,
    }[]
}) => {
    if (!pastTransactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {pastTransactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Sent INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                        <p>to user ID {t.to} </p>
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    - Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}