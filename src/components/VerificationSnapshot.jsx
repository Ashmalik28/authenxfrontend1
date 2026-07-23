
const defaultActivity = [
    { doc: "Bachelor's Degree", hash: "0x9f3a...c1b", time: "2h ago", success: true },
    { doc: "Employment Letter", hash: "0x9f3a...c1b", time: "1d ago", success: false },
    { doc: "Passport Scan", hash: "0x9f3a...c1b", time: "2d ago", success: true },
];

export default function VerificationSnapshot({
    docsThisMonth = 20,
    accuracy = 100,
    activity = defaultActivity,
    onViewAll,
}) {
    return (
        <div className="w-full bg-white rounded-2xl border shadow-sm p-5 2xl:p-7">
            {/* header */}
            <h3 className="text-lg 2xl:text-3xl font-bold text-gray-900">Verification Snapshot</h3>
            <p className="text-xs 2xl:text-lg text-gray-400 mt-0.5 2xl:mt-2">Updated in real time</p>

            {/* stat blocks */}
            <div className="grid grid-cols-2 gap-3 2xl:gap-5 mt-2 2xl:mt-4">
                <div className="bg-gray-50 rounded-xl p-2 2xl:p-4 flex gap-2 items-center">
                    <span className="w-9 h-9 2xl:w-11 2xl:h-11 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 2xl:w-6 2xl:h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </span>
                    <div className="flex flex-col justify-items-start">
                    <p className="text-xl 2xl:text-2xl font-bold flex items-center gap-2 text-gray-900">
                        {docsThisMonth} <span className="text-xs 2xl:text-base font-semibold text-gray-400 align-middle">DOCS</span>
                    </p>
                    <p className="text-xs 2xl:text-sm text-gray-400">This month</p>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-2 2xl:p-4 flex gap-2 2xl:mt-3 items-center mt-4">
                    <span className="w-9 h-9 2xl:w-11 2xl:h-11 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 2xl:w-6 2xl:h-6">
                            <circle cx="12" cy="12" r="8" />
                            <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
                        </svg>
                    </span>
                    <div className="flex flex-col">
                    <p className="text-xl 2xl:text-2xl font-bold text-gray-900">{accuracy}%</p>
                    <p className="text-xs 2xl:text-sm text-gray-400">Accuracy</p>
                    </div>
                </div>
            </div>

            {/* activity list */}
            <div className="flex items-center justify-between mt-2 2xl:mt-4">
                <span className="text-[11px] 2xl:text-sm font-semibold tracking-wider text-gray-400 uppercase">Activity</span>
                <button
                    type="button"
                    onClick={onViewAll}
                    className="text-[11px] 2xl:text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1"
                >
                    View All <span aria-hidden="true">→</span>
                </button>
            </div>

            <div className="flex flex-col divide-y 2xl:mt-2 divide-gray-100">
                {activity.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 2xl:py-4">
                        <div className="flex items-center gap-2.5 2xl:gap-4">
                            <span
                                className={`mt-1.5 w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full shrink-0 ${
                                    item.success ? "bg-green-500" : "bg-amber-500"
                                }`}
                            />
                            <div className="flex gap-3 2xl:gap-1 2xl:flex-col">
                                <p className="text-[12px] 2xl:text-lg font-semibold text-gray-900">{item.doc}</p>
                                <p className="text-xs 2xl:text-base text-gray-400 font-mono mt-0.5">{item.hash}</p>
                            </div>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0">{item.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}