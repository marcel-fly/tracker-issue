import React from "react";
import { IssuesList } from './IssuesList';
import { RootStateOrAny, useSelector } from 'react-redux';
import './IssuesSection.css'
interface Props {

}

export const IssuesSection: React.FC<Props>= props => {

    const { openIssues, pendingIssues, closedIssues } = useSelector( (state: RootStateOrAny) => state.issuesData);
    return (
        <div className="IssuesSection-wraper">
            <IssuesList color='#15ff00' title='Open' issuesData={openIssues} typeIssue='open'/>
            <IssuesList color='yellow' title='Pending' issuesData={pendingIssues} typeIssue='pending' />
            <IssuesList color='#ff0000' title='Closed' issuesData={closedIssues} typeIssue='closed' />
        </div>
    );

};