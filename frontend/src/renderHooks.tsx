import React, { useState } from "react"


type Props = {
    checkList: readonly boolean[]
    labels: readonly string[]
    onCheck: (index: number) => void
}

export const Checks: React.FunctionComponent<Props> = ({
    checkList,
    labels,
    onCheck
}) => {
    return (
        <ul>
            {labels.map((label, idx) => (
                <li key={idx}>
                    <label>
                        <input
                            type='checkbox'
                            checked={checkList[idx]}
                            onClick={() => onCheck(idx)}
                        />
                        {label}
                    </label>
                </li>
            ))}
        </ul>
    )
}
type UseChecksResult = [boolean, () => JSX.Element]

export const useChecks = (labels: readonly string[]): UseChecksResult => {
    const [checkList, setCheckList] = useState(() => labels.map(() => false))

    const handleCheckClick = (index: number) => {
        setCheckList((checks) => checks.map((c, i) => (i === index ? !c : c)))
    }

    const isAllChecked = checkList.every((x) => x)

    const renderChecks = () => (
        <Checks checkList={checkList} labels={labels} onCheck={handleCheckClick} />
    )

    return [isAllChecked, renderChecks]
}
const App: React.FunctionComponent = () => {
    const [isAllChecked, renderChecks] = useChecks(labels)

    return (
        <div>
            {renderChecks()}
            <p>
                <button disabled={!isAllChecked}>次へ</button>
            </p>
        </div>
    )
}
