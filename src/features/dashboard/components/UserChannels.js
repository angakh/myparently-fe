import TitleCard from "../../../components/Cards/TitleCard"

const userSourceData = [
    {source : "Ms. Smith", count : "Math in Class", conversionPercent : 40},
    {source : "Ms. Smith", count : "Math out of Class", conversionPercent : 40},
    {source : "Mr. Bore", count : "Reading in Class", conversionPercent : 60},
    {source : "Mr. Bore", count : "Writing in Class", conversionPercent : 60},
    {source : "Ms. Readman", count : "Reading out of Class", conversionPercent : 60},
]

function UserChannels(){
    return(
        <TitleCard title={"Support Team"}>
             {/** Table Data */}
             <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th className="normal-case">Member</th>
                        <th className="normal-case">Subject</th>
                        <th className="normal-case">Service Time</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            userSourceData.map((u, k) => {
                                return(
                                    <tr key={k}>
                                        <th>{k+1}</th>
                                        <td>{u.source}</td>
                                        <td>{u.count}</td>
                                        <td>{`${u.conversionPercent}%`}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    )
}

export default UserChannels